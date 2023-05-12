import { useState } from "react";
import Loader from "../../components/loader/Loader";
import { useChangePassword } from "../../hooks/auth/useChangePassword";

export default function ChangePassword() {
  const { changePassword, isLoading, error } = useChangePassword();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    changePassword(password, newPassword, newPasswordAgain);
    if (error == null) {
      clearForm();
    }
  };

  const clearForm = () => {
    setPassword("");
    setNewPassword("");
    setNewPasswordAgain("");
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
        onSubmit={handleSubmit}
      >
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-md border border-gray-200">
            <div className="mb-6 bg-gray-200 p-2">Şifre Bilgileri</div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                Mevcut Şifre
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  value={password}
                  autoComplete="false"
                  minLength={8}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                />
              </div>
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                Yeni Şifre
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  value={newPassword}
                  autoComplete="false"
                  minLength={8}
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-md border-0 px-3.5 py-2 font-roboto shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600"
                />
              </div>
            </div>
            <div className="m-2">
              <label className="text-sm font-semibold leading-6 text-gray-900">
                Yeni Şifre (Tekrar)
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  value={newPasswordAgain}
                  autoComplete="false"
                  minLength={8}
                  required
                  onChange={(e) => setNewPasswordAgain(e.target.value)}
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
