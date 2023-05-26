import React, { useEffect, useState } from "react";
import { usePermission } from "../../../hooks/setting/usePermission";
import { useRole } from "../../../hooks/role/useRole";
import { useMenuItems } from "../../../hooks/menu/useMenuItems";
import Loader from "../../../components/loader/Loader";
import Accordion from "../../../components/accordion/Accordion";
import { MultiSelect } from "@mantine/core";

export default function Permission() {
  const { getPermissions, isLoading } = usePermission();
  const { getRoles } = useRole();
  const { getMenuItems } = useMenuItems();
  const [roles, setRoles] = useState([]);
  const dataRoles = [];
  const [values, setValues] = useState([]);
  const dataValues = [];
  const [menus, setMenus] = useState([]);
  const dataMenus = [];

  useEffect(() => {
    getPermissionList();
  }, []);

  async function getPermissionList() {
    const responseRole = await getRoles();
    responseRole.map((role, index) => {
      let tempItem = { value: "", label: "" };
      tempItem.value = role.name;
      tempItem.label = role.name;
      dataRoles.push(tempItem);
    });
    setRoles(dataRoles);

    const responseMenu = await getMenuItems();
    responseMenu.map((menu, index) => {
      let tempItem = { title: "", permissions: [] };
      tempItem.title = menu.title;
      menu.canView.map((item, idx) => {
        tempItem.permissions.push(item);
      });
      dataMenus.push(tempItem);
    });
    setMenus(dataMenus);

    // const responseMenu = await getMenuItems();
    // responseMenu[0].canView.map((item, index) => {
    //   dataValues.push(item);
    // });
    // setValues(dataValues);
  }

  const onChangeHandler = (e) => {
    console.log(e);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="mb-2 justify-between">
        <div className="mt-2 items-center justify-center">
          <div className="font-roboto font-semibold text-gray-600">
            Menü Yetkileri:{" "}
          </div>
          {menus.map((menu, index) => {
            return (
              <MultiSelect
                value={menu.permissions}
                data={roles}
                onChange={onChangeHandler}
                label={menu.title}
                placeholder="Pick all that you like"
              />
            );
          })}

          {/* {list.map((item, index) => {
            return (
              <Accordion key={index} data={item} setRefresh={setRefresh} />
            );
          })} */}
        </div>
      </div>
    </>
  );
}
