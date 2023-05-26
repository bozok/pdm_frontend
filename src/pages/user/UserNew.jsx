import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { useRegion } from "../../hooks/region/useRegion";
import { useOffice } from "../../hooks/office/useOffice";
import { useRole } from "../../hooks/role/useRole";
import { useUser } from "../../hooks/user/useUser";
import { Link } from "react-router-dom";

export default function UserNew() {
  const { getRegions } = useRegion();
  const { getOfficesByRegion } = useOffice();
  const { getRoles } = useRole();
  const { newUser, isLoading } = useUser();
  const [uploads, setUploads] = useState([]);
  const [photo, setPhoto] = useState(import.meta.env.VITE_DEFAULT_PROFILE_IMG);
  const [identityNo, setIdentityNo] = useState("");
  const [identityError, setIdentiyError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState();
  const [regionError, setRegionError] = useState();
  const [offices, setOffices] = useState([]);
  const [office, setOffice] = useState("");
  const [officeError, setOfficeError] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState("");
  const [roleError, setRoleError] = useState("");

  const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
  };
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

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

  useEffect(() => {
    async function regionListGet() {
      const regionList = await getRegions();
      setRegions(regionList);
      setRegion("Seçiniz");
    }
    async function roleListGet() {
      const roleList = await getRoles();
      setRoles(roleList);
      setRole("Seçiniz");
    }
    regionListGet();
    roleListGet();
  }, []);

  useEffect(() => {
    async function officeListGet() {
      const officeList = await getOfficesByRegion(region);
      setOffices(officeList);
      setOffice("Seçiniz");
    }
    officeListGet();
  }, [region]);

  function checkErrors() {
    clearErrors();
    let error = false;
    if (
      isEmptyOrSpaces(identityNo) ||
      identityNo.length < 11 ||
      identityNo.length > 11
    ) {
      setIdentiyError("Geçersiz TC Kimlik numarası");
      error = true;
    }
    if (
      isEmptyOrSpaces(firstName) ||
      firstName.length < 3 ||
      firstName.length > 20
    ) {
      setFirstNameError("Geçersiz isim bilgisi");
      error = true;
    }
    if (
      isEmptyOrSpaces(lastName) ||
      lastName.length < 2 ||
      lastName.length > 20
    ) {
      setLastNameError("Geçersiz soyisim bilgisi");
      error = true;
    }
    if (!validateEmail(email)) {
      setEmailError("Geçersiz e-posta bilgisi");
      error = true;
    }
    if (
      isEmptyOrSpaces(mobileNumber) ||
      mobileNumber.length < 10 ||
      mobileNumber.length > 10
    ) {
      setMobileNumberError("Geçersiz telefon bilgisi");
      error = true;
    }
    if (isEmptyOrSpaces(role) || role == "Seçiniz") {
      setRoleError("Geçersiz rol bilgisi");
      error = true;
    }
    if (isEmptyOrSpaces(region) || region == "Seçiniz") {
      setRegionError("Geçersiz bölge bilgisi");
      error = true;
    }
    if (isEmptyOrSpaces(office) || office == "Seçiniz") {
      setOfficeError("Geçersiz ofis bilgisi");
      error = true;
    }
    return error;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorStatus = checkErrors();
    if (!errorStatus) {
      const status = await newUser(
        identityNo,
        firstName,
        lastName,
        email,
        region,
        office,
        mobileNumber,
        role,
        uploads.length == 0 ? photo : uploads[0]
      );
      if (status) {
        clearForm();
      }
    }
  };

  const clearForm = () => {
    setPhoto(import.meta.env.VITE_DEFAULT_PROFILE_IMG);
    setIdentityNo("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setMobileNumber("");
    setRegion("Seçiniz");
    setOffice("Seçiniz");
    setRole("Seçiniz");
    setUploads([]);
  };

  function clearErrors() {
    setIdentiyError("");
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setMobileNumberError("");
    setRoleError("");
    setRegionError("");
    setOfficeError("");
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="mb-2 flex justify-between">
        <div className="font-roboto font-semibold text-gray-600">
          Yeni Kullanıcı
        </div>
      </div>
      <form
        className="grid grid-cols-1 gap-6 md:grid-cols-6"
        onSubmit={handleSubmit}
      >
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-md border border-orange-200">
            <div className="mb-6 rounded-md bg-orange-100 p-2">
              Profil Resmi
            </div>
            <div className="m-2">
              <img
                src={photo}
                alt=""
                className="m-auto h-56 w-56 rounded-md border-2 object-cover"
              />
              <label className="mt-2 flex cursor-pointer justify-center font-roboto font-bold text-orange-400">
                <input
                  type={"file"}
                  accept=".jpg, .png, .jpeg, .gif"
                  className="hidden"
                  onChange={addPhoto}
                />
                <span>Resim Ekle</span>
              </label>
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-md border border-orange-200">
            <div className="mb-6 rounded-md bg-orange-100 p-2">
              Genel Bilgiler
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                TC Kimlik Numarası
              </label>
              <span className="ml-2 font-roboto text-xs text-red-500">
                {identityError}
              </span>
              <div className="mt-1">
                <input
                  value={identityNo}
                  type="text"
                  onChange={(e) => setIdentityNo(e.target.value)}
                  className={`${
                    identityError
                      ? "text-red-500 ring-2 ring-red-300 focus:ring-red-400"
                      : ""
                  } w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-400`}
                />
              </div>
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                İsim
              </label>
              <span className="ml-2 font-roboto text-xs text-red-500">
                {firstNameError}
              </span>
              <div className="mt-1">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`${
                    firstNameError
                      ? "text-red-500 ring-2 ring-red-300 focus:ring-red-400"
                      : ""
                  } w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-400`}
                />
              </div>
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                Soyisim
              </label>
              <span className="ml-2 font-roboto text-xs text-red-500">
                {lastNameError}
              </span>
              <div className="mt-1">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={`${
                    lastNameError
                      ? "text-red-500 ring-2 ring-red-300 focus:ring-red-400"
                      : ""
                  } w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-400`}
                />
              </div>
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                Bölge
              </label>
              <span className="ml-2 font-roboto text-xs text-red-500">
                {regionError}
              </span>
              <div className="mt-1">
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className={`${
                    regionError ? "ring-2 ring-red-300 focus:ring-red-400" : ""
                  } w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-400`}
                >
                  <option>Seçiniz</option>
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
              <span className="ml-2 font-roboto text-xs text-red-500">
                {officeError}
              </span>
              <div className="mt-1">
                <select
                  value={office}
                  onChange={(e) => setOffice(e.target.value)}
                  className={`${
                    regionError ? "ring-2 ring-red-300 focus:ring-red-400" : ""
                  } w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-400`}
                >
                  <option>Seçiniz</option>
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
          <div className="rounded-md border border-orange-200">
            <div className="mb-6 rounded-md bg-orange-100 p-2">
              Erişim Bilgileri
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                E-posta
              </label>
              <span className="ml-2 font-roboto text-xs text-red-500">
                {emailError}
              </span>
              <div className="mt-1">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${
                    emailError
                      ? "text-red-500 ring-2 ring-red-300 focus:ring-red-400"
                      : ""
                  } w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-400`}
                />
              </div>
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                Cep Telefonu
              </label>
              <span className="ml-2 font-roboto text-xs text-red-500">
                {mobileNumberError}
              </span>
              <div className="mt-1">
                <input
                  type="text"
                  value={mobileNumber}
                  placeholder="5XX XXX XX XX"
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className={`${
                    mobileNumberError
                      ? "text-red-500 ring-2 ring-red-300 focus:ring-red-400"
                      : ""
                  } w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-400`}
                />
              </div>
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                Rol
              </label>
              <span className="ml-2 font-roboto text-xs text-red-500">
                {roleError}
              </span>
              <div className="mt-1">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={`${
                    roleError ? "ring-2 ring-red-300 focus:ring-red-400" : ""
                  } w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-400`}
                >
                  <option>Seçiniz</option>
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
