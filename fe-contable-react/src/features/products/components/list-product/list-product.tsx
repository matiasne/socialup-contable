import { useMutation, useQuery } from "@apollo/client";
import { ListItems } from "../../../../shared/Components/list-item/list-item";
import { IProduct } from "../../models/product.interface";
import ItemProduct from "../item-product/itemProduct";
import { ProductService } from "../../productsService/productsService";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { ListItemsGrid } from "../../../../shared/Components/listItemGrid/listItemGrid";

export const ListProduct = (props: IProduct) => {
  const { data, error, loading, refetch } = useQuery(
    ProductService.ProductsQueryService.products
  );

  return (
    <>
      {!loading && data && data.findUserBusiness ? (
        <ListItemsGrid
          items={data.findUserBusiness[0].products}
          renderItem={(item: IProduct) => <ItemProduct products={item} />}
          handleItemClick={function (item: any): void {
            console.log(item);
            //  handleItemDelete(item.id);
          }}
        ></ListItemsGrid>
      ) : (
        <div>spinner</div>
      )}
    </>
  );
};
export default ListProduct;
