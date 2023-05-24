import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { useUser } from "../../hooks/user/useUser";
import { useCustomer } from "../../hooks/customer/useCustomer";
import { Link } from "react-router-dom";

export default function CustomerNew() {
  const { getUserListByRole } = useUser();
  const { newCustomer, isLoading } = useCustomer();

  const [identityNo, setIdentityNo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [taxIdNo, setTaxIdNo] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [financialAdvisors, setFinancialAdvisors] = useState([]);
  const [financialAdvisor, setFinancialAdvisor] = useState("");
  const [supplierMachinists, setSupplierMachinists] = useState([]);
  const [supplierMachinist, setSupplierMachinist] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function machinistListGet() {
      const machinistList = await getUserListByRole("Makineci");
      setSupplierMachinists(machinistList);
    }
    async function financialAdvisorsListGet() {
      const financialAdvisorsList = await getUserListByRole("Mali Müşavir");
      setFinancialAdvisors(financialAdvisorsList);
    }
    machinistListGet();
    financialAdvisorsListGet();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !identityNo ||
      !firstName ||
      !lastName ||
      !mobileNumber ||
      !email ||
      !taxIdNo ||
      !companyName ||
      !comment
    ) {
      return toast.warn("Tüm alanları doldurun");
    }
    const status = await newCustomer(
      identityNo,
      firstName,
      lastName,
      mobileNumber,
      email,
      taxIdNo,
      companyName,
      financialAdvisor,
      supplierMachinist,
      comment
    );
    if (status) {
      clearForm();
    }
  };

  const clearForm = () => {
    setIdentityNo("");
    setFirstName("");
    setLastName("");
    setMobileNumber("");
    setEmail("");
    setTaxIdNo("");
    setCompanyName("");
    setSupplierMachinist("");
    setSupplierMachinists([]);
    setFinancialAdvisor("");
    setFinancialAdvisors([]);
    setComment("");
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="mb-2 flex justify-between">
        <div className="font-roboto font-semibold text-gray-600">
          Yeni Müşteri
        </div>
      </div>
      <form
        className="grid grid-cols-1 gap-6 md:grid-cols-6"
        onSubmit={handleSubmit}
      >
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-md border border-orange-200">
            <div className="mb-6 rounded-md bg-orange-100 p-2">
              Firma Sahibi Bilgileri
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                TC Kimlik Numarası
              </label>
              <div className="mt-1">
                <input
                  value={identityNo}
                  type="text"
                  required
                  minLength={11}
                  maxLength={11}
                  pattern="[0-9]+"
                  onChange={(e) => setIdentityNo(e.target.value)}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                />
              </div>
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                İsim
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  value={firstName}
                  required
                  minLength={3}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                />
              </div>
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                Soyisim
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  value={lastName}
                  required
                  minLength={2}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                />
              </div>
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                Not
              </label>
              <div className="mt-1">
                <textarea
                  type="text"
                  value={comment}
                  required
                  minLength={2}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-md border border-orange-200">
            <div className="mb-6 rounded-md bg-orange-100 p-2">
              Firma Bilgileri
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                Vergi Kimlik Numarası
              </label>
              <div className="mt-1">
                <input
                  value={taxIdNo}
                  type="text"
                  required
                  minLength={10}
                  maxLength={10}
                  pattern="[0-9]+"
                  onChange={(e) => setTaxIdNo(e.target.value)}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                />
              </div>
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                Firma Adı
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  value={companyName}
                  required
                  minLength={2}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                />
              </div>
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                Mali Müşavir
              </label>
              <div className="mt-1">
                <select
                  value={financialAdvisor}
                  onChange={(e) => setFinancialAdvisor(e.target.value)}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                >
                  <option defaultValue="none"></option>
                  {financialAdvisors.length > 0 &&
                    financialAdvisors.map((item, index) => {
                      return (
                        <option
                          key={index}
                          value={item.firstName + " " + item.lastName}
                        >
                          {item.firstName + " " + item.lastName}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                Makineci
              </label>
              <div className="mt-1">
                <select
                  value={supplierMachinist}
                  onChange={(e) => setSupplierMachinist(e.target.value)}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                >
                  <option defaultValue="none"></option>
                  {supplierMachinists.length > 0 &&
                    supplierMachinists.map((item, index) => {
                      return (
                        <option
                          key={index}
                          value={item.firstName + " " + item.lastName}
                        >
                          {item.firstName + " " + item.lastName}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-md border border-orange-200">
            <div className="mb-6 rounded-md bg-orange-100 p-2">
              İletişim Bilgileri
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                E-posta
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                />
              </div>
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                Cep Telefonu
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  value={mobileNumber}
                  required
                  placeholder="5XX XXX XX XX"
                  minLength={10}
                  maxLength={10}
                  pattern="[0-9]+"
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                />
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
