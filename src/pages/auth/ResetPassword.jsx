import { useRef } from "react";
import { useResetPassword } from "../../hooks/auth/useResetPassword";
import Loader from "../../components/loader/Loader";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const passwordNew1 = useRef();
  const passwordNew2 = useRef();
  const { resetPassword, isLoading } = useResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await resetPassword(
      passwordNew1.current.value,
      passwordNew2.current.value,
      resetToken
    );
    if (response) {
      navigate("/login");
    }
  };
  return (
    <div className="selection:bg-orange-500 selection:text-white">
      {isLoading && <Loader />}
      <div className="flex min-h-screen items-center justify-center bg-orange-100">
        <div className="flex-1 p-8">
          <div className="mx-auto w-80 overflow-hidden rounded-3xl bg-white shadow-xl">
            <div className="rounded-bl-4xl relative h-48 bg-orange-500">
              <svg
                className="absolute bottom-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
              >
                <path
                  fill="#ffffff"
                  fillOpacity="1"
                  d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>
            <div className="rounded-tr-4xl bg-white px-10 pb-8 pt-4">
              <h1 className="text-md font-semibold text-gray-500">
                Yeni şifrenizi belirleyiniz.
              </h1>
              <form className="mt-12" onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    id="password1"
                    type="password"
                    name="password1"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-orange-600 focus:outline-none"
                    placeholder="Şifreniz"
                    autoComplete="false"
                    minLength={8}
                    required
                    ref={passwordNew1}
                  />
                  <label
                    htmlFor="password1"
                    className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                  >
                    Şifreniz
                  </label>
                </div>

                <div className="relative mt-10">
                  <input
                    id="password2"
                    type="password"
                    name="password2"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-orange-600 focus:outline-none"
                    placeholder="Şifreniz (Tekrar)"
                    autoComplete="false"
                    minLength={8}
                    required
                    ref={passwordNew2}
                  />
                  <label
                    htmlFor="password2"
                    className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                  >
                    Şifreniz (Tekrar)
                  </label>
                </div>

                <button
                  type="sumbit"
                  className="mt-10 flex w-full cursor-pointer justify-center rounded bg-orange-500 px-4 py-2 text-center font-semibold text-white hover:bg-orange-400 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-80 focus:ring-offset-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mr-4 h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  Şifremi Değiştir
                </button>
              </form>
              {/* <a
                href="/login"
                className="mt-4 block text-center text-sm font-medium text-orange-600 hover:underline focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                {" "}
                Giriş sayfasına git{" "}
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
