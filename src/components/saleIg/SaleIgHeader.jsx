import React from "react";

const SaleIgHeader = ({ projectCode, status }) => {
  return (
    <div className="font-roboto font-semibold text-gray-600">
      <span>İleri Girişimcilik Projesi:</span>
      <span className="ml-4 text-purple-700">{projectCode}</span>
      <span className="ml-4 text-blue-700">{status}</span>
    </div>
  );
};

export default SaleIgHeader;
