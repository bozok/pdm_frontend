import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/user/useUser";
import { useRegion } from "../../hooks/region/useRegion";
import { useOffice } from "../../hooks/office/useOffice";
import { useRole } from "../../hooks/role/useRole";
import { Link } from "react-router-dom";

export default function UserUpdate() {
  const { getUser, updateUser, changeUserStatus, isLoading, isLoadingUpdate } =
    useUser();
  const { getRegions } = useRegion();
  const { getOfficesByRegion } = useOffice();
  const { getRoles } = useRole();
  const param = useParams();
  const [uploads, setUploads] = useState([]);
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState();
  const [identityNo, setIdentityNo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState("");
  const [offices, setOffices] = useState([]);
  const [office, setOffice] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState("");
  const [roleTmp, setRoleTmp] = useState("");
  const [status, setStatus] = useState(false);

  function addPhoto(e) {
    e.preventDefault();
    setUploads([]);
    const files = e.target.files;
    if (files.length > 0) {
      for (const file of files) {
        const tmpURL = URL.createObjectURL(file);
        setPhoto(tmpURL);
        setUploads((prevUploads) => [...prevUploads, file]);
      }
    }
  }

  const handleUserStatus = async (e) => {
    e.preventDefault();
    const newUserStatus = await changeUserStatus(param.id);
    if (newUserStatus) {
      setPhoto(newUserStatus.photo);
      setId(newUserStatus._id);
      setIdentityNo(newUserStatus.identityNo);
      setFirstName(newUserStatus.firstName);
      setLastName(newUserStatus.lastName);
      setRegion(newUserStatus.region);
      setOffice(newUserStatus.office);
      setMobileNumber(newUserStatus.mobileNumber);
      setEmail(newUserStatus.email);
      setRole(newUserStatus.role);
      setRoleTmp(newUserStatus.role);
      setStatus(newUserStatus.status);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !identityNo ||
      !firstName ||
      !lastName ||
      !region ||
      !office ||
      !mobileNumber ||
      !email ||
      !role
    ) {
      return toast.error("Tüm alanları doldurunuz");
    }

    await updateUser(
      id,
      identityNo,
      firstName,
      lastName,
      region,
      office,
      mobileNumber,
      email,
      role,
      uploads.length == 0 ? photo : uploads[0]
    );
  };

  async function getEmployeeInfo() {
    const employeeInfo = await getUser(param.id);
    setPhoto(employeeInfo.photo);
    setId(employeeInfo._id);
    setIdentityNo(employeeInfo.identityNo);
    setFirstName(employeeInfo.firstName);
    setLastName(employeeInfo.lastName);
    setRegion(employeeInfo.region);
    setOffice(employeeInfo.office);
    setMobileNumber(employeeInfo.mobileNumber);
    setEmail(employeeInfo.email);
    setRole(employeeInfo.role);
    setRoleTmp(employeeInfo.role);
    setStatus(employeeInfo.status);
  }
  async function regionListGet() {
    const regionList = await getRegions();
    setRegions(regionList);
  }
  async function officeListGet(r) {
    const officeList = await getOfficesByRegion(r);
    setOffices(officeList);
  }

  async function roleListGet() {
    const roleList = await getRoles();
    setRoles(roleList);
  }

  useEffect(() => {
    if (param.id) {
      regionListGet();
      roleListGet();
      getEmployeeInfo();
    }
  }, [param.id]);

  useEffect(() => {
    officeListGet(region);
  }, [region]);
  return (
    <>
      {isLoading && <Loader />}
      <div className="mb-2 flex justify-between">
        <div className="font-roboto font-semibold text-gray-600">
          Kullanıcı Bilgisi Güncelle
        </div>
      </div>
      <form
        className="grid grid-cols-1 gap-6 md:grid-cols-6"
        onSubmit={handleSubmit}
      >
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-md border border-gray-200">
            <div className="mb-6 bg-gray-200 p-2">Profil Resmi</div>
            <div className="m-2">
              <img
                src={photo}
                alt=""
                className="m-auto h-56 w-56 rounded-md border-2 object-cover"
              />
              <label className="mt-2 flex cursor-pointer justify-center font-roboto font-bold text-blue-500">
                <input
                  type={"file"}
                  accept=".jpg, .png, .jpeg, .gif"
                  className="hidden"
                  onChange={addPhoto}
                />
                <span>Resmi Değiştir</span>
              </label>
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-md border border-gray-200">
            <div className="mb-6 bg-gray-200 p-2">Genel Bilgiler</div>
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
                  {offices.map((item, index) => {
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
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-md border border-gray-200">
            <div className="mb-6 bg-gray-200 p-2">Erişim Bilgileri</div>
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
                  placeholder="5XX XXX XX XX"
                  required
                  minLength={10}
                  maxLength={10}
                  pattern="[0-9]+"
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                />
              </div>
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                Rol
              </label>
              <div className="mt-1">
                <select
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                >
                  {roles.map((item, index) => {
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
              className="mt-4 flex w-full items-center justify-center rounded-md bg-sky-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:opacity-25"
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
                onClick={handleUserStatus}
                className={`mt-4 flex w-full items-center justify-center rounded-md bg-red-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-25`}
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
                onClick={handleUserStatus}
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
            <Link className="w-full" to="/user/list">
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
