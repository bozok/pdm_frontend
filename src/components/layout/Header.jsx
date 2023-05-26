import { useLogout } from "../../hooks/auth/useLogout";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "@mantine/core";

function Header({ setIsOpen }) {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { logout } = useLogout();
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
          onClick={setIsOpen}
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
      <div className="flex items-center justify-center">
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <img
              src={user.photo}
              alt="profile image"
              className="mr-4 h-12 w-12 cursor-pointer rounded-full border-2 object-cover"
            />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>{`${user.firstName} ${user.lastName}`}</Menu.Label>
            <Menu.Divider />
            <Menu.Item
              onClick={(e) => navigate(`/authentication/changepassword`)}
            >
              Şifre Değiştir
            </Menu.Item>
            <Menu.Item
              color="red"
              onClick={handleLogout}
              className="font-semibold"
            >
              Çıkış Yap
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
