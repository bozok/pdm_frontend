import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import { useRegion } from "../../hooks/region/useRegion";
import { useOffice } from "../../hooks/office/useOffice";
import { useRole } from "../../hooks/role/useRole";
import { useUser } from "../../hooks/user/useUser";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function UserNew() {
  // formik logics
  const formik = useFormik({
    // Initialize
    initialValues: {
      identityNo: "",
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      region: "Seçiniz",
      office: "Seçiniz",
      role: "Seçiniz",
      photo: import.meta.env.VITE_DEFAULT_PROFILE_IMG,
    },
    // Validation
    validationSchema: Yup.object({
      identityNo: Yup.string()
        .required("TC kimlik bilgisi zorunludur")
        .matches(/^[0-9]+$/, "Sadece sayılardan oluşmalıdır")
        .length(11, "TC kimlik bilgisi 11 karakter olmalıdır"),
      firstName: Yup.string()
        .required("İsim bilgisi zorunludur")
        .matches(
          /^[aA-zZ-ğüşöçıİĞÜŞÖÇ\s]+$/,
          "İsim alanı harflerden oluşmalıdır"
        )
        .min(3, "İsim bilgisi en az 3 karakter olmalı"),
      lastName: Yup.string()
        .required("Soyisim bilgisi zorunludur")
        .matches(
          /^[aA-zZ-ğüşöçıİĞÜŞÖÇ\s]+$/,
          "Soyisim alanı harflerden oluşmalıdır"
        )
        .min(2, "Soyisim bilgisi en az 2 karakter olmalı"),
      region: Yup.string()
        .required("Bölge bilgisi zorunludur")
        .notOneOf(["Seçiniz"], "Bölge bilgisi seçiniz"),
      office: Yup.string()
        .required("Ofis bilgisi zorunludur")
        .notOneOf(["Seçiniz"], "Ofis bilgisi seçiniz"),
      email: Yup.string()
        .email("Geçerli bir e-posta adresi giriniz")
        .required("E-posta bilgisi zorunludur"),
      mobileNumber: Yup.string()
        .required("Cep telefonu bilgisi zorunludur")
        .matches(/^[0-9]+$/, "Sadece sayılardan oluşmalıdır")
        .length(10, "Cep telefonu bilgisi 10 hane olmalıdır"),
      role: Yup.string()
        .required("Rol bilgisi zorunludur")
        .notOneOf(["Seçiniz"], "Rol bilgisi seçiniz"),
    }),

    // From submit
    onSubmit: async (values) => {
      const status = await handleFormSubmit(values);
      if (status === 201) {
        navigate(`/user/list`);
      }
    },
  });
  const navigate = useNavigate();
  const { getRegions } = useRegion();
  const { getOfficesByRegion } = useOffice();
  const { getRoles } = useRole();
  const { newUser, isLoading } = useUser();
  const [uploads, setUploads] = useState([]);
  const [regions, setRegions] = useState([]);
  const [offices, setOffices] = useState([]);
  const [roles, setRoles] = useState([]);

  const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
  };
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  function validateIsNumber(value) {
    var regex = /^[0-9]+$/;
    if (value.match(regex)) {
      return false;
    } else {
      return true;
    }
  }

  function addPhoto(e) {
    e.preventDefault();
    setUploads([]);
    const files = e.target.files;
    if (files.length > 0) {
      for (const file of files) {
        const tmpURL = URL.createObjectURL(file);
        //formik.values.photo = tmpURL;
        formik.setFieldValue("photo", tmpURL);
        setUploads((prevUploads) => [...prevUploads, file]);
      }
    }
  }

  useEffect(() => {
    async function regionListGet() {
      const regionList = await getRegions();
      setRegions(regionList);
    }
    async function roleListGet() {
      const roleList = await getRoles();
      setRoles(roleList);
    }
    regionListGet();
    roleListGet();
  }, []);

  useEffect(() => {
    async function officeListGet() {
      const officeList = await getOfficesByRegion(formik.values.region);
      setOffices(officeList);
      formik.setFieldValue("office", "Seçiniz");
      //formik.values.office = "Seçiniz";
    }
    officeListGet();
  }, [formik.values.region]);

  const handleFormSubmit = async (values) => {
    const status = await newUser(
      values.identityNo,
      values.firstName,
      values.lastName,
      values.email,
      values.region,
      values.office,
      values.mobileNumber,
      values.role,
      uploads.length == 0 ? formik.values.photo : uploads[0]
    );
    return status;
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    if (formik.dirty) {
      if (confirm("Kaydedilmeyen bilgiler kaybolacaktır. Devam edilsin mi?")) {
        navigate(`/user/list`);
      }
    } else {
      navigate(`/user/list`);
    }
  };

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
        onSubmit={formik.handleSubmit}
      >
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-md border border-orange-200">
            <div className="mb-6 rounded-md bg-orange-100 p-2">
              Profil Resmi
            </div>
            <div className="m-2">
              <img
                src={formik.values.photo}
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
              <label
                className={`text-sm font-semibold leading-6 text-gray-900 ${
                  formik.touched.identityNo && formik.errors.identityNo
                    ? "text-red-400"
                    : ""
                }`}
              >
                {formik.touched.identityNo && formik.errors.identityNo
                  ? formik.errors.identityNo
                  : "TC Kimlik Numarası"}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="identityNo"
                  maxLength={11}
                  value={formik.values.identityNo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    "w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-400"
                  }
                />
              </div>
            </div>
            <div className="m-2">
              <label
                className={`text-sm font-semibold leading-6 text-gray-900 ${
                  formik.touched.firstName && formik.errors.firstName
                    ? "text-red-400"
                    : ""
                }`}
              >
                {formik.touched.firstName && formik.errors.firstName
                  ? formik.errors.firstName
                  : "İsim"}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="firstName"
                  maxLength={20}
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    "w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-400"
                  }
                />
              </div>
            </div>
            <div className="m-2">
              <label
                className={`text-sm font-semibold leading-6 text-gray-900 ${
                  formik.touched.lastName && formik.errors.lastName
                    ? "text-red-400"
                    : ""
                }`}
              >
                {formik.touched.lastName && formik.errors.lastName
                  ? formik.errors.lastName
                  : "Soyisim"}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="lastName"
                  maxLength={20}
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    "w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-400"
                  }
                />
              </div>
            </div>
            <div className="m-2">
              <label
                className={`text-sm font-semibold leading-6 text-gray-900 ${
                  formik.touched.region && formik.errors.region
                    ? "text-red-400"
                    : ""
                }`}
              >
                {formik.touched.region && formik.errors.region
                  ? formik.errors.region
                  : "Bölge"}
              </label>
              <div className="mt-1">
                <select
                  name="region"
                  value={formik.values.region}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    "w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-400"
                  }
                >
                  <option value={"Seçiniz"}>Seçiniz</option>
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
              <label
                className={`text-sm font-semibold leading-6 text-gray-900 ${
                  formik.touched.office && formik.errors.office
                    ? "text-red-400"
                    : ""
                }`}
              >
                {formik.touched.office && formik.errors.office
                  ? formik.errors.office
                  : "Ofis"}
              </label>
              <div className="mt-1">
                <select
                  name="office"
                  value={formik.values.office}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    "w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-400"
                  }
                >
                  <option value={"Seçiniz"}>Seçiniz</option>
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
              <label
                className={`text-sm font-semibold leading-6 text-gray-900 ${
                  formik.touched.email && formik.errors.email
                    ? "text-red-400"
                    : ""
                }`}
              >
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : "E-posta"}
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    "w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-400"
                  }
                />
              </div>
            </div>
            <div className="m-2">
              <label
                className={`text-sm font-semibold leading-6 text-gray-900 ${
                  formik.touched.mobileNumber && formik.errors.mobileNumber
                    ? "text-red-400"
                    : ""
                }`}
              >
                {formik.touched.mobileNumber && formik.errors.mobileNumber
                  ? formik.errors.mobileNumber
                  : "Cep Telefonu"}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  placeholder="5XX-XXX-XX-XX"
                  name="mobileNumber"
                  maxLength={10}
                  value={formik.values.mobileNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    "w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-400"
                  }
                />
              </div>
            </div>
            <div className="m-2">
              <label
                className={`text-sm font-semibold leading-6 text-gray-900 ${
                  formik.touched.role && formik.errors.role
                    ? "text-red-400"
                    : ""
                }`}
              >
                {formik.touched.role && formik.errors.role
                  ? formik.errors.role
                  : "Rol"}
              </label>
              <div className="mt-1">
                <select
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    "w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-400"
                  }
                >
                  <option value={"Seçiniz"}>Seçiniz</option>
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
            <button
              className="mt-4 flex w-full items-center justify-center rounded-md bg-orange-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              onClick={handleGoBack}
            >
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
            </button>
            {/* <Link className="w-full" to="/user/list">
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
            </Link> */}
          </div>
        </div>
      </form>
    </>
  );
}
