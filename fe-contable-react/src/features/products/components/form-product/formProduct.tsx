import { useMutation } from "@apollo/client";
import { Box, Button, Card, FormControl, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { ProductService } from "../../productsService/productsService";
import { IProduct } from "../../models/product";
import ItemProduct from "../item-product/itemProduct";
import { Refresh } from "@mui/icons-material";
import ProfileForm from "../../../../shared/Components/avatarNuevo";

export const FormProductComponent = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IProduct>();
  const [mutateFunction] = useMutation(
    ProductService.ProductMutationServices.AddProduct
  );

  const onSubmit = handleSubmit((values: any) => {
    console.log(values);
    mutateFunction({
      variables: {
        business: "6439a6a77d50af9ec31665d6",
        name: values.Name,
        description: values.Description,
        code: values.Code,
        costPrice: values.CostPrice,
        salePrice: values.SalePrice,
        image: values.Image,
      },
    });
  });

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
      onSubmit={onSubmit}
    >
      <Card sx={{ pb: 1 }}>
        <FormControl>
          <ProfileForm
            avatarType="product"
            onChange={function (data: any): void {
              setValue("Image", data);
            }}
            defaultImage={""}
          />
          <TextField
            label="Name"
            sx={{ m: 1, width: "25ch" }}
            type="text"
            {...register("Name", {
              required: true,
              minLength: 2,
            })}
            {...(errors.Name?.type === "required" && {
              helperText: "Campo Obligatorio",
              error: true,
            })}
          />
          <TextField
            label="Description"
            sx={{ m: 1, width: "25ch" }}
            type="text"
            {...register("Description", {
              required: true,
              minLength: 2,
            })}
            {...(errors.Description?.type === "required" && {
              helperText: "Campo Obligatorio",
              error: true,
            })}
          />
          <TextField
            label="Code"
            sx={{ m: 1, width: "25ch" }}
            type="text"
            {...register("Code", {
              required: true,
              minLength: 2,
            })}
            {...(errors.Code?.type === "required" && {
              helperText: "Campo Obligatorio",
              error: true,
            })}
          />
          <TextField
            label="CostPrice"
            sx={{ m: 1, width: "25ch" }}
            type="price"
            {...register("CostPrice", {
              required: true,
              minLength: 1,
            })}
            {...(errors.CostPrice?.type === "required" && {
              helperText: "Campo Obligatorio",
              error: true,
            })}
          />
          <TextField
            label="SalePrice"
            sx={{ m: 1, width: "25ch" }}
            type="price"
            {...register("SalePrice", {
              required: true,
              minLength: 1,
            })}
            {...(errors.SalePrice?.type === "required" && {
              helperText: "Campo Obligatorio",
              error: true,
            })}
          />
          <Button
            sx={{ m: 1, width: "43ch" }}
            onClick={onSubmit}
            variant="contained"
          >
            Submit
          </Button>
        </FormControl>
      </Card>
    </Box>
  );
};
export default FormProductComponent;
