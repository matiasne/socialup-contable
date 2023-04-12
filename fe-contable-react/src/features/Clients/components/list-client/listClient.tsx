import React from "react";
import { ListItems } from "../../../../shared/Components/list-item/list-item";
import { IClient, IiClient } from "../../models/client";
import ItemClient from "../item-client/itemClient";

const clients: IiClient[] = [
  {
    name: "Nombre",
    surname: "Apellido",
    phone: "Telelfono",
    image: "img",
    email: "Mail",
  },
  {
    name: "Nombre",
    surname: "Apellido",
    phone: "Telelfono",
    image: "img",
    email: "Mail",
  },
  {
    name: "Nombre",
    surname: "Apellido",
    phone: "Telelfono",
    image: "img",
    email: "Mail",
  },
  {
    name: "Nombre",
    surname: "Apellido",
    phone: "Telelfono",
    image: "img",
    email: "Mail",
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
