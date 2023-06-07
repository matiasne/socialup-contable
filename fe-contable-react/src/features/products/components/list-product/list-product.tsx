import { useMutation, useQuery } from "@apollo/client";
import { ListItems } from "../../../../shared/Components/list-item/list-item";
import { IProduct } from "../../models/product.interface";
import ItemProduct from "../item-product/itemProduct";
import { ProductService } from "../../productsService/productsService";
import { useEffect, useState } from "react";

export const ListProduct = () => {
  const { data, error, loading, refetch } = useQuery(
    ProductService.ProductsQueryService.products
  );
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [MutateFuncion] = useMutation(
    ProductService.ProductMutationServices.DeleteProducts
  );

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      setShouldRefetch(false);
    }
  }, [shouldRefetch, refetch]);

  const handleItemDelete = async (item: any) => {
    await MutateFuncion({ variables: { id: item } });
  };

  return (
    <>
      {!loading && data && data.findProduct ? (
        <div>
          <ListItems
            items={data.findProduct}
            renderItem={(item: IProduct) => <ItemProduct {...item} />}
            handleItemClick={function (item: any): void {
              console.log(item);
              handleItemDelete(item.id);
            }}
          ></ListItems>
        </div>
      ) : (
        <div>spinner</div>
      )}
    </>
  );
};
export default ListProduct;
