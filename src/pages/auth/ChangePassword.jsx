import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { useChangePassword } from "../../hooks/auth/useChangePassword";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ChangePassword() {
  // formik logics
  const formik = useFormik({
    // Initialize
    initialValues: {
      password: "",
      newPassword: "",
      newPasswordAgain: "",
    },
    // Validation
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Mevcut şifrenizi giriniz")
        .min(8, "Şifreniz en az 8 karakter olmalı"),
      newPassword: Yup.string()
        .required("Yeni şifrenizi giriniz")
        .min(8, "Yeni şifreniz en az 8 karakter olmalı"),
      newPasswordAgain: Yup.string()
        .required("Yeni şifrenizi tekrar giriniz")
        .min(8, "Yeni şifreniz en az 8 karakter olmalı"),
    }),

    // From submit
    onSubmit: async (values) => {
      //console.log(values);
      const status = await handleFormSubmit(values);
      if (status === 200) {
        navigate(`/`);
      }
    },
  });

  const navigate = useNavigate();
  const { changePassword, isLoading } = useChangePassword();

  const handleFormSubmit = () => {
    const status = changePassword(
      formik.values.password,
      formik.values.newPassword,
      formik.values.newPasswordAgain
    );
    return status;
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="mb-2 flex justify-between">
        <div className="font-roboto font-semibold text-gray-600">
          Şifre Değiştirme
        </div>
      </div>
      <form
        className="grid grid-cols-1 gap-6 md:grid-cols-6"
        onSubmit={formik.handleSubmit}
      >
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-md border border-orange-200">
            <div className="mb-6 rounded-md bg-orange-100 p-2">
              Şifre Bilgileri
            </div>
            <div className="m-2">
              <label
                className={`text-sm font-semibold leading-6 text-gray-900 ${
                  formik.touched.password && formik.errors.password
                    ? "text-red-400"
                    : ""
                }`}
              >
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : "Mevcut Şifre"}
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                />
              </div>
            </div>
            <div className="m-2">
              <label
                className={`text-sm font-semibold leading-6 text-gray-900 ${
                  formik.touched.newPassword && formik.errors.newPassword
                    ? "text-red-400"
                    : ""
                }`}
              >
                {formik.touched.newPassword && formik.errors.newPassword
                  ? formik.errors.newPassword
                  : "Yeni Şifre"}
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="newPassword"
                  minLength={8}
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                />
              </div>
            </div>
            <div className="m-2">
              <label
                className={`text-sm font-semibold leading-6 text-gray-900 ${
                  formik.touched.newPasswordAgain &&
                  formik.errors.newPasswordAgain
                    ? "text-red-400"
                    : ""
                }`}
              >
                {formik.touched.newPasswordAgain &&
                formik.errors.newPasswordAgain
                  ? formik.errors.newPasswordAgain
                  : "Yeni Şifre (Tekrar)"}
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="newPasswordAgain"
                  minLength={8}
                  value={formik.values.newPasswordAgain}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                />
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
        </div>
      </form>
    </>
  );
}
