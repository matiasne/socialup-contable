import React from "react";
import { ListItems } from "../../../../shared/Components/list-item/list-item";
import { IClient } from "../../models/client";
import ItemClient from "../ItemClient/itemClient";

const clients: IClient[] = [
  {
    name: "Nombre",
    surname: "Apellido",
    phone: "Telelfono",
    image: "img",
    email: "Mail",
    idBusinnes: "643d97dc359d19fa42bb5b73",
  },
  {
    name: "Nombre",
    surname: "Apellido",
    phone: "Telelfono",
    image: "img",
    email: "Mail",
    idBusinnes: "",
  },
  {
    name: "Nombre",
    surname: "Apellido",
    phone: "Telelfono",
    image: "img",
    email: "Mail",
    idBusinnes: "",
  },
  {
    name: "Nombre",
    surname: "Apellido",
    phone: "Telelfono",
    image: "img",
    email: "Mail",
    idBusinnes: "",
  },
];

export const ListClient = () => {
  const action = (item: IClient) => {
    console.log(item);
  };

  return (
    <div>
      <ListItems
        items={clients}
        renderItem={ItemClient}
        handleItemClick={(item: IClient) => {
          action(item);
        }}
      ></ListItems>
    </div>
  );
};
