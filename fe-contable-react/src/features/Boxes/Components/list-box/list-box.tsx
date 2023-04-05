import { ListItems } from "../../../../shared/Components/list-item/list-item";
import { IBox, IitemBox } from "../../models/box";
import ItemBox from "../item-box/item-box";

const caja: IitemBox[] = [
  {
    Name: "Producto 1",
    ActualAmount: 1,
  },
  {
    Name: "Producto 2",
    ActualAmount: 2,
  },
  {
    Name: "Producto 3",
    ActualAmount: 3,
  },
];

export const ListBox = () => {
  const action = (item: IBox) => {
    console.log(item);
  };

  return (
    <div>
      <ListItems
        items={caja}
        renderItem={ItemBox}
        handleItemClick={(item: IBox) => {
          action(item);
        }}
      ></ListItems>
    </div>
  );
};
