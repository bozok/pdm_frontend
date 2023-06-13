import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import { useUser } from "../../hooks/user/useUser";
import { useCustomer } from "../../hooks/customer/useCustomer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function CustomerUpdate() {
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
      taxIdNo: "",
      oldTaxIdNo: "",
      companyName: "",
      oldCompanyName: "",
      financialAdvisor: "Seçiniz",
      oldFinancialAdvisor: "Seçiniz",
      supplierMachinist: "Seçiniz",
      oldSupplierMachinist: "Seçiniz",
      comment: "",
      oldComment: "",
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
      // console.log(values);
      // console.log(formik.errors);
      const status = await handleFormSubmit(values);
      if (status === 200) {
        navigate(`/customer/list`);
      }
    },
  });

  const navigate = useNavigate();
  const param = useParams();
  const { getUserListByRole } = useUser();
  const { getCustomer, updateCustomer, isLoading } = useCustomer();
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
    const status = await updateCustomer(
      formik.values.id,
      formik.values.identityNo,
      formik.values.firstName,
      formik.values.lastName,
      formik.values.mobileNumber,
      formik.values.email,
      formik.values.taxIdNo,
      formik.values.companyName,
      formik.values.financialAdvisor,
      formik.values.supplierMachinist,
      formik.values.comment
    );
    return status;
  };

  async function getCustomerInfo() {
    const customerInfo = await getCustomer(param.id);
    formik.setFieldValue("id", customerInfo._id);
    formik.setFieldValue("identityNo", customerInfo.identityNo);
    formik.setFieldValue("oldIdentityNo", customerInfo.identityNo);
    formik.setFieldValue("firstName", customerInfo.firstName);
    formik.setFieldValue("oldFirstName", customerInfo.firstName);
    formik.setFieldValue("lastName", customerInfo.lastName);
    formik.setFieldValue("oldLastName", customerInfo.lastName);
    formik.setFieldValue("mobileNumber", customerInfo.mobileNumber);
    formik.setFieldValue("oldMobileNumber", customerInfo.mobileNumber);
    formik.setFieldValue("email", customerInfo.email);
    formik.setFieldValue("oldEmail", customerInfo.email);
    formik.setFieldValue("taxIdNo", customerInfo.taxIdNo);
    formik.setFieldValue("oldTaxIdNo", customerInfo.taxIdNo);
    formik.setFieldValue("companyName", customerInfo.companyName);
    formik.setFieldValue("oldCompanyName", customerInfo.companyName);
    formik.setFieldValue("financialAdvisor", customerInfo.financialAdvisor);
    formik.setFieldValue("oldFinancialAdvisor", customerInfo.financialAdvisor);
    formik.setFieldValue("supplierMachinist", customerInfo.supplierMachinist);
    formik.setFieldValue(
      "oldSupplierMachinist",
      customerInfo.supplierMachinist
    );
    formik.setFieldValue("comment", customerInfo.comment);
    formik.setFieldValue("oldComment", customerInfo.comment);
  }

  useEffect(() => {
    if (param.id) {
      getCustomerInfo();
    }
  }, [param.id]);

  const handleGoBack = (e) => {
    e.preventDefault();
    if (checkFromChanges()) {
      if (confirm("Kaydedilmeyen bilgiler kaybolacaktır. Devam edilsin mi?")) {
        navigate(`/customer/list`);
      }
    } else {
      navigate(`/customer/list`);
    }
  };

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
    if (formik.values.oldComment !== formik.values.comment) {
      changed = true;
      return changed;
    }
    if (formik.values.oldTaxIdNo !== formik.values.taxIdNo) {
      changed = true;
      return changed;
    }
    if (formik.values.oldCompanyName !== formik.values.companyName) {
      changed = true;
      return changed;
    }
    if (formik.values.oldFinancialAdvisor !== formik.values.financialAdvisor) {
      changed = true;
      return changed;
    }
    if (
      formik.values.oldSupplierMachinist !== formik.values.supplierMachinist
    ) {
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
    return changed;
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="mb-2 flex flex-row justify-between">
        <div className="font-roboto font-semibold text-gray-600">
          Müşteri Bilgisi Güncelle
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
                  formik.touched.lastName && formik.errors.lastName
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
                  <option value={""}>Seçiniz</option>
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
                  <option value={""}>Seçiniz</option>
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
                className="mr-3 h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
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
