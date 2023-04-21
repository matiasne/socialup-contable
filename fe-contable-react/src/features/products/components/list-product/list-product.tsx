import { useQuery } from "@apollo/client";
import { ListItems } from "../../../../shared/Components/list-item/list-item";
import { IProduct } from "../../models/product.interface";
import ItemProduct from "../item-product/itemProduct";
import { ProductService } from "../../productsService/productsService";

export const ListProduct = () => {
  // const [products, setProducts] = useState([]);
  const action = (item: IProduct) => {};
  const { error, data, loading } = useQuery(
    ProductService.ProductsQueryService.products
  );
  if (error) console.log(error);
  if (loading) console.log(loading);
  if (data) {
    if (data.findProduct) {
      return (
        <div>
          <ListItems
            items={data.findProduct}
            renderItem={ItemProduct}
            handleItemClick={(item: IProduct) => {
              action(item);
            }}
          ></ListItems>
        </div>
      );
    }
  }

  return <></>;
};
