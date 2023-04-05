import { ListItems } from "../../../shared/Components/list-item/list-item";
import ItemSale from "../item-sale/item-sale";
import { ISale, IitemSale } from "../models/sale";

const ventas: IitemSale[] = [
  {
    client: "Cliente 1",
    item: "Cantidad de productos",
    total: "Total de la compra",
    payments: "Forma de pago",
  },
  {
    client: "Cliente 2",
    item: "Cantidad de productos",
    total: "Total de la compra",
    payments: "Forma de pago",
  },
  {
    client: "Cliente 3",
    item: "Cantidad de productos",
    total: "Total de la compra",
    payments: "Forma de pago",
  },
];

export const ListSales = () => {
  const action = (item: ISale) => {
    console.log(item);
  };

  return (
    <div>
      <ListItems
        items={ventas}
        renderItem={ItemSale}
        handleItemClick={(item: ISale) => {
          action(item);
        }}
      ></ListItems>
    </div>
  );
};
