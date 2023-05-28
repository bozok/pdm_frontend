import React, { useState } from "react";
import useTable from "../../../hooks/table/useTable";
import TableFooter from "../TableFooter";
import { useNavigate } from "react-router-dom";
const Table = ({ data, setList, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  // const [order, setOrder] = useState("asc");
  const headerClass =
    "px-4 py-2 border-b-2 border-gray-200 bg-orange-100 text-left text-xs font-semibold text-gray-600 uppercase";
  const navigate = useNavigate();
  const showEdit = (id) => {
    navigate(`/user/${id}`);
  };
  // const applySorting = (col) => {
  //   if (order === "asc") {
  //     const sortedList = [...data].sort((a, b) =>
  //       a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
  //     );
  //     setList(sortedList);
  //     setOrder("dsc");
  //   } else {
  //     const sortedList = [...data].sort((a, b) =>
  //       a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
  //     );
  //     setList(sortedList);
  //     setOrder("asc");
  //   }
  // };
  return (
    <>
      <table className="mt-4 w-full p-4 font-roboto">
        <thead className="">
          <tr className="">
            <th
              className={headerClass}
              // onClick={() => applySorting("identityNo")}
            >
              TC Kİmlİk No
            </th>
            <th
              className={headerClass}
              // onClick={() => applySorting("firstName")}
            >
              İsİm
            </th>
            <th
              className={headerClass}
              // onClick={() => applySorting("lastName")}
            >
              Soyİsİm
            </th>
            <th
              className={headerClass}
              // onClick={() => applySorting("region")}
            >
              Bölge
            </th>
            <th
              className={headerClass}
              // onClick={() => applySorting("office")}
            >
              Ofİs
            </th>
            <th
              className={headerClass}
              // onClick={() => applySorting("role")}
            >
              Rol
            </th>
            <th className={headerClass}>Güncelle</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((item, index) => {
            const {
              _id,
              identityNo,
              firstName,
              lastName,
              region,
              office,
              role,
              status,
            } = item;
            return (
              <tr
                key={index}
                className={`${
                  status ? "hover:bg-orange-50" : "bg-red-100"
                } group text-xs `}
              >
                <td className="px-4 py-2">{identityNo}</td>
                <td className="px-4 py-2">{firstName}</td>
                <td className="px-4 py-2">{lastName}</td>
                <td className="px-4 py-2">{region}</td>
                <td className="px-4 py-2">{office}</td>
                <td className="px-4 py-2">{role}</td>
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
