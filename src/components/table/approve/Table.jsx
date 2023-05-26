import React, { useState } from "react";
import useTable from "../../../hooks/table/useTable";
import TableFooter from "../TableFooter";
import { useNavigate } from "react-router-dom";
const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const headerClass =
    "px-4 py-2 border-b-2 border-gray-200 bg-orange-100 text-left text-xs font-semibold text-gray-600 uppercase";
  const navigate = useNavigate();
  const showDetail = (id, saleTypeName) => {
    switch (saleTypeName) {
      case "İleri Girişimcilik":
        navigate(`/sale/IG/${id}`);
        break;

      default:
        break;
    }
  };
  return (
    <>
      <table className="mt-4 w-full p-4 font-roboto">
        <thead className="">
          <tr className="">
            <th className={headerClass}>Proje Kodu</th>
            <th className={headerClass}>Proje Türü</th>
            <th className={headerClass}>Müşteri Adı</th>
            <th className={headerClass}>Firma Adı</th>
            <th className={headerClass}>Proje Tutarı</th>
            <th className={headerClass}>Bağlı Ofis</th>
            <th className={headerClass}>Kayıt Tarİhİ</th>
            <th className={headerClass}>Durum</th>
            <th className={headerClass}>Detaylar</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((item, index) => {
            const {
              _id,
              projectCode,
              saleType,
              price,
              currency,
              createdAt,
              status,
            } = item;
            return (
              <tr key={index} className="group text-xs hover:bg-orange-50">
                <td className="px-4 py-2">{projectCode}</td>
                <td className="px-4 py-2">{saleType}</td>
                <td className="px-4 py-2">
                  {item.customerInfo.firstName} {item.customerInfo.lastName}
                </td>
                <td className="px-4 py-2">{item.customerInfo.companyName}</td>
                <td className="px-4 py-2">
                  {price} {currency}
                </td>
                <td className="px-4 py-2">{item.assignedInfo.office}</td>
                <td className="px-4 py-2">
                  {new Date(createdAt).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </td>
                <td className="px-2 py-2">
                  <span className="rounde ml-2 rounded-full bg-blue-500 px-2 font-roboto text-white">
                    {status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="invisible ml-5 h-6 w-6 cursor-pointer group-hover:visible"
                    onClick={() => showDetail(_id, saleType)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
