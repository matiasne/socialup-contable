import { useMutation, useQuery } from "@apollo/client";
import { ListItems } from "../../../../shared/Components/list-item/list-item";
import { IProduct } from "../../models/product.interface";
import ItemProduct from "../item-product/itemProduct";
import { ProductService } from "../../productsService/productsService";
import { ReactNode, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { ListItemsGrid } from "../../../../shared/Components/listItemGrid/listItemGrid";
import FloatingAddForm from "../../../../shared/Components/floating-add/floating-add";
import FormProductComponent from "../form-product/formProduct";

type Props = {
  products: IProduct | undefined;
  onEdit: () => void;
  onAdd: () => void;
};

export const ListProduct = (products: Props) => {
  const { data, error, loading, refetch } = useQuery(
    ProductService.ProductsQueryService.products
  );
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    refetch();
    setModalOpen(false);
  };

  return (
    <>
      <Box>
        <FloatingAddForm
          form={
            <FormProductComponent
              products={undefined}
              onEdit={handleCloseModal}
              onAdd={handleCloseModal}
            />
          }
        ></FloatingAddForm>
      </Box>
      <>
        {!loading && data && data.findUserBusiness ? (
          (console.log(data.findUserBusiness),
          (
            <>
              <>
                <ListItemsGrid
                  items={data.findUserBusiness[0].products}
                  renderItem={(item: IProduct) => (
                    <ItemProduct products={item} />
                  )}
                  handleItemClick={function (item: any): void {
                    console.log(item);
                    //  handleItemDelete(item.id);
                  }}
                ></ListItemsGrid>
              </>
            </>
          ))
        ) : (
          <div>spinner</div>
        )}
      </>
    </>
  );
};
export default ListProduct;
