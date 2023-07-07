import { useMutation } from "@apollo/client";
import { Box, Button, Card, FormControl, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { ProductService } from "../../productsService/productsService";
import ProfileForm from "../../../../shared/Components/avatarNuevo";
import { useToast } from "../../../../shared/Components/toast/ToastProvider";
import { useEffect, useState } from "react";
import { IProduct } from "../../models/product.interface";
import { getSessionServices } from "../../../../auth/services/session.service";

type Props = {
  products: IProduct | undefined;
  onEdit: () => void;
  onAdd: () => void;
};

export default function FormProductComponent(props: Props) {
  const [idBusiness, setIdBusiness] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IProduct>();
  useEffect(() => {
    if (props && props.products) {
      setIsEditing(true);
      setValue("name", props.products.name);
      setValue("description", props.products.description);
      setValue("code", props.products.code);
      setValue("costPrice", props.products.costPrice);
      setValue("salePrice", props.products.salePrice);
      setValue("image", props.products.image);
    }
  }, [props.products]);
  const [mutateFunction] = useMutation(
    props.products?.id
      ? ProductService.ProductMutationServices.UpdateProduct
      : ProductService.ProductMutationServices.AddProduct
  );
  const { toastShow } = useToast();

  useEffect(() => {
    // getSessionBusiness();
    setIdBusiness(getSessionServices("business"));
  }, []);
  const onSubmit = handleSubmit(async (values: any) => {
    console.log(props.products?.id);
    try {
      if (props.products?.id) {
        await handleEditSubmit(values);
      } else {
        await handleAddSubmit(values);
      }
      toastShow({
        message: isEditing
          ? "El producto se edito correctamente"
          : "El producto se cargó correctamente",
        severity: "success",
        duration: 5000,
      });
    } catch (error) {
      toastShow({
        message: "Error al realizar la operación",
        severity: "error",
        duration: 5000,
      });
    }
  });

  const handleAddSubmit = handleSubmit(async (values: any) => {
    console.log(values);
    await mutateFunction({
      variables: {
        business: idBusiness,
        name: values.name,
        description: values.description,
        code: values.code,
        costPrice: values.costPrice,
        salePrice: values.salePrice,
        image: values.image,
      },
    });
    props.onAdd();
    reset();
  });
  const handleEditSubmit = handleSubmit(async (values: any) => {
    console.log(values);
    await mutateFunction({
      variables: {
        id: props.products?.id,
        business: idBusiness,
        name: values.name,
        description: values.description,
        code: values.code,
        costPrice: values.costPrice,
        salePrice: values.salePrice,
        image: values.image,
      },
    });
    props.onEdit();
    setIsEditing(false);
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
              setValue("image", data);
            }}
            defaultImage={""}
          />
          <TextField
            label="Name"
            sx={{ m: 1, width: "25ch" }}
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
          <TextField
            label="Description"
            sx={{ m: 1, width: "25ch" }}
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
          <TextField
            label="Code"
            sx={{ m: 1, width: "25ch" }}
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
          <TextField
            label="CostPrice"
            sx={{ m: 1, width: "25ch" }}
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
          <TextField
            label="SalePrice"
            sx={{ m: 1, width: "25ch" }}
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
}
