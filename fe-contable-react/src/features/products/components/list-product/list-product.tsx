import { useQuery } from "@apollo/client";
import { ListItems } from "../../../../shared/Components/list-item/list-item";
import { IProduct } from "../../models/product.interface";
import ItemProduct from "../item-product/itemProduct";
import { ProductService } from "../../productsService/productsService";

export const ListProduct = () => {
  const action = (item: IProduct) => {};
  const { error, data, loading } = useQuery(
    ProductService.ProductsQueryService.products
  );

  return (
    <>
      {!loading && data && data.findProduct ? (
        <div>
          <ListItems
            items={data.findProduct ? data.findProduct : []}
            renderItem={ItemProduct}
            handleItemClick={(item: IProduct) => {
              action(item);
            }}
          ></ListItems>
        </div>
      ) : (
        <div>spinner</div>
      )}
    </>
  );
};
