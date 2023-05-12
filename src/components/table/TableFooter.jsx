import React, { useEffect } from "react";

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className="w-full border-b-2 border-gray-200 bg-orange-100 px-4 py-1 text-left text-xs font-semibold uppercase text-gray-600">
      {range.map((el, index) => (
        <button
          key={index}
          className={`ml-1 mr-1 cursor-pointer rounded-sm border-none px-2 py-1 ${
            page === el
              ? `bg-blue-400 text-white`
              : `bg-[#f9f9f9] text-[#2c3e50]`
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;
