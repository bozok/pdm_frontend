import React from "react";
import { Accordion } from "@mantine/core";

const SaleIgProjectTagProcess = ({
  assignedName,
  assignedSurname,
  assignedOffice,
  registrantName,
  registrantSurname,
  registrantOffice,
  createdAt,
}) => {
  return (
    <Accordion.Item value="process">
      <Accordion.Control
        icon={
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
              d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
            />
          </svg>
        }
      >
        Süreç Bilgileri
      </Accordion.Control>
      <Accordion.Panel>
        <div className="ml-2">
          <span className="text-sm font-semibold">Atanan Kişi: </span>
          <span className="text-sm">
            {assignedName} {assignedSurname}
          </span>
        </div>
        <div className="ml-2">
          <span className="text-sm font-semibold">Bağlı Olduğu Ofis: </span>
          <span className="text-sm">{assignedOffice}</span>
        </div>
        <div className="ml-2">
          <span className="text-sm font-semibold">Oluşturan Kişi: </span>
          <span className="text-sm">
            {registrantName} {registrantSurname}
          </span>
        </div>
        <div className="ml-2">
          <span className="text-sm font-semibold">Oluşturan Ofis: </span>
          <span className="text-sm">{registrantOffice}</span>
        </div>
        <div className="ml-2">
          <span className="text-sm font-semibold">Oluşturulma Tarihi: </span>
          <span className="text-sm">
            {new Date(createdAt).toLocaleString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default SaleIgProjectTagProcess;
