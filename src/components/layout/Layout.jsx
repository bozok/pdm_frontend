import { useState } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { useDisclosure } from "@mantine/hooks";

export default function Layout({ children }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [settingOpen, setSettingOpen] = useState(false);
  return (
    <>
      <Header setIsOpen={open} />
      <Sidebar
        setIsOpen={open}
        isOpen={opened}
        settingOpen={settingOpen}
        setSettingOpen={setSettingOpen}
        isClose={close}
      />
      <div className="p-4">{children}</div>
    </>
  );
}
