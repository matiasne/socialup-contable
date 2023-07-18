import { useMutation, useQuery } from "@apollo/client";
import { ListItems } from "../../../../shared/Components/list-item/list-item";
import { IProduct } from "../../models/product.interface";
import ItemProduct from "../item-product/itemProduct";
import { ProductService } from "../../productsService/productsService";
import { useState, useEffect } from "react";
import { SearchBar } from "../../../../shared/Components/search-bar/search-bar";

export const ListProduct = (props: IProduct) => {
  const [inputValue, setInputValue] = useState("");
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
          <SearchBar
            placeholder={"Buscar Productos"}
            onChange={(data: string) => {
              console.log(data);
              return data;
            }}
          />
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
