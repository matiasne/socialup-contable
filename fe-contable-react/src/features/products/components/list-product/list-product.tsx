import React from "react";
import { ListItems } from "../../../../shared/Components/list-item/list-item";
import { IProduct } from "../../models/product.interface";
import ItemProduct from "../item-product/itemProduct";

const productos: IProduct[] = [
  {
    name: "Producto 1",
    description: "Descripción del producto 1",
    salePrice: 20,
  },
  {
    name: "Producto 2",
    description: "Descripción del producto 2",
    salePrice: 20,
  },
  {
    name: "Producto 3",
    description: "Descripción del producto 3",
    salePrice: 30,
  },
];

export const ListProduct = () => {
  return (
    <div>
      <ListItems items={productos} renderItem={ItemProduct}></ListItems>
    </div>
  );
};
