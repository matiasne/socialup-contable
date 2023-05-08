import { IMaskInput } from "react-imask";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { numberPhone } from "./numberPhone";
import { IClient } from "../../models/client";
import { type } from "os";
import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { ClientServices } from "../../services/clientServices";
import NavBarMenu from "../../../../shared/Components/NavBar/NavBarMenu";
import { useParams } from "react-router-dom";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const PhoneNumber = React.forwardRef<JSX.Element | null, numberPhone>(
  function PhoneNumber(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="+00 0 (0000) 000-000"
        definitions={{
          "": /[1-9]/,
        }}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);
interface State {
  textmask: string;
}

export function FormClient() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IClient>();

  const { id } = useParams();
  console.log(id);
  const { loading, error, data } = useQuery(
    ClientServices.QueryClientService.OBTENER_CLIENTE,
    {
      variables: { findOneClientId: id },
    }
  );

  if (data) {
    console.log(data);
    setValue("name", data.findOneClient.name);
    setValue("surname", data.findOneClient.surname);
    setValue("phone", data.findOneClient.phone);
    setValue("email", data.findOneClient.email);
    setValue("address", data.findOneClient.address);
    setValue("city", data.findOneClient.city);
    setValue("postCode", data.findOneClient.postCode);
    setValue("documentNumber", data.findOneClient.documentNumber);
    setValue("documentType", data.findOneClient.documentType);
  }

  console.log(error);
  console.log(loading);
  const formRef = useRef<HTMLFormElement>(null);

  const [mutateFunction] = useMutation(
    ClientServices.ClientMutationServices.createClient
  );
  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values));
    mutateFunction({
      variables: {
        name: values.name,
        surname: values.surname,
        email: values.email,
        business: "643d97dc359d19fa42bb5b73",
        documentNumber: values.documentNumber,
        documentType: values.documentType,
        postcode: values.postCode,
        address: values.address,
        phone: values.phone,
      },
    });
  });
  const [documentType, setDocumentType] = useState<number>(0);

  function handleInputChange(event: SelectChangeEvent<number>) {
    setDocumentType(Number(event.target.value));
  }

  return id ? (
    <>
      <Box
        component="form"
        sx={{ display: "flex", flexWrap: "wrap", mt: "5%", p: "3%" }}
        onSubmit={onSubmit}
      >
        <Card sx={{ pb: 1 }}>
          <div>
            <NavBarMenu></NavBarMenu>
            <Box>
              <h2>Formulario Cliente</h2>
            </Box>
            <Box>
              <TextField
                label="Name"
                value={getValues().name}
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
                {...(errors.name?.type === "minLength" && {
                  helperText: "El nombre es demasiado corto",
                  error: true,
                })}
              />
            </Box>
            <Box>
              <TextField
                label="Surname"
                sx={{ m: 1, width: "25ch" }}
                type="text"
                {...register("surname", {
                  required: true,
                  minLength: 2,
                })}
                {...(errors.surname?.type === "required" && {
                  helperText: "Campo Obligatorio",
                  error: true,
                })}
                {...(errors.surname?.type === "minLength" && {
                  helperText: "El nombre es demasiado corto",
                  error: true,
                })}
              />
            </Box>
            <Box>
              <TextField
                label="Business"
                sx={{ m: 1, width: "25ch" }}
                type="text"
                {...register("idBusinnes", {
                  required: true,
                  minLength: 2,
                })}
                {...(errors.idBusinnes?.type === "required" && {
                  helperText: "Campo Obligatorio",
                  error: true,
                })}
                {...(errors.idBusinnes?.type === "minLength" && {
                  helperText: "El nombre es demasiado corto",
                  error: true,
                })}
              />
            </Box>
            <Box>
              <Box sx={{ minWidth: 1 }}>
                <FormControl fullWidth>
                  <InputLabel>Document Type</InputLabel>
                  <Select
                    sx={{ m: 1, width: "25ch" }}
                    value={documentType}
                    label="documentType"
                    onChange={handleInputChange}
                  >
                    <MenuItem value={1}>CUIT</MenuItem>
                    <MenuItem value={2}>CUIL</MenuItem>
                    <MenuItem value={3}>DNI</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box>
              <TextField
                label="N°"
                sx={{ m: 1, width: "25ch" }}
                type="text"
                {...register("documentNumber", {
                  required: true,
                  minLength: 2,
                })}
                {...(errors.documentNumber?.type === "required" && {
                  helperText: "Campo Obligatorio",
                  error: true,
                })}
                {...(errors.documentNumber?.type === "minLength" && {
                  helperText: "El nombre es demasiado corto",
                  error: true,
                })}
              />
            </Box>
            <Box>
              <TextField
                label="Address"
                sx={{ m: 1, width: "25ch" }}
                type="text"
                {...register("address", {
                  required: true,
                  minLength: 2,
                })}
                {...(errors.address?.type === "required" && {
                  helperText: "Campo Obligatorio",
                  error: true,
                })}
                {...(errors.address?.type === "minLength" && {
                  helperText: "El nombre es demasiado corto",
                  error: true,
                })}
              />
            </Box>
            <Box>
              <TextField
                label="Email"
                sx={{ m: 1, width: "25ch" }}
                type="email"
                {...register("email", {
                  required: true,
                  minLength: 2,
                })}
                {...(errors.email?.type === "required" && {
                  helperText: "Campo Obligatorio",
                  error: true,
                })}
                {...(errors.email?.type === "minLength" && {
                  helperText: "El nombre es demasiado corto",
                  error: true,
                })}
              />
            </Box>
            <Box>
              <FormControl variant="standard">
                <TextField
                  /*{...register("phone")}  {
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
                  })}*/
                  label="Telefono"
                  name="textmask"
                  id="formatted-text-mask-input"
                  InputProps={{
                    inputComponent: PhoneNumber as any,
                  }}
                />
              </FormControl>
            </Box>
            <Box>
              <TextField
                label="City"
                sx={{ m: 1, width: "25ch" }}
                type="text"
                {...register("city", {
                  required: true,
                  minLength: 2,
                })}
                {...(errors.city?.type === "required" && {
                  helperText: "Campo Obligatorio",
                  error: true,
                })}
                {...(errors.city?.type === "minLength" && {
                  helperText: "El nombre es demasiado corto",
                  error: true,
                })}
              />
            </Box>
            <Box>
              <TextField
                label="Post Code"
                sx={{ m: 1, width: "25ch" }}
                type="text"
                {...register("postCode", {
                  required: true,
                  minLength: 2,
                })}
                {...(errors.postCode?.type === "required" && {
                  helperText: "Campo Obligatorio",
                  error: true,
                })}
                {...(errors.postCode?.type === "minLength" && {
                  helperText: "El nombre es demasiado corto",
                  error: true,
                })}
              />
            </Box>
            <Box
              component="form"
              ref={formRef} /*onSubmit={handleSubmit(type)}*/
            >
              <Button type="submit" onClick={onSubmit} variant="contained">
                Register
              </Button>
            </Box>
          </div>
        </Card>
      </Box>
    </>
  ) : (
    <>
      <Box
        component="form"
        sx={{ display: "flex", flexWrap: "wrap", mt: "5%", p: "3%" }}
        onSubmit={onSubmit}
      >
        <Card sx={{ pb: 1 }}>
          <div>
            <NavBarMenu></NavBarMenu>
            <Box>
              <h2>Formulario Cliente</h2>
            </Box>
            <Box>
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
                {...(errors.name?.type === "minLength" && {
                  helperText: "El nombre es demasiado corto",
                  error: true,
                })}
              />
            </Box>
            <Box>
              <TextField
                label="Surname"
                sx={{ m: 1, width: "25ch" }}
                type="text"
                {...register("surname", {
                  required: true,
                  minLength: 2,
                })}
                {...(errors.surname?.type === "required" && {
                  helperText: "Campo Obligatorio",
                  error: true,
                })}
                {...(errors.surname?.type === "minLength" && {
                  helperText: "El nombre es demasiado corto",
                  error: true,
                })}
              />
            </Box>
            <Box>
              <TextField
                label="Business"
                sx={{ m: 1, width: "25ch" }}
                type="text"
                {...register("idBusinnes", {
                  required: true,
                  minLength: 2,
                })}
                {...(errors.idBusinnes?.type === "required" && {
                  helperText: "Campo Obligatorio",
                  error: true,
                })}
                {...(errors.idBusinnes?.type === "minLength" && {
                  helperText: "El nombre es demasiado corto",
                  error: true,
                })}
              />
            </Box>
            <Box>
              <Box sx={{ minWidth: 1 }}>
                <FormControl fullWidth>
                  <InputLabel>Document Type</InputLabel>
                  <Select
                    sx={{ m: 1, width: "25ch" }}
                    value={documentType}
                    label="documentType"
                    onChange={handleInputChange}
                  >
                    <MenuItem value={1}>CUIT</MenuItem>
                    <MenuItem value={2}>CUIL</MenuItem>
                    <MenuItem value={3}>DNI</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box>
              <TextField
                label="N°"
                sx={{ m: 1, width: "25ch" }}
                type="text"
                {...register("documentNumber", {
                  required: true,
                  minLength: 2,
                })}
                {...(errors.documentNumber?.type === "required" && {
                  helperText: "Campo Obligatorio",
                  error: true,
                })}
                {...(errors.documentNumber?.type === "minLength" && {
                  helperText: "El nombre es demasiado corto",
                  error: true,
                })}
              />
            </Box>
            <Box>
              <TextField
                label="Address"
                sx={{ m: 1, width: "25ch" }}
                type="text"
                {...register("address", {
                  required: true,
                  minLength: 2,
                })}
                {...(errors.address?.type === "required" && {
                  helperText: "Campo Obligatorio",
                  error: true,
                })}
                {...(errors.address?.type === "minLength" && {
                  helperText: "El nombre es demasiado corto",
                  error: true,
                })}
              />
            </Box>
            <Box>
              <TextField
                label="Email"
                sx={{ m: 1, width: "25ch" }}
                type="email"
                {...register("email", {
                  required: true,
                  minLength: 2,
                })}
                {...(errors.email?.type === "required" && {
                  helperText: "Campo Obligatorio",
                  error: true,
                })}
                {...(errors.email?.type === "minLength" && {
                  helperText: "El nombre es demasiado corto",
                  error: true,
                })}
              />
            </Box>
            <Box>
              <FormControl variant="standard">
                <TextField
                  /*{...register("phone")}  {
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
                })}*/
                  label="Telefono"
                  name="textmask"
                  id="formatted-text-mask-input"
                  InputProps={{
                    inputComponent: PhoneNumber as any,
                  }}
                />
              </FormControl>
            </Box>
            <Box>
              <TextField
                label="City"
                sx={{ m: 1, width: "25ch" }}
                type="text"
                {...register("city", {
                  required: true,
                  minLength: 2,
                })}
                {...(errors.city?.type === "required" && {
                  helperText: "Campo Obligatorio",
                  error: true,
                })}
                {...(errors.city?.type === "minLength" && {
                  helperText: "El nombre es demasiado corto",
                  error: true,
                })}
              />
            </Box>
            <Box>
              <TextField
                label="Post Code"
                sx={{ m: 1, width: "25ch" }}
                type="text"
                {...register("postCode", {
                  required: true,
                  minLength: 2,
                })}
                {...(errors.postCode?.type === "required" && {
                  helperText: "Campo Obligatorio",
                  error: true,
                })}
                {...(errors.postCode?.type === "minLength" && {
                  helperText: "El nombre es demasiado corto",
                  error: true,
                })}
              />
            </Box>
            <Box
              component="form"
              ref={formRef} /*onSubmit={handleSubmit(type)}*/
            >
              <Button type="submit" onClick={onSubmit} variant="contained">
                Register
              </Button>
            </Box>
          </div>
        </Card>
      </Box>
    </>
  );
}
export default FormClient;
