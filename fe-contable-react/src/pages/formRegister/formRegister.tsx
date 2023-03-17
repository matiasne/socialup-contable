import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
<<<<<<< HEAD
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import style from "./styleFormRegister.module.css";
import { Card } from "@mui/material";
import { IUser } from "../../models/user";
import { useMutation } from "@apollo/client";
import { UserServices } from "../../shared/services/userServices/userServices";

export const FormRegister = () => {
  const [formValue, setFormValue] = useState<IUser>({
    id: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    image: "",
    address: "",
    gender: "",
    phone: "",
=======
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";
import Button from "@mui/material/Button";
import style from "./styleFormRegister.module.css";
import { Card } from "@mui/material";
import NavBarMenu from "../../shared/NavBar/NavBarMenu";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface FormData {
  Name: string;
  Phone: string;
  HomeAddress: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
}

export const FormRegister = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values));
>>>>>>> SU-menudesplegable
  });

  const [showPassword, setShowPassword] = React.useState(false);

<<<<<<< HEAD
  const [mutateFunction, { loading, error, data }] = useMutation(
    UserServices.UserMutationServices.register
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (data) console.log(data);

  const handleInputChange = (event: any) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const submit = (event: any) => {
    event.preventDefault();
    mutateFunction({
      variables: { name: formValue.name, surname: formValue.surname, phone: formValue.phone, address: formValue.address,
          email: formValue.email, password: formValue.password },
    });
  };
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <Card sx={{ p: 1 }}>
        <div>
=======
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexWrap: "wrap", mt: "5%", p: "3%" }}
      onSubmit={onSubmit}
    >
      <Card sx={{ pb: 1 }}>
        <div>
          <NavBarMenu></NavBarMenu>
>>>>>>> SU-menudesplegable
          <Box>
            <TextField
              label="Name"
              sx={{ m: 1, width: "25ch" }}
              type="text"
<<<<<<< HEAD
              onChange={handleInputChange}
              name="name"
              value={formValue.name}
            />
          </Box>
          <Box>
            <TextField
              label="Surname"
              sx={{ m: 1, width: "25ch" }}
              type="text"
              onChange={handleInputChange}
              name="surname"
              value={formValue.surname}
=======
              {...register("Name", {
                required: true,
                minLength: 2,
              })}
              {...(errors.Name?.type === "required" && {
                helperText: "Campo Obligatorio",
                error: true,
              })}
              {...(errors.Name?.type === "minLength" && {
                helperText: "El nombre es demaciado corto",
                error: true,
              })}
>>>>>>> SU-menudesplegable
            />
          </Box>
          <Box>
            <TextField
              label="Phone"
              sx={{ m: 1, width: "25ch" }}
              type="tel"
<<<<<<< HEAD
              onChange={handleInputChange}
              name="phone"
              value={formValue.phone}
=======
              {...register("Phone", {
                required: true,

                minLength: 2,
              })}
              {...(errors.Phone?.type === "required" && {
                helperText: "Campo Obligatorio",
                error: true,
              })}
              {...(errors.Phone?.type === "minLenght" && {
                helperText: "Campo Obligatorio",
                error: true,
              })}
>>>>>>> SU-menudesplegable
            />
          </Box>
          <Box>
            <TextField
              label="Home address"
              sx={{ m: 1, width: "25ch" }}
              type="text"
<<<<<<< HEAD
              onChange={handleInputChange}
              name="address"
              value={formValue.address}
=======
              {...register("HomeAddress", {
                required: true,

                minLength: 2,
              })}
              {...(errors.HomeAddress?.type === "required" && {
                helperText: "Campo Obligatorio",
                error: true,
              })}
              {...(errors.HomeAddress?.type === "minLength" && {
                helperText: "La direccion es demaciada corta",
                error: true,
              })}
>>>>>>> SU-menudesplegable
            />
          </Box>
          <Box>
            <TextField
              label="Email"
              sx={{ m: 1, width: "25ch" }}
              type="email"
<<<<<<< HEAD
              onChange={handleInputChange}
              name="email"
              value={formValue.email}
            />
          </Box>
          <Box>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                onChange={handleInputChange}
                name="password"
                value={formValue.password}
                type={showPassword ? "text" : "password"}
                endAdornment={
=======
              {...register("Email", {
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                minLength: 2,
              })}
              {...(errors.Email?.type === "required" && {
                helperText: "Campo Obligatorio",
                error: true,
              })}
              {...(errors.Email?.type === "pattern" && {
                helperText: "Ingrese un Email valido",
                error: true,
              })}
            />
          </Box>
          <Box>
            <TextField
              sx={{ m: 1, width: "25ch" }}
              type={showPassword ? "text" : "password"}
              label="Password"
              {...register("Password", {
                required: true,

                minLength: 2,
              })}
              {...(errors.Password?.type === "required" && {
                helperText: "Campo Obligatorio",
                error: true,
              })}
              {...(errors.Password?.type === "minLength" && {
                helperText: "La contraseña es demaciado corta",
                error: true,
              })}
              InputProps={{
                endAdornment: (
>>>>>>> SU-menudesplegable
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
<<<<<<< HEAD
                }
                label="Password"
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm password
              </InputLabel>
              <OutlinedInput
                onChange={handleInputChange}
                name="confirmPassword"
                value={formValue.confirmPassword}
                type={showPassword ? "text" : "password"}
                endAdornment={
=======
                ),
              }}
            />
          </Box>
          <Box>
            <TextField
              sx={{ m: 1, width: "25ch" }}
              type={showPassword ? "text" : "password"}
              label="Confirm Password"
              {...register("ConfirmPassword", {
                required: true,
                minLength: 2,
                validate: (value) => value === getValues("Password"),
              })}
              {...(errors.ConfirmPassword?.type === "required" && {
                helperText: "Campo Obligatorio",
                error: true,
              })}
              {...(errors.ConfirmPassword?.type === "validate" && {
                helperText: "Las Contraseñas deben Coincidir",
                error: true,
              })}
              InputProps={{
                endAdornment: (
>>>>>>> SU-menudesplegable
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
<<<<<<< HEAD
                }
                label="Confirm password"
              />
            </FormControl>
          </Box>
          <Box>
            <Button
              onClick={submit}
=======
                ),
              }}
            />
          </Box>
          <Box>
            <Button
              onClick={onSubmit}
>>>>>>> SU-menudesplegable
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
