import { useEffect, useState } from "react";
import Loader from "../../../components/loader/Loader";
import { useRegion } from "../../../hooks/region/useRegion";
import { useOffice } from "../../../hooks/office/useOffice";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function OfficeNew() {
  // formik logics
  const formik = useFormik({
    // Initialize
    initialValues: {
      name: "",
      mobileNumber: "",
      region: "Seçiniz",
    },
    // Validation
    validationSchema: Yup.object({
      name: Yup.string()
        .required("İsim bilgisi zorunludur")
        .min(3, "İsim bilgisi en az 3 karakter olmalıdır"),
      mobileNumber: Yup.string()
        .required("Cep telefonu bilgisi zorunludur")
        .matches(/^[0-9]+$/, "Sadece sayılardan oluşmalıdır")
        .length(10, "Cep telefonu bilgisi 10 hane olmalıdır"),
      region: Yup.string()
        .required("Bölge bilgisi zorunludur")
        .notOneOf(["Seçiniz"], "Bölge bilgisi seçiniz"),
    }),

    // From submit
    onSubmit: async (values) => {
      //console.log(values);
      //console.log(formik.errors);
      const status = await handleFormSubmit(values);
      if (status === 201) {
        navigate(`/setting/office/list`);
      }
    },
  });
  const navigate = useNavigate();
  const { newOffice, isLoading } = useOffice();
  const { getRegions } = useRegion();
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    async function regionListGet() {
      const regionList = await getRegions();
      setRegions(regionList);
    }
    regionListGet();
  }, []);

  const handleFormSubmit = async () => {
    const status = await newOffice(
      formik.values.name,
      formik.values.region,
      formik.values.mobileNumber
    );
    return status;
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    if (formik.dirty) {
      if (confirm("Kaydedilmeyen bilgiler kaybolacaktır. Devam edilsin mi?")) {
        navigate(`/setting/office/list`);
      }
    } else {
      navigate(`/setting/office/list`);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="mb-2 flex justify-between">
        <div className="font-roboto font-semibold text-gray-600">
          Yeni Ofis Kaydı
        </div>
      </div>
      <form
        className="grid grid-cols-1 gap-6 md:grid-cols-6"
        onSubmit={formik.handleSubmit}
      >
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-md border border-orange-200">
            <div className="mb-6 rounded-md bg-orange-100 p-2">
              Ofis Bilgileri
            </div>
            <div className="m-2">
              <label
                className={`text-sm font-semibold leading-6 text-gray-900 ${
                  formik.touched.name && formik.errors.name
                    ? "text-red-400"
                    : ""
                }`}
              >
                {formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : "Ofis Adı"}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  maxLength={20}
                  value={formik.values.name}
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
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
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
          </div>
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
          {/* <Link className="w-full" to="/setting/office/list">
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
      </form>
    </>
  );
}
