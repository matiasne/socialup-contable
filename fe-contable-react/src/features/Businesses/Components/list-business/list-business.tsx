import React from "react";
import { ListItems } from "../../../../shared/Components/list-item/list-item";
import { IBusiness, IiBusiness } from "../../models/business";
import ItemBusiness from "../Item-business/item-business";

const business: IiBusiness[] = [
  {
    BusinessName: "nombre",
    Mail: "mail",
    Phone: "telefono",
    Address: "direccion",
  },
  {
    BusinessName: "nombre",
    Mail: "mail",
    Phone: "telefono",
    Address: "direccion",
  },
  {
    BusinessName: "nombre",
    Mail: "mail",
    Phone: "telefono",
    Address: "direccion",
  },
];

export const ListClient = () => {
  const action = (item: IBusiness) => {
    console.log(item);
  };

  return (
    <div>
      <ListItems
        items={business}
        renderItem={ItemBusiness}
        handleItemClick={(item: IBusiness) => {
          action(item);
        }}
      ></ListItems>
    </div>
  );
};
