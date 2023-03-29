import { useMutation } from "@apollo/client";
import { Box, Button, Card, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
<<<<<<< HEAD:fe-contable-react/src/features/products/components/form-product/formProduct.tsx
import { UserServices } from "../../../../shared/services/userServices/userServices";
import { IProduct } from "../../models/product.interface";
=======
import { UserServices } from "../../../shared/services/userServices/userServices";
//import { IProduct } from "../models/product";
>>>>>>> su#19:fe-contable-react/src/features/products/components/formProduct.tsx
import style from "./styleFormProduct.module.css";

export const FormProductComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>();
  const [mutateFunction, { loading, error, data }] = useMutation(
    UserServices.UserMutationServices.register
  );
  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values));
    mutateFunction({
      variables: {
        name: values.name,
        description: values.description,
        code: values.code,
        costPrice: values.costPrice,
        salePrice: values.salePrice,
        image: values.image,
      },
    });
  });

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        mt: "5%",
        p: "3%",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "10vh",
      }}
      onSubmit={onSubmit}
    >
      <Card sx={{ pb: 1 }}>
        <div>
          <Box>
            <TextField
              label="Name"
              sx={{ m: 1, width: "35ch" }}
              type="text"
              {...register("name", {
                required: true,
                minLength: 2,
              })}
              {...(errors.name?.type === "required" && {
                helperText: "Campo Obligatorio",
                error: true,
              })}
            />
          </Box>
          <Box>
            <TextField
              label="Description"
              sx={{ m: 1, width: "35ch" }}
              type="text"
              {...register("description", {
                required: true,
                minLength: 2,
              })}
              {...(errors.description?.type === "required" && {
                helperText: "Campo Obligatorio",
                error: true,
              })}
            />
          </Box>
          <Box>
            <TextField
              label="Code"
              sx={{ m: 1, width: "35ch" }}
              type="text"
              {...register("code", {
                required: true,
                minLength: 2,
              })}
              {...(errors.code?.type === "required" && {
                helperText: "Campo Obligatorio",
                error: true,
              })}
            />
          </Box>
          <Box>
            <TextField
              label="CostPrice"
              sx={{ m: 1, width: "35ch" }}
              type="price"
              {...register("costPrice", {
                required: true,
                minLength: 1,
              })}
              {...(errors.costPrice?.type === "required" && {
                helperText: "Campo Obligatorio",
                error: true,
              })}
            />
          </Box>
          <Box>
            <TextField
              label="SalePrice"
              sx={{ m: 1, width: "35ch" }}
              type="price"
              {...register("salePrice", {
                required: true,
                minLength: 1,
              })}
              {...(errors.salePrice?.type === "required" && {
                helperText: "Campo Obligatorio",
                error: true,
              })}
            />
          </Box>
          <Box>
            <Button
              onClick={onSubmit}
              className={style.submit}
              variant="contained"
            >
              Submit
            </Button>
          </Box>
        </div>
      </Card>
    </Box>
  );
};
