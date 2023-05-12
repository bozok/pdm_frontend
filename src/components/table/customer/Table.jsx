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
  const showEdit = (id) => {
    navigate(`/customer/${id}`);
  };
  const showSale = (id) => {
    navigate(`/sale/new/${id}`);
  };
  return (
    <>
      <table className="mt-4 w-full p-4 font-roboto">
        <thead className="">
          <tr className="">
            <th className={headerClass}>İsİm</th>
            <th className={headerClass}>Soyİsİm</th>
            <th className={headerClass}>Fİrma Adı</th>
            <th className={headerClass}>Vergİ Kİmlİk No</th>
            <th className={headerClass}>E-posta</th>
            <th className={headerClass}>Cep Telefonu</th>
            <th className={headerClass}>Güncelle</th>
            <th className={headerClass}>Satış Yap</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((item, index) => {
            const {
              _id,
              firstName,
              lastName,
              email,
              companyName,
              taxIdNo,
              mobileNumber,
            } = item;
            return (
              <tr key={index} className="group text-xs hover:bg-orange-50">
                <td className="px-4 py-2">{firstName}</td>
                <td className="px-4 py-2">{lastName}</td>
                <td className="px-4 py-2">{companyName}</td>
                <td className="px-4 py-2">{taxIdNo}</td>
                <td className="px-4 py-2">{email}</td>
                <td className="px-4 py-2">{mobileNumber}</td>
                <td className="px-4 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="invisible ml-5 h-6 w-6 cursor-pointer group-hover:visible"
                    onClick={() => showEdit(_id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </td>
                <td className="px-4 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="invisible ml-4 h-6 w-6 cursor-pointer group-hover:visible"
                    onClick={() => showSale(_id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
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
