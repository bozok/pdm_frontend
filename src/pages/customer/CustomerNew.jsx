import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import { useUser } from "../../hooks/user/useUser";
import { useCustomer } from "../../hooks/customer/useCustomer";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function CustomerNew() {
  // formik logics
  const formik = useFormik({
    // Initialize
    initialValues: {
      identityNo: "",
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      taxIdNo: "",
      companyName: "",
      financialAdvisor: "Seçiniz",
      supplierMachinist: "Seçiniz",
      comment: "",
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
          "İsim bilgisi harflerden oluşmalıdır"
        )
        .min(3, "İsim bilgisi en az 3 karakter olmalıdır"),
      lastName: Yup.string()
        .required("Soyisim bilgisi zorunludur")
        .matches(
          /^[aA-zZ-ğüşöçıİĞÜŞÖÇ\s]+$/,
          "Soyisim bilgisi harflerden oluşmalıdır"
        )
        .min(2, "Soyisim bilgisi en az 2 karakter olmalıdır"),
      email: Yup.string()
        .email("Geçerli bir e-posta adresi giriniz")
        .required("E-posta bilgisi zorunludur"),
      mobileNumber: Yup.string()
        .required("Cep telefonu bilgisi zorunludur")
        .matches(/^[0-9]+$/, "Sadece sayılardan oluşmalıdır")
        .length(10, "Cep telefonu bilgisi 10 hane olmalıdır"),
      taxIdNo: Yup.string()
        .required("Vergi kimlik bilgisi zorunludur")
        .matches(/^[0-9]+$/, "Sadece sayılardan oluşmalıdır")
        .length(10, "Vergi kimlik bilgisi 10 hane olmalıdır"),
      companyName: Yup.string()
        .required("Firma Adı bilgisi zorunludur")
        .matches(
          /^[aA-zZ-ğüşöçıİĞÜŞÖÇ\s]+$/,
          "Firma Adı bilgisi harflerden oluşmalıdır"
        )
        .min(2, "Firma Adı bilgisi en az 2 karakter olmalıdır"),
      financialAdvisor: Yup.string(),
      supplierMachinist: Yup.string(),
      comment: Yup.string(),
    }),

    // From submit
    onSubmit: async (values) => {
      //console.log(values);
      //console.log(formik.errors);
      const status = await handleFormSubmit(values);
      if (status === 201) {
        navigate(`/customer/list`);
      }
    },
  });
  const navigate = useNavigate();
  const { getUserListByRole } = useUser();
  const { newCustomer, isLoading } = useCustomer();
  const [financialAdvisors, setFinancialAdvisors] = useState([]);
  const [supplierMachinists, setSupplierMachinists] = useState([]);

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

  const handleFormSubmit = async (values) => {
    const status = await newCustomer(
      values.identityNo,
      values.firstName,
      values.lastName,
      values.mobileNumber,
      values.email,
      values.taxIdNo,
      values.companyName,
      values.financialAdvisor,
      values.supplierMachinist,
      values.comment
    );
    return status;
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    if (formik.dirty) {
      if (confirm("Kaydedilmeyen bilgiler kaybolacaktır. Devam edilsin mi?")) {
        navigate(`/customer/list`);
      }
    } else {
      navigate(`/customer/list`);
    }
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
        onSubmit={formik.handleSubmit}
      >
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-md border border-orange-200">
            <div className="mb-6 rounded-md bg-orange-100 p-2">
              Firma Sahibi Bilgileri
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
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
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
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
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
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                />
              </div>
            </div>
            <div className="m-2">
              <label
                className={`text-sm font-semibold leading-6 text-gray-900 ${
                  formik.touched.comment && formik.errors.comment
                    ? "text-red-400"
                    : ""
                }`}
              >
                {formik.touched.comment && formik.errors.comment
                  ? formik.errors.comment
                  : "Not"}
              </label>
              <div className="mt-1">
                <textarea
                  type="text"
                  name="comment"
                  value={formik.values.comment}
                  minLength={2}
                  maxLength={150}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
              <label
                className={`text-sm font-semibold leading-6 text-gray-900 ${
                  formik.touched.taxIdNo && formik.errors.taxIdNo
                    ? "text-red-400"
                    : ""
                }`}
              >
                {formik.touched.taxIdNo && formik.errors.taxIdNo
                  ? formik.errors.taxIdNo
                  : "Vergi Kimlik Numarası"}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="taxIdNo"
                  maxLength={10}
                  value={formik.values.taxIdNo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                />
              </div>
            </div>
            <div className="m-2">
              <label
                className={`text-sm font-semibold leading-6 text-gray-900 ${
                  formik.touched.companyName && formik.errors.companyName
                    ? "text-red-400"
                    : ""
                }`}
              >
                {formik.touched.companyName && formik.errors.companyName
                  ? formik.errors.companyName
                  : "Firma Adı"}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="companyName"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                  name="financialAdvisor"
                  value={formik.values.financialAdvisor}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                >
                  <option value={"Seçiniz"}>Seçiniz</option>
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
                  name="supplierMachinist"
                  value={formik.values.supplierMachinist}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                >
                  <option value={"Seçiniz"}>Seçiniz</option>
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
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
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
            {/* <Link className="w-full" to="/customer/list">
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
