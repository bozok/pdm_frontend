import React, { useState } from "react";
import useTable from "../../../hooks/table/useTable";
import TableFooter from "../TableFooter";

const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const headerClass =
    "px-4 py-2 border-b-2 border-gray-200 bg-orange-100 text-left text-xs font-semibold text-gray-600 uppercase";
  return (
    <>
      <table className="mt-4 w-full p-4 font-roboto">
        <thead className="">
          <tr className="">
            <th className={headerClass}>Kayıt Tİpİ</th>
            <th className={headerClass}>Açıklama</th>
            <th className={headerClass}>İşlemİ Yapan</th>
            <th className={headerClass}>Bölge</th>
            <th className={headerClass}>Ofİs</th>
            <th className={headerClass}>İşlem Tarİhİ</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((item, index) => {
            const {
              _id,
              actionType,
              actionText,
              doneBy,
              doneByRegion,
              doneByOffice,
              createdAt,
            } = item;
            return (
              <tr key={index} className="group text-xs hover:bg-orange-50">
                <td className="px-4 py-2">{actionType}</td>
                <td className="px-4 py-2">{actionText}</td>
                <td className="px-4 py-2">{doneBy}</td>
                <td className="px-4 py-2">{doneByRegion}</td>
                <td className="px-4 py-2">{doneByOffice}</td>
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
