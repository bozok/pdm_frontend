import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRegion } from "../../../hooks/region/useRegion";
import { useOffice } from "../../../hooks/office/useOffice";
import { Link } from "react-router-dom";

export default function OfficeUpdate() {
  const { getRegions } = useRegion();
  const { getOffice, updateOffice, changeOfficeStatus, isLoading } =
    useOffice();
  const param = useParams();
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [status, setStatus] = useState(false);
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState("");

  const handleOfficeStatus = async (e) => {
    e.preventDefault();
    const newOfficeInfo = await changeOfficeStatus(param.id);
    if (newOfficeInfo) {
      setId(newOfficeInfo._id);
      setName(newOfficeInfo.name);
      setRegion(newOfficeInfo.regionName);
      setMobileNumber(newOfficeInfo.mobileNumber);
      setStatus(newOfficeInfo.status);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !mobileNumber || !region) {
      return toast.error("Tüm alanları doldurunuz");
    }

    await updateOffice(id, name, region, mobileNumber);
  };
  async function getOfficeInfo() {
    const officeInfo = await getOffice(param.id);
    setId(officeInfo._id);
    setName(officeInfo.name);
    setRegion(officeInfo.regionName);
    setMobileNumber(officeInfo.mobileNumber);
    setStatus(officeInfo.status);
  }
  async function regionListGet() {
    const regionList = await getRegions();
    setRegions(regionList);
  }

  useEffect(() => {
    if (param.id) {
      regionListGet();
      getOfficeInfo();
    }
  }, [param.id]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="mb-2 flex justify-between">
        <div className="font-roboto font-semibold text-gray-600">
          Ofis Bilgisi Güncelle
        </div>
      </div>
      <form
        className="grid grid-cols-1 gap-6 md:grid-cols-6"
        onSubmit={handleSubmit}
      >
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-md border border-orange-200">
            <div className="mb-6 rounded-md bg-orange-100 p-2">
              Ofis Bilgileri
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                Ofis Adı
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  value={name}
                  required
                  minLength={3}
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                />
              </div>
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
                className="mr-3 h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Güncelle
            </button>
            {status && (
              <button
                onClick={handleOfficeStatus}
                className="mt-4 flex w-full items-center justify-center rounded-md bg-red-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
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
                    d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002"
                  />
                </svg>
                Pasif Yap
              </button>
            )}
            {!status && (
              <button
                onClick={handleOfficeStatus}
                className="mt-4 flex w-full items-center justify-center rounded-md bg-green-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
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
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                Aktif Yap
              </button>
            )}
            <Link className="w-full" to="/setting/office/list">
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
