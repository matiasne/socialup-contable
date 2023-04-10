import { useMutation } from "@apollo/client";
import { Box, Button, Card, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import NavBarMenu from "../../../shared/NavBar/NavBarMenu";
import { UserServices } from "../../../shared/services/userServices/userServices";
import { IProduct } from "../models/product";
import style from "./styleFormProduct.module.css";

export const FormProductComponent = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IProduct>();
  const [mutateFunction, { loading, error, data }] = useMutation(
    UserServices.UserMutationServices.register
  );
  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values));
    mutateFunction({
      variables: {
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
              {...register("Name", {
                required: true,
                minLength: 2,
              })}
              {...(errors.Name?.type === "required" && {
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
              {...register("Description", {
                required: true,
                minLength: 2,
              })}
              {...(errors.Description?.type === "required" && {
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
              {...register("Code", {
                required: true,
                minLength: 2,
              })}
              {...(errors.Code?.type === "required" && {
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
              {...register("CostPrice", {
                required: true,
                minLength: 1,
              })}
              {...(errors.CostPrice?.type === "required" && {
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
              {...register("SalePrice", {
                required: true,
                minLength: 1,
              })}
              {...(errors.SalePrice?.type === "required" && {
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
