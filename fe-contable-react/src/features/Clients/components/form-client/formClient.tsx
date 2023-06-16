import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRef, useState } from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { IClient } from "../../models/client";
import { Card, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useMutation } from "@apollo/client";
import { ClientServices } from "../../services/clientServices";
import ProfileForm from "../../../../shared/Components/avatarNuevo";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export default function FormClient() {
  const [selectedDocumentType, setSelectedDocumentType] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IClient>();
  const [mutateFunction, { loading, error, data }] = useMutation(
    ClientServices.ClientMutationServices.createClient
  );
  const onSubmit = handleSubmit((values) => {
    console.log(values);
    alert(JSON.stringify(values));
    mutateFunction({
      variables: {
        name: values.name,
        surname: values.surname,
        email: values.email,
        business: values.idBusinnes,
        documentNumber: values.documentNumber,
        documentType: selectedDocumentType,
        postcode: values.postCode,
        address: values.address,
        phone: values.phone,
        image: values.image,
      },
    });
  });
  console.log(data);

  const handleInputChange = (event: any) => {
    setSelectedDocumentType(event.target.value);
  };

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
            avatarType="client"
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
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.name?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <TextField
            label="Surname"
            sx={{ m: 1, width: "25ch" }}
            type="text"
            {...register("surname", {
              required: true,
              minLength: 2,
            })}
            {...(errors.surname?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.surname?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <TextField
            label="Business"
            sx={{ m: 1, width: "25ch" }}
            type="text"
            {...register("idBusinnes", {
              required: true,
              minLength: 2,
            })}
            {...(errors.idBusinnes?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.idBusinnes?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <FormControl {...register("documentType")}>
            <InputLabel>Document Type</InputLabel>
            <Select
              type="text"
              label="documentType"
              sx={{ m: 1, width: "37.4ch" }}
              value={selectedDocumentType}
              onChange={handleInputChange}
            >
              <MenuItem value="cuit">CUIT</MenuItem>
              <MenuItem value="cuil">CUIL</MenuItem>
              <MenuItem value="dni">DNI</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="N°"
            sx={{ m: 1, width: "25ch" }}
            type="text"
            {...register("documentNumber", {
              required: true,
              minLength: 2,
            })}
            {...(errors.documentNumber?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.documentNumber?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <TextField
            label="Address"
            sx={{ m: 1, width: "25ch" }}
            type="text"
            {...register("address", {
              required: true,
              minLength: 2,
            })}
            {...(errors.address?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.address?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <TextField
            label="Email"
            sx={{ m: 1, width: "25ch" }}
            type="email"
            {...register("email", {
              required: true,
              minLength: 2,
            })}
            {...(errors.email?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.email?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <TextField
            label="Phone"
            sx={{ m: 1, width: "25ch" }}
            type="phone"
            {...register("phone", {
              required: true,
              minLength: 9,
            })}
            {...(errors.phone?.type === "required" && {
              helperText: "Campo Obligatorio",
              error: true,
            })}
            {...(errors.phone?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <TextField
            label="City"
            sx={{ m: 1, width: "25ch" }}
            type="text"
            {...register("city", {
              required: true,
              minLength: 2,
            })}
            {...(errors.city?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.city?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <TextField
            label="Post Code"
            sx={{ m: 1, width: "25ch" }}
            type="text"
            {...register("postCode", {
              required: true,
              minLength: 2,
            })}
            {...(errors.postCode?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.postCode?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <Box component="form" ref={formRef} /*onSubmit={handleSubmit(type)}*/>
            <Button
              sx={{ m: 1, width: "43ch" }}
              type="submit"
              onClick={onSubmit}
              variant="contained"
            >
              Register
            </Button>
          </Box>
        </FormControl>
      </Card>
    </Box>
  );
}
