import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { useSale } from "../../hooks/sale/useSale";
import { useNavigate } from "react-router-dom";

export default function SaleIG() {
  let tabkeys = [0, 1, 2];
  const param = useParams();
  const navigate = useNavigate();
  const { getSaleIG, addNewNoteSaleIG, isLoading } = useSale();
  const [toggle, setToggle] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [isEducationTaken, setIsEducationTaken] = useState(false);
  const [isWorkplaceOpen, setIsWorkplaceOpen] = useState(false);
  const [isPartnered, setIsPartnered] = useState(false);
  const [hasTraderRecord, setHasTraderRecord] = useState(false);
  const [hasPttRecord, setHasPttRecord] = useState(false);
  const [declarationSent, setDeclarationSent] = useState(false);
  const [declarationApproved, setDeclarationApproved] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({});
  const [saleInfo, setSaleInfo] = useState({});
  const [saleDetailInfo, setSaleDetailInfo] = useState({});

  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    getSaleInfo();
  }, [param]);
  async function getSaleInfo() {
    const response = await getSaleIG(param.id);
    setCustomerInfo(response.customerInfo);
    setSaleDetailInfo(response.detailInfo);
    setSaleInfo(response);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("ok");
  };

  const addNewNote = async () => {
    let result = isEmptyOrSpaces(newNote);
    if (!result) {
      const response = await addNewNoteSaleIG(param.id, newNote);
      setShowNoteModal(false);
      setToggle(false);
    } else {
      // do nothing...
    }
  };

  const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="mb-2 flex justify-between">
        <div className="font-roboto font-semibold text-gray-600">
          <span>İleri Girişimcilik Projesi:</span>
          <span className="ml-4 text-purple-700">{saleInfo.projectCode}</span>
          <span className="ml-4 text-blue-700">{saleInfo.status}</span>
        </div>
        <div>
          <button
            className="rounded bg-gray-400 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-gray-600"
            onClick={() => setToggle((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
          </button>
          <div
            className={`${
              toggle ? "flex" : "hidden"
            } absolute right-0 top-[90px] mx-4 my-2 min-w-[170px] rounded-md bg-gray-100 p-4`}
          >
            <ul className="flex flex-1 list-none flex-col items-start justify-end">
              <li
                className={`cursor-pointer p-1 font-roboto text-[16px] font-normal text-gray-500 hover:font-bold hover:text-gray-800`}
                onClick={() => {
                  setShowNoteModal(true);
                  setNewNote("");
                }}
              >
                Not Ekle
              </li>
              <li
                className={`cursor-pointer p-1 font-roboto text-[16px] font-normal text-gray-500 hover:font-bold hover:text-gray-800`}
              >
                Atananı Değiştir
              </li>
              <li
                className={`cursor-pointer p-1 font-roboto text-[16px] font-normal text-gray-500 hover:font-bold hover:text-gray-800`}
              >
                Tutarı Değiştir
              </li>
              <li
                className={`cursor-pointer p-1 font-roboto text-[16px] font-normal text-red-400 hover:font-bold hover:text-red-600`}
              >
                Süreci İptal Et
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex grid-cols-1 gap-6 md:grid-cols-5">
        <div className="mb-4 flex space-x-3">
          <button
            className={`border-b-4 py-2 transition-colors duration-300 ${
              tabkeys[0] === activeTabIndex
                ? "border-teal-500"
                : "border-transparent hover:border-gray-200"
            }`}
            onClick={() => setActiveTabIndex(0)}
          >
            Bilgi Kontrol
          </button>
          <button
            className={`border-b-4 py-2 opacity-30 transition-colors duration-300 ${
              tabkeys[1] === activeTabIndex
                ? "border-teal-500"
                : "border-transparent hover:border-gray-200"
            }`}
            onClick={() => setActiveTabIndex(1)}
            disabled
          >
            Proje Kontrol
          </button>
          <button
            className={`border-b-4 py-2 opacity-30 transition-colors duration-300 ${
              tabkeys[2] === activeTabIndex
                ? "border-teal-500"
                : "border-transparent hover:border-gray-200"
            }`}
            onClick={() => setActiveTabIndex(2)}
            disabled
          >
            Belge Kontrol
          </button>
        </div>
      </div>
      <form
        className="grid grid-cols-1 gap-6 md:grid-cols-6"
        onSubmit={handleSubmit}
      >
        <div
          className={`col-span-1 md:col-span-4 ${
            activeTabIndex === 0 ? "block" : "hidden"
          }`}
        >
          <div className="rounded-md border border-gray-200">
            <div className="m-2">
              <div className="mb-1 flex items-center justify-between">
                <div className="p-1">
                  <input
                    type="checkbox"
                    className="mr-4 h-4 w-4"
                    checked={isEducationTaken}
                    onChange={(e) => setIsEducationTaken(!isEducationTaken)}
                  />
                  <label>İleri Girişimcilik Eğitimi alındı mı?</label>
                </div>
              </div>
            </div>
            <div className="m-2">
              <div className="mb-1 flex items-center justify-between">
                <div className="p-1">
                  <input
                    type="checkbox"
                    className="mr-4 h-4 w-4"
                    checked={isWorkplaceOpen}
                    onChange={(e) => setIsWorkplaceOpen(!isWorkplaceOpen)}
                  />
                  <label>İş yeri açık mı?</label>
                </div>
              </div>
            </div>
            <div className="m-2">
              <div className="mb-1 flex items-center justify-between">
                <div className="p-1">
                  <input
                    type="checkbox"
                    className="mr-4 h-4 w-4"
                    checked={isPartnered}
                    onChange={(e) => setIsPartnered(!isPartnered)}
                  />
                  <label>
                    Son 3 yıl içerisinde bir şahıs işletmesi veya %30'dan fazla
                    ortak olduğu bir işletme var mı?
                  </label>
                </div>
              </div>
            </div>
            <div className="m-2">
              <div className="mb-1 flex items-center justify-between">
                <div className="p-1">
                  <input
                    type="checkbox"
                    className="mr-4 h-4 w-4"
                    checked={hasTraderRecord}
                    onChange={(e) => setHasTraderRecord(!hasTraderRecord)}
                  />
                  <label>Esnaf odası kaydı var mı?</label>
                </div>
              </div>
            </div>
            <div className="m-2">
              <div className="mb-1 flex items-center justify-between">
                <div className="p-1">
                  <input
                    type="checkbox"
                    className="mr-4 h-4 w-4"
                    checked={hasPttRecord}
                    onChange={(e) => setHasPttRecord(!hasPttRecord)}
                  />
                  <label>PTT UETS kaydı var mı?</label>
                </div>
              </div>
            </div>
            <div className="m-2">
              <div className="mb-1 flex items-center justify-between">
                <div className="p-1">
                  <input
                    type="checkbox"
                    className="mr-4 h-4 w-4"
                    checked={declarationSent}
                    onChange={(e) => setDeclarationSent(!declarationSent)}
                  />
                  <label>İşletme beyannamesi KOSGEB'e gönderildi mi?</label>
                </div>
              </div>
            </div>
            <div className="m-2">
              <div className="mb-1 flex items-center justify-between">
                <div className="p-1">
                  <input
                    type="checkbox"
                    className="mr-4 h-4 w-4"
                    checked={declarationApproved}
                    onChange={(e) =>
                      setDeclarationApproved(!declarationApproved)
                    }
                  />
                  <label>
                    İşletme beyannamesi KOSGEB tarafından onaylandı mı?
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-md border border-gray-200 pb-4">
            <div className="mb-4 bg-gray-200 p-2">Müşteri Bilgileri</div>
            <div className="ml-2">
              <span className="text-sm font-semibold">Müşteri Adı: </span>
              <span className="text-sm">
                {customerInfo.firstName} {customerInfo.lastName}
              </span>
            </div>
            <div className="ml-2">
              <span className="text-sm font-semibold">İşletme Adı: </span>
              <span className="text-sm">{customerInfo.companyName}</span>
            </div>
            <div className="ml-2">
              <span className="text-sm font-semibold">TC Kimilk No: </span>
              <span className="text-sm">{customerInfo.identityNo}</span>
            </div>
            <div className="ml-2">
              <span className="text-sm font-semibold">E-posta: </span>
              <span className="text-sm">{customerInfo.email}</span>
            </div>
            <div className="ml-2">
              <span className="text-sm font-semibold">GSM No: </span>
              <span className="text-sm">{customerInfo.mobileNumber}</span>
            </div>
            <div className="ml-2">
              <span className="text-sm font-semibold">Müşteri Notu: </span>
              <span className="text-sm">{customerInfo.comment}</span>
            </div>
          </div>
          <div className="mt-3 rounded-md border border-gray-200 pb-4">
            <div className="mb-4 bg-gray-200 p-2">Süreç Bilgileri</div>
            <div className="ml-2">
              <span className="text-sm font-semibold">Atanan Kişi: </span>
              <span className="text-sm">
                {saleInfo.assignedName} {saleInfo.assignedSurname}
              </span>
            </div>
            <div className="ml-2">
              <span className="text-sm font-semibold">Bağlı Olduğu Ofis: </span>
              <span className="text-sm">{saleInfo.assignedOffice}</span>
            </div>
            <div className="ml-2">
              <span className="text-sm font-semibold">Oluşturan Kişi: </span>
              <span className="text-sm">
                {saleInfo.registrantName} {saleInfo.registrantSurname}
              </span>
            </div>
            <div className="ml-2">
              <span className="text-sm font-semibold">Oluşturan Ofis: </span>
              <span className="text-sm">{saleInfo.registrantOffice}</span>
            </div>
            <div className="ml-2">
              <span className="text-sm font-semibold">
                Oluşturulma Tarihi:{" "}
              </span>
              <span className="text-sm">
                {new Date(saleInfo.createdAt).toLocaleString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center rounded-md bg-sky-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
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
          <Link className="w-full" to="/sale/list">
            <span className="mt-2 flex w-full items-center justify-center rounded-md bg-orange-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
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
      </form>
      {showNoteModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-auto max-w-3xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                  <h3 className="text-2xl font-semibold">Yeni Not</h3>
                  <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                    onClick={() => setShowNoteModal(false)}
                  >
                    <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  <textarea
                    type="text"
                    value={newNote}
                    required
                    minLength={2}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="max-h-[68px] min-h-[68px] w-[400px] rounded-md border-0 px-3.5 py-2 font-roboto leading-relaxed shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                  <button
                    className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    onClick={() => {
                      setShowNoteModal(false);
                      setToggle(false);
                    }}
                  >
                    Kapat
                  </button>
                  <button
                    className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                    type="button"
                    onClick={(e) => {
                      addNewNote();
                      // navigate(`/sale/IG/${saleInfo._id}`);
                    }}
                  >
                    Kaydet
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}
