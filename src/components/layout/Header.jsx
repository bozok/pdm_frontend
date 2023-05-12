import { useLogout } from "../../hooks/auth/useLogout";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { Link } from "react-router-dom";

function Header({ setIsOpen, isOpen }) {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  function toggleSidebar() {
    setIsOpen(!isOpen);
  }
  const handleLogout = async () => {
    await logout();
  };
  return (
    <div className="flex h-14 w-full items-center justify-between border-b-2 bg-gradient-to-r from-orange-500 to-pink-500 ">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mx-2 h-6 w-6 cursor-pointer text-white"
          onClick={toggleSidebar}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
        <Link className="w-full" to="/">
          <span className="font-roboto text-white">Proje Danışma Merkezi</span>
        </Link>
      </div>
      <div className="flex">
        <div className="flex-col">
          <div className="text-center  text-sm text-gray-100">{`${user.firstName} ${user.lastName}`}</div>
          <button
            className="mx-4 flex items-center justify-center rounded-md bg-orange-400 px-2 font-roboto text-white shadow-sm"
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-1 h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            Çıkış Yap
          </button>
        </div>
        <img
          src={user.photo}
          alt="profile image"
          className="mr-4 h-12 w-12 cursor-pointer rounded-full border-2 object-cover"
        />
      </div>
    </div>
  );
}

export default Header;
