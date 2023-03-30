import { IMaskInput } from "react-imask";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { numberPhone } from "./numberPhone";
import NavBarMenu from "../../../../shared/NavBar/NavBarMenu";
import { IClient } from "../../model/client";
import { type } from "os";
import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

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
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = React.useState<State>({
    textmask: "",
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IClient>();
  const onSubmit = handleSubmit((values) => {
    formRef.current?.reset();
    alert(JSON.stringify(values));
  });
  const [documentType, setDocumentType] = useState<number>(0);

  function handleInputChange(event: SelectChangeEvent<number>) {
    setDocumentType(Number(event.target.value));
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
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
                  helperText: "El nombre es demaciado corto",
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
                  helperText: "El nombre es demaciado corto",
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
                  helperText: "El nombre es demaciado corto",
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
                  helperText: "El nombre es demaciado corto",
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
                  helperText: "El nombre es demaciado corto",
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
                  helperText: "El nombre es demaciado corto",
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
                    helperText: "El nombre es demaciado corto",
                    error: true,
                  })}*/
                  label="Telefono"
                  value={values.textmask}
                  onChange={handleChange}
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
                  helperText: "El nombre es demaciado corto",
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
                  helperText: "El nombre es demaciado corto",
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
