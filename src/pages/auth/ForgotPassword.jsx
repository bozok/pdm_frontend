import { useRef } from "react";
import { useForgotPassword } from "../../hooks/auth/useForgotPassword";
import Loader from "../../components/loader/Loader";

export default function ForgotPassword() {
  const email = useRef();
  const { forgotPassword, isLoading } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("E-posta adresinizi yazmadınız");
    }
    await forgotPassword(email.current.value);
    email.current.value = "";
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
                Şifre sıfırlama erknanındasınız. Lütfen e-posta adresinizi
                yazınız.
              </h1>
              <form className="mt-12" onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    ref={email}
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-orange-600 focus:outline-none"
                    placeholder="E-posta adresiniz"
                    autoComplete="false"
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                  >
                    E-posta adresiniz
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
                  Şifremi Sıfırla
                </button>
              </form>
              <a
                href="/login"
                className="mt-4 block text-center text-sm font-medium text-orange-600 hover:underline focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                {" "}
                Giriş sayfasına dön{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
