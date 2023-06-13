import Loader from "../../components/loader/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/user/useUser";
import { useRegion } from "../../hooks/region/useRegion";
import { useOffice } from "../../hooks/office/useOffice";
import { useRole } from "../../hooks/role/useRole";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function UserUpdate() {
  // formik logics
  const formik = useFormik({
    // Initialize
    initialValues: {
      id: "",
      identityNo: "",
      oldIdentityNo: "",
      firstName: "",
      oldFirstName: "",
      lastName: "",
      oldLastName: "",
      email: "",
      oldEmail: "",
      mobileNumber: "",
      oldMobileNumber: "",
      region: "Seçiniz",
      oldRegion: "Seçiniz",
      office: "Seçiniz",
      oldOffice: "Seçiniz",
      role: "Seçiniz",
      oldRole: "Seçiniz",
      photo: import.meta.env.VITE_DEFAULT_PROFILE_IMG,
      oldPhoto: import.meta.env.VITE_DEFAULT_PROFILE_IMG,
      status: false,
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
    onSubmit: (values) => {
      //console.log(values);
      const status = handleFormSubmit(values);
      if (status === 200) {
        getEmployeeInfo();
      }
    },
  });

  const navigate = useNavigate();
  const { getRegions } = useRegion();
  const { getOfficesByRegion } = useOffice();
  const { getRoles } = useRole();
  const { getUser, updateUser, changeUserStatus, isLoading } = useUser();
  const [uploads, setUploads] = useState([]);
  const [regions, setRegions] = useState([]);
  const [offices, setOffices] = useState([]);
  const [roles, setRoles] = useState([]);
  const param = useParams();

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
        formik.values.photo = tmpURL;
        setUploads((prevUploads) => [...prevUploads, file]);
      }
    }
  }

  const resetPhoto = () => {
    //formik.values.photo = import.meta.env.VITE_DEFAULT_PROFILE_IMG;
    formik.setFieldValue("photo", import.meta.env.VITE_DEFAULT_PROFILE_IMG);
  };

  const handleUserStatus = async (e) => {
    e.preventDefault();
    const newUserStatus = await changeUserStatus(param.id);
    if (newUserStatus) {
      formik.setFieldValue("photo", newUserStatus.photo);
      formik.setFieldValue("oldPhoto", newUserStatus.photo);
      formik.setFieldValue("id", newUserStatus._id);
      formik.setFieldValue("identityNo", newUserStatus.identityNo);
      formik.setFieldValue("firstName", newUserStatus.firstName);
      formik.setFieldValue("lastName", newUserStatus.lastName);
      formik.setFieldValue("region", newUserStatus.region);
      formik.setFieldValue("office", newUserStatus.office);
      formik.setFieldValue("mobileNumber", newUserStatus.mobileNumber);
      formik.setFieldValue("email", newUserStatus.email);
      formik.setFieldValue("role", newUserStatus.role);
      formik.setFieldValue("status", newUserStatus.status);
    }
  };

  const handleFormSubmit = async (values) => {
    const status = await updateUser(
      formik.values.id,
      formik.values.identityNo,
      formik.values.firstName,
      formik.values.lastName,
      formik.values.region,
      formik.values.office,
      formik.values.mobileNumber,
      formik.values.email,
      formik.values.role,
      uploads.length == 0 ? formik.values.photo : uploads[0],
      formik.values.oldPhoto
    );
    return status;
  };

  async function getEmployeeInfo() {
    const employeeInfo = await getUser(param.id);
    formik.setFieldValue("photo", employeeInfo.photo);
    formik.setFieldValue("oldPhoto", employeeInfo.photo);
    formik.setFieldValue("id", employeeInfo._id);
    formik.setFieldValue("identityNo", employeeInfo.identityNo);
    formik.setFieldValue("oldIdentityNo", employeeInfo.identityNo);
    formik.setFieldValue("firstName", employeeInfo.firstName);
    formik.setFieldValue("oldFirstName", employeeInfo.firstName);
    formik.setFieldValue("lastName", employeeInfo.lastName);
    formik.setFieldValue("oldLastName", employeeInfo.lastName);
    formik.setFieldValue("region", employeeInfo.region);
    formik.setFieldValue("oldRegion", employeeInfo.region);
    formik.setFieldValue("office", employeeInfo.office);
    formik.setFieldValue("oldOffice", employeeInfo.office);
    formik.setFieldValue("mobileNumber", employeeInfo.mobileNumber);
    formik.setFieldValue("oldMobileNumber", employeeInfo.mobileNumber);
    formik.setFieldValue("email", employeeInfo.email);
    formik.setFieldValue("oldEmail", employeeInfo.email);
    formik.setFieldValue("role", employeeInfo.role);
    formik.setFieldValue("oldRole", employeeInfo.role);
    formik.setFieldValue("status", employeeInfo.status);
  }
  async function regionListGet() {
    const regionList = await getRegions();
    setRegions(regionList);
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
    async function officeListGet() {
      const officeList = await getOfficesByRegion(formik.values.region);
      setOffices(officeList);
      //formik.values.office = "Seçiniz";
    }
    officeListGet();
  }, [formik.values.region]);

  const checkFromChanges = () => {
    let changed = false;
    if (formik.values.oldIdentityNo !== formik.values.identityNo) {
      changed = true;
      return changed;
    }
    if (formik.values.oldFirstName !== formik.values.firstName) {
      changed = true;
      return changed;
    }
    if (formik.values.oldLastName !== formik.values.lastName) {
      changed = true;
      return changed;
    }
    if (formik.values.oldRegion !== formik.values.region) {
      changed = true;
      return changed;
    }
    if (formik.values.oldOffice !== formik.values.office) {
      changed = true;
      return changed;
    }
    if (formik.values.oldEmail !== formik.values.email) {
      changed = true;
      return changed;
    }
    if (formik.values.oldMobileNumber !== formik.values.mobileNumber) {
      changed = true;
      return changed;
    }
    if (formik.values.oldRole !== formik.values.role) {
      changed = true;
      return changed;
    }
    return changed;
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    if (checkFromChanges()) {
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
          Kullanıcı Bilgisi Güncelle
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
              <div className="flex justify-center gap-4">
                <label className="mt-2 flex cursor-pointer justify-center font-roboto font-bold text-orange-400">
                  <input
                    type={"file"}
                    accept=".jpg, .png, .jpeg, .gif"
                    className="hidden"
                    onChange={addPhoto}
                  />
                  <span>Resmi Değiştir</span>
                </label>
                <label
                  className="mt-2 flex cursor-pointer justify-center font-roboto font-bold text-purple-400"
                  onClick={resetPhoto}
                >
                  Varsayılan
                </label>
              </div>
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
                  onChange={async (e) => {
                    const { value } = e.target;
                    formik.setFieldValue("region", value);
                    formik.setFieldValue("office", "Seçiniz");
                  }}
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
                  // onChange={async (e) => {
                  //   const { value } = e.target;
                  //   formik.setFieldValue("office", value);
                  // }}
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
              disabled={formik.values.status ? false : true}
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
            {formik.values.status && (
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
            {!formik.values.status && (
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
