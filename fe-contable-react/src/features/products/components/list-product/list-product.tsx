import { useMutation, useQuery } from "@apollo/client";
import { ListItems } from "../../../../shared/Components/list-item/list-item";
import { IProduct } from "../../models/product.interface";
import ItemProduct from "../item-product/itemProduct";
import { ProductService } from "../../productsService/productsService";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { ListItemsGrid } from "../../../../shared/Components/listItemGrid/listItemGrid";

export const ListProduct = (props: IProduct) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { data, error, loading, refetch } = useQuery(
    ProductService.ProductsQueryService.products
  );
  const [MutateFuncion] = useMutation(
    ProductService.ProductMutationServices.DeleteProducts
  );

  const handleItemDelete = async (item: any) => {
    await MutateFuncion({ variables: { id: item } });
  };

  return (
    <>
      {!loading && data && data.findProduct ? (
        <ListItemsGrid
          items={data.findProduct}
          renderItem={(item: IProduct) => <ItemProduct {...item} />}
          handleItemClick={function (item: any): void {
            console.log(item);
            handleItemDelete(item.id);
          }}
        ></ListItemsGrid>
      ) : (
        <div>spinner</div>
      )}
    </>
  );
};
export default ListProduct;
