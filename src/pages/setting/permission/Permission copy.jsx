import React, { useEffect, useState } from "react";
import { usePermission } from "../../../hooks/setting/usePermission";
import Loader from "../../../components/loader/Loader";
import Accordion from "../../../components/accordion/Accordion";

export default function Permission() {
  const { getPermissions, isLoading } = usePermission();
  const [list, setList] = useState([]);
  const [refresh, setRefresh] = useState("");
  useEffect(() => {
    setList([]);
    getPermissionList();
  }, [refresh]);

  async function getPermissionList() {
    const response = await getPermissions();
    setList(response);
  }
  return (
    <>
      {isLoading && <Loader />}
      <div className="mb-2 justify-between">
        <div className="mt-2 items-center justify-center">
          <div className="font-roboto font-semibold text-gray-600">
            Menü Yetkileri:{" "}
          </div>
          {list.map((item, index) => {
            return (
              <Accordion key={index} data={item} setRefresh={setRefresh} />
            );
          })}
        </div>
      </div>
    </>
  );
}
