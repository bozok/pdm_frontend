import { useState, useRef, useEffect } from "react";
import companyLogo from "../../assets/dummy/companyLogo2.png";
import { useMenuItems } from "../../hooks/menu/useMenuItems";
import SidebarItem from "./SidebarItem";
import { useAuthContext } from "../../hooks/auth/useAuthContext";

export default function Sidebar({ setIsOpen, isOpen }) {
  const { user } = useAuthContext();

  const { getMenuItems, isLoading } = useMenuItems();
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    async function menuItemsGet() {
      const items = await getMenuItems();
      setMenuItems(items);
    }
    menuItemsGet();
  }, []);
  const refOne = useRef(null);
  const handleClickOutside = (e) => {
    if (!refOne.current.contains(e.target)) {
      setIsOpen(false);
    } else {
      //console.log("clicked in navbar...");
    }
  };
  return (
    <div
      className={`fixed left-0 top-0 flex h-screen overflow-hidden ${
        isOpen ? "w-screen" : "w-0"
      }`}
    >
      <div ref={refOne} className="bg-gray-100">
        <nav className="w-56">
          <div className="flex justify-center border-b-2">
            <img src={companyLogo} className="w-32" />
          </div>
          <div className="pt-2">
            <ul>
              {menuItems.map((item, index) => {
                return <SidebarItem key={index} item={item} />;
              })}
            </ul>
          </div>
        </nav>
      </div>
      <div className="h-screen w-screen bg-black opacity-50"></div>
    </div>
  );
}
