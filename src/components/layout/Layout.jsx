import { useState } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Header setIsOpen={setIsOpen} isOpen={isOpen} />
      <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className="p-4">{children}</div>
    </>
  );
}
