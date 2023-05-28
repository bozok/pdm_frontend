import React from "react";
import { Menu, Button } from "@mantine/core";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useSale } from "../../hooks/sale/useSale";
import { Link, useParams } from "react-router-dom";

const SaleIgActionMenu = ({
  openNewNote,
  setNewNote,
  openNewAssignee,
  status,
  getSaleInfo,
}) => {
  const param = useParams();
  const { user } = useAuthContext();
  const { approveSale } = useSale();
  const handleApproveSale = async (e) => {
    e.preventDefault();
    let response = await approveSale(param.id);
    if (response) {
      getSaleInfo();
    }
  };
  return (
    <Menu shadow="md" width={200} classNames="m-0">
      <Menu.Target>
        <Button variant="light" color="orange">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Bilgi Güncelle</Menu.Label>
        <Menu.Item
          onClick={() => {
            openNewNote();
            setNewNote("");
          }}
        >
          Not Ekle
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            openNewAssignee();
          }}
        >
          Atananı Değiştir
        </Menu.Item>
        <Menu.Item disabled>Tutarı Değiştir</Menu.Item>
        {status === "Proje Kontrol Bekliyor" &&
          (user.role === "sysgod" || user.role === "Admin") && (
            <Menu.Item
              color="green"
              onClick={handleApproveSale}
              className="font-semibold"
            >
              Projeyi Onayla
            </Menu.Item>
          )}

        <Menu.Divider />
        <Menu.Item color="red">Süreci İptal Et</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default SaleIgActionMenu;
