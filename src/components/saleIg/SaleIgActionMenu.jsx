import React from "react";
import { Menu, Button } from "@mantine/core";

const SaleIgActionMenu = ({ openNewNote, setNewNote, openNewAssignee }) => {
  return (
    <Menu shadow="md" width={200}>
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
        <Menu.Divider />
        <Menu.Item color="red">Süreci İptal Et</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default SaleIgActionMenu;
