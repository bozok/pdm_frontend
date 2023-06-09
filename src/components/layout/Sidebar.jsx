import { useState, useRef, useEffect } from "react";
import companyLogo from "../../assets/dummy/companyLogo2.png";
import { useMenuItems } from "../../hooks/menu/useMenuItems";
import SidebarItem from "./SidebarItem";
import { Drawer } from "@mantine/core";

export default function Sidebar({
  setIsOpen,
  isOpen,
  settingOpen,
  setSettingOpen,
  isClose,
}) {
  const { getMenuItemsByRole, isLoading } = useMenuItems();
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    async function menuItemsGet() {
      const items = await getMenuItemsByRole();
      setMenuItems(items);
    }
    menuItemsGet();
  }, []);
  return (
    <Drawer
      size={250}
      opened={isOpen}
      onClose={isClose}
      withCloseButton={false}
      // transitionProps={{
      //   transition: "rotate-left",
      //   duration: 150,
      //   timingFunction: "linear",
      // }}
    >
      <div className="flex justify-center border-b-2">
        <img src={companyLogo} className="w-32" />
      </div>
      <div className="pt-2">
        <ul>
          {menuItems.map((item, index) => {
            return (
              <SidebarItem
                key={index}
                item={item}
                settingOpen={settingOpen}
                setSettingOpen={setSettingOpen}
              />
            );
          })}
        </ul>
      </div>
    </Drawer>
  );
}
