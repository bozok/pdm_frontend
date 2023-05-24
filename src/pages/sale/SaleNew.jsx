import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { useRegion } from "../../hooks/region/useRegion";
import { useOffice } from "../../hooks/office/useOffice";
import { useUser } from "../../hooks/user/useUser";
import { useCustomer } from "../../hooks/customer/useCustomer";
import { useSaleType } from "../../hooks/saleType/useSaleType";
import { useCurrencyType } from "../../hooks/setting/useCurrencyType";
import { useSale } from "../../hooks/sale/useSale";
import { Link, useParams } from "react-router-dom";

export default function SaleNew() {
  const param = useParams();
  const { newSale, isLoading } = useSale();
  const { getCustomer } = useCustomer();
  const { getSaleTypes } = useSaleType();
  const { getCurrencyTypes } = useCurrencyType();
  const { getRegions } = useRegion();
  const { getOfficesByRegion } = useOffice();
  const { getUserListByOffice } = useUser();
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState();
  const [offices, setOffices] = useState([]);
  const [office, setOffice] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [customer, setCustomer] = useState({});
  const [saleTypes, setSaleTypes] = useState([]);
  const [currencyTypes, setCurrencyTypes] = useState([]);
  const [currencyType, setCurrencyType] = useState("");
  const [total, setTotal] = useState(0);
  const [note, setNote] = useState("");

  useEffect(() => {
    async function regionListGet() {
      const regionList = await getRegions();
      setRegions(regionList);
      setRegion(regionList[0].name);
    }
    async function customerInfoGet() {
      const customerInfo = await getCustomer(param.id);
      setCustomer(customerInfo);
    }
    async function saleTypesGet() {
      const saleTypeList = await getSaleTypes();
      let tempList = saleTypeList.map((item) => {
        item.isChecked = false;
        item.value = 0;
        return item;
      });
      setSaleTypes(tempList);
    }
    async function currencyInfoGet() {
      const currencyInfo = await getCurrencyTypes();
      setCurrencyTypes(currencyInfo);
      setCurrencyType("TRY");
    }
    regionListGet();
    customerInfoGet();
    saleTypesGet();
    currencyInfoGet();
  }, []);

  useEffect(() => {
    if (region) {
      async function officeListGet() {
        const officeList = await getOfficesByRegion(region);
        if (officeList.length > 0) {
          setOffices(officeList);
          setOffice(officeList[0].name);
        } else {
          setOffices([]);
          setOffice("");
          setUsers([]);
          setUser({});
        }
      }
      officeListGet();
    }
  }, [region]);

  useEffect(() => {
    if (office) {
      async function userListGet() {
        const userList = await getUserListByOffice(office);
        if (userList) {
          setUsers(userList);
          setUser(userList[0]);
        } else {
          setUsers([]);
          setUser({});
        }
      }
      userListGet();
    }
  }, [office]);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < saleTypes.length; i++) {
      if (saleTypes[i].isChecked) {
        sum = sum + +saleTypes[i].value;
      }
    }
    setTotal(sum);
    // let sum = saleTypes.reduce(function (prev, current) {
    //   return current.isChecked ? prev + +current.value : 0;
    // }, 0);
    //console.log(sum);
  }, [saleTypes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let checkSaleTypeSelect = saleTypes.filter((sale) => sale.isChecked).length;
    if (checkSaleTypeSelect === 0) {
      return toast.warning("Satış için bir proje seçmediniz");
    }
    if (total === 0) {
      return toast.warning("Satış tutrarı 0 (sıfır) olamaz");
    } else {
      let formData = saleTypes.filter(
        (sale) => sale.isChecked && sale.value > 0
      );
      if (formData.length > 0) {
        for (let i = 0; i < formData.length; i++) {
          await newSale(
            formData[i]._id,
            formData[i].name,
            customer,
            formData[i].value,
            currencyType,
            note,
            user
          );
        }
      } else {
        return toast.warning("Eksik bilgi alanlarını doldurun");
      }
    }
  };
  const handleUserChange = (e) => {
    setUser(users[e.target.value]);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="mb-2 flex justify-between">
        <div className="font-roboto font-semibold">Yeni Satış</div>
      </div>
      <form
        className="grid grid-cols-1 gap-6 md:grid-cols-6"
        onSubmit={handleSubmit}
      >
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-md border border-orange-200 pb-4">
            <div className="mb-4 rounded-md bg-orange-100 p-2">
              Müşteri Bilgileri
            </div>
            <div className="ml-2">
              <span className="text-sm font-semibold">Müşteri Adı: </span>
              <span className="text-sm">
                {customer.firstName} {customer.lastName}
              </span>
            </div>
            <div className="ml-2">
              <span className="text-sm font-semibold">Firma Adı: </span>
              <span className="text-sm">{customer.companyName}</span>
            </div>
            <div className="ml-2">
              <span className="text-sm font-semibold">TC Kimilk No: </span>
              <span className="text-sm">{customer.identityNo}</span>
            </div>
            <div className="ml-2">
              <span className="text-sm font-semibold">E-posta: </span>
              <span className="text-sm">{customer.email}</span>
            </div>
            <div className="ml-2">
              <span className="text-sm font-semibold">GSM No: </span>
              <span className="text-sm">{customer.mobileNumber}</span>
            </div>
            <div className="ml-2">
              <span className="text-sm font-semibold">Müşteri Notu: </span>
              <span className="text-sm">{customer.comment}</span>
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-md border border-orange-200">
            <div className="mb-4 rounded-md bg-orange-100 p-2">
              Satışı yapılacak iş & Tutar{" "}
              <span className="text-lg font-bold text-green-500">
                ({total} {currencyType})
              </span>
            </div>
            <div className="m-2">
              {saleTypes.map((type, index) => (
                <div
                  key={index}
                  className="mb-1 flex items-center justify-between"
                >
                  <div className="p-1">
                    <input
                      type="checkbox"
                      className="mr-2 h-4 w-4"
                      checked={type.isChecked}
                      onChange={(e) =>
                        setSaleTypes(
                          saleTypes.map((item) =>
                            item._id !== type._id
                              ? item
                              : { ...type, isChecked: !type.isChecked }
                          )
                        )
                      }
                    />
                    <label>{type.name}</label>
                  </div>
                  <div className={`${type.isChecked ? "block" : "hidden"}`}>
                    <input
                      type="number"
                      required
                      value={type.value}
                      onChange={(e) =>
                        setSaleTypes(
                          saleTypes.map((item) =>
                            item._id !== type._id
                              ? item
                              : { ...type, value: e.target.value }
                          )
                        )
                      }
                      className="h-8 w-24 rounded-md border-0 px-2.5 py-1 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                    />
                    <select
                      required
                      disabled
                      value={currencyType}
                      onChange={(e) => setCurrencyType(e.target.value)}
                      className="ml-1 h-8 w-20 rounded-md border-0 px-2.5 py-1 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                    >
                      {currencyTypes.map((item, index) => {
                        return (
                          <option key={index} value={item.name}>
                            {item.shortCode}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-md border border-orange-200">
            <div className="mb-4 rounded-md bg-orange-100 p-2">Proje Notu</div>
            <div className="m-2">
              <textarea
                type="text"
                value={note}
                minLength={2}
                onChange={(e) => setNote(e.target.value)}
                className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-md border border-orange-200">
            <div className="mb-4 rounded-md bg-orange-100 p-2">
              Atanacak çalışan
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                Bölge
              </label>
              <div className="mt-1">
                <select
                  required
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                >
                  {regions.map((item, index) => {
                    return (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                Ofis
              </label>
              <div className="mt-1">
                <select
                  required
                  value={office}
                  onChange={(e) => setOffice(e.target.value)}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                >
                  {offices?.map((item, index) => {
                    return (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                Çalışanlar
              </label>
              <div className="mt-1">
                <select
                  required
                  onChange={(e) => {
                    handleUserChange(e);
                  }}
                  // onChange={(e) => setUser(e.target.value)}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                >
                  {users?.map((item, index) => {
                    return (
                      <option key={index} value={index}>
                        {item.firstName} {item.lastName}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center rounded-md bg-sky-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mr-2 h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
                />
              </svg>
              Kaydet
            </button>
            <Link className="w-full" to="/customer/list">
              <span className="mt-4 flex w-full items-center justify-center rounded-md bg-orange-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-1 h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                  />
                </svg>
                Geri Dön
              </span>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
