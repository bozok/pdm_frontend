import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { useDisclosure } from "@mantine/hooks";

export default function Layout({ children }) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Header setIsOpen={open} isOpen={opened} />
      <Sidebar setIsOpen={open} isOpen={opened} isClose={close} />
      <div className="p-4">{children}</div>
    </>
  );
}
