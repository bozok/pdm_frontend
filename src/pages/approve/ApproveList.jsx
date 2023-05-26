import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSale } from "../../hooks/sale/useSale";
import Loader from "../../components/loader/Loader";
import Table from "../../components/table/sale/Table";

export default function ApproveList() {
  const navigate = useNavigate();
  const { getSales, isLoading } = useSale();
  const [query, setQuery] = useState("");
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState(list);

  useEffect(() => {
    getSaleList();
  }, []);

  async function getSaleList() {
    const response = await getSales();
    setList(response);
  }

  const search = (list) => {
    return list.filter(
      (item) =>
        item.saleType.toLowerCase().includes(query) ||
        item.customerInfo.firstName.toLowerCase().includes(query) ||
        item.customerInfo.companyName.toLowerCase().includes(query)
    );
  };

  useEffect(() => {
    setFilteredList(
      list.filter(
        (p) =>
          p.saleType.toLowerCase().includes(query) ||
          p.customerInfo.firstName.toLowerCase().includes(query) ||
          p.customerInfo.companyName.toLowerCase().includes(query)
      )
    );
  }, [query, list]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="mb-2 flex items-center">
        <div className="">
          <span className="font-roboto font-semibold text-gray-600">
            Satışı Yapılan Süreçler
          </span>
          <span className="rounde ml-2 rounded-full bg-orange-500 px-2 font-roboto text-white">
            {filteredList.length}
          </span>
        </div>
        <div className="ml-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="absolute ml-1 h-5 w-5 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="search"
            placeholder="Arama ..."
            className="rounded-md py-1 pl-7 font-roboto text-sm text-gray-500 outline-none ring-1 ring-blue-200"
            onChange={(e) => setQuery(e.target.value)}
          ></input>
        </div>
      </div>
      <Table data={search(list)} rowsPerPage={15} />
    </>
  );
}
