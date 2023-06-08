import React, { useEffect, useState } from "react";
import { MultiSelect } from "@mantine/core";
import { useRole } from "../../hooks/role/useRole";
import { usePermission } from "../../hooks/setting/usePermission";

const PermissionMenu = (props) => {
  const { getRoles } = useRole();
  const { updateViewPermission } = usePermission();
  const [menu, setMenu] = useState(props.data);
  const [roleList, setRoleList] = useState([]);
  const dataRoles = [];
  const [givenRoles, setGivenRoles] = useState([]);

  async function getRolesList() {
    const responseRole = await getRoles();
    responseRole.map((role, index) => {
      let tempItem = { value: "", label: "" };
      tempItem.value = role.name;
      tempItem.label = role.name;
      dataRoles.push(tempItem);
    });
    setRoleList(dataRoles);
    setGivenRoles(menu.canView);
  }

  useEffect(() => {
    getRolesList();
  }, []);

  const handleGivenRoleChange = async (values) => {
    await updateViewPermission(menu._id, values);
  };

  return (
    <MultiSelect
      data={roleList}
      label={menu.title}
      placeholder="Görüntülemesini istediğiniz rolü seçiniz"
      value={givenRoles}
      onChange={(values) => {
        setGivenRoles(values);
        handleGivenRoleChange(values);
      }}
    />
  );
};

export default PermissionMenu;
