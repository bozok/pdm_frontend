import { useState } from "react";
import AccordionAllowItem from "./AccordionAllowItem";
import AccordionDenyItem from "./AccordionDenyItem";

const Accordion = (props) => {
  const [menu, setItem] = useState(props.data);
  const handleToggle = () => {
    let newActive = menu.active === 1 ? 0 : 1;
    setItem({ ...menu, active: newActive });
  };
  return (
    <div
      className={`group ${
        menu.active === 1 ? "is-active bg-white" : "is-active"
      } mb-2 w-[720px] rounded-md border border-gray-300 bg-gray-100 p-4 duration-300`}
    >
      <div className="flex items-center">
        <div className="w-full group-[.is-active]:font-bold">{menu.title}</div>
        {/* <div
          className="cursor-pointer text-xl duration-300 group-[.is-active]:rotate-[180deg]"
          onClick={handleToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div> */}
      </div>
      <div className="max-h-0 overflow-hidden duration-300 group-[.is-active]:max-h-[260px]">
        <div className="mt-2 flex justify-between">
          <div>
            <div className="mb-2 underline">Görüntüleme</div>
            {menu.canView.map((item, index) => {
              return (
                <AccordionAllowItem
                  key={index}
                  index={index}
                  item={item}
                  can={"view"}
                  menu={menu.title}
                  setRefresh={props.setRefresh}
                />
              );
            })}
            {menu.canViewNot.map((item, index) => {
              return (
                <AccordionDenyItem
                  key={index}
                  index={index}
                  item={item}
                  can={"view"}
                  menu={menu.title}
                  setRefresh={props.setRefresh}
                />
              );
            })}
          </div>
          <div>
            <div className="mb-2 underline">Okuma</div>
            {menu.canRead.map((item, index) => {
              return (
                <AccordionAllowItem
                  key={index}
                  index={index}
                  item={item}
                  can={"read"}
                  menu={menu.title}
                  setRefresh={props.setRefresh}
                />
              );
            })}
            {menu.canReadNot.map((item, index) => {
              return (
                <AccordionDenyItem
                  key={index}
                  index={index}
                  item={item}
                  can={"read"}
                  menu={menu.title}
                  setRefresh={props.setRefresh}
                />
              );
            })}
          </div>
          <div>
            <div className="mb-2 underline">Yazma</div>
            {menu.canWrite.map((item, index) => {
              return (
                <AccordionAllowItem
                  key={index}
                  index={index}
                  item={item}
                  can={"write"}
                  menu={menu.title}
                  setRefresh={props.setRefresh}
                />
              );
            })}
            {menu.canWriteNot.map((item, index) => {
              return (
                <AccordionDenyItem
                  key={index}
                  index={index}
                  item={item}
                  can={"write"}
                  menu={menu.title}
                  setRefresh={props.setRefresh}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
