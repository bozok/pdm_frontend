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
    navigate(`/setting/office/${id}`);
  };
  return (
    <>
      <table className="mt-4 w-full p-4 font-roboto">
        <thead className="">
          <tr className="">
            <th className={headerClass}>Ofİs Adı</th>
            <th className={headerClass}>Bölge</th>
            <th className={headerClass}>Ofİs Cep Telefonu</th>
            <th className={headerClass}>Durum</th>
            <th className={headerClass}>Güncelle</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((item, index) => {
            const { _id, name, regionName, mobileNumber, status } = item;
            return (
              <tr key={index} className="group text-xs hover:bg-orange-50">
                <td className="px-4 py-2">{name}</td>
                <td className="px-4 py-2">{regionName}</td>
                <td className="px-4 py-2">{mobileNumber}</td>
                <td className="px-4 py-2">
                  {status === true ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="ml-2 h-6 w-6 text-sky-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="ml-2 h-6 w-6 text-yellow-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3l8.735 8.735m0 0a.374.374 0 11.53.53m-.53-.53l.53.53m0 0L21 21M14.652 9.348a3.75 3.75 0 010 5.304m2.121-7.425a6.75 6.75 0 010 9.546m2.121-11.667c3.808 3.807 3.808 9.98 0 13.788m-9.546-4.242a3.733 3.733 0 01-1.06-2.122m-1.061 4.243a6.75 6.75 0 01-1.625-6.929m-.496 9.05c-3.068-3.067-3.664-7.67-1.79-11.334M12 12h.008v.008H12V12z"
                      />
                    </svg>
                  )}
                </td>
                <td className="px-4 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="invisible ml-6 h-6 w-6 cursor-pointer group-hover:visible"
                    onClick={() => showEdit(_id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
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
