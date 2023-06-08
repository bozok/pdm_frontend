import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/user/useUser";
import Loader from "../../components/loader/Loader";
import Table from "../../components/table/user/Table";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const navigate = useNavigate();
  const { getUserList, isLoading } = useUser();
  const [query, setQuery] = useState("");
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState(list);

  const showNew = () => {
    navigate("/user/new");
  };

  useEffect(() => {
    getEmployeeList();
  }, []);

  async function getEmployeeList() {
    const response = await getUserList();
    setList(response.data);
  }

  const search = (list) => {
    return list.filter(
      (item) =>
        item.firstName.toLowerCase().includes(query) ||
        item.lastName.toLowerCase().includes(query)
    );
  };

  useEffect(() => {
    setFilteredList(
      list.filter(
        (p) =>
          p.firstName.toLowerCase().includes(query) ||
          p.lastName.toLowerCase().includes(query)
      )
    );
  }, [query, list]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-roboto font-semibold text-gray-600">
            Kullanıcılar
          </span>
          <span
            title="Toplam kullanıcı sayısı"
            className="rounde ml-2 rounded-full bg-orange-500 px-2 font-roboto text-white"
          >
            {filteredList.length}
          </span>
          <div className="ml-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute ml-1 mt-1 h-5 w-5 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="search"
              placeholder="İsim veya soyisimle arama"
              className="rounded-md py-1 pl-7 font-roboto text-[12px] text-gray-500 outline-none ring-1 ring-blue-200"
              onChange={(e) => setQuery(e.target.value)}
            ></input>
          </div>
        </div>
        <div className=" flex items-center gap-2">
          <button
            title="Yenile"
            onClick={() => getEmployeeList()}
            className="rounded-md bg-teal-400 px-2.5 py-1.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>

          <button
            onClick={() => showNew()}
            className="ml-4 flex w-full items-center justify-center rounded-md bg-sky-400 px-2.5 py-1.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-1 h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Yeni Kullanıcı
          </button>
        </div>
      </div>
      {/* <Table data={search(list)} setList={setList} /> */}
      <Table data={search(list)} rowsPerPage={15} />
    </>
  );
}
