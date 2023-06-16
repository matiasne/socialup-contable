import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import style from "./styleFormLogin.module.css";
import { Card, CircularProgress } from "@mui/material";
import { UserServices } from "../../shared/services/userServices/userServices";
import { useMutation } from "@apollo/client/react";
import { useForm } from "react-hook-form";
import { getSessionServices, setSessionService } from "../../auth/services/session.service";

interface FormData {
  Email: string;
  Password: string;
}
export const FormLogin = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();
  const [mutateFunction, { loading, error, data }] = useMutation(
    UserServices.UserMutationServices.login
  );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("http://localhost:4000/", {
  //       headers: {
  //         // Agrega aquí los headers que necesites enviar
  //         Authorization: getSessionServices("token"),
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const data = await response.json();
  //     // Hacer algo con los datos de la respuesta si es necesario
  //   };

  //   fetchData();
  // }, []); // El segundo argumento [] significa que solo se ejecutará una vez al cargar la página



  if (loading)
    return (
      <div>
        <CircularProgress color="success" />
        Loading...
      </div>
    );
  if (error) {
    setSessionService("token", "");
    return <p>Error : {error.message}</p>;
  }
  if (data) {
    setSessionService("token", data.login.value);
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values));
    mutateFunction({
      variables: { email: values.Email, password: values.Password },
    });
  });

  return (
    <div className={style.Body}>
      <Card sx={{ p: 5 }}>
        <div>
          <img
            className={style.logoSocial}
            src="https://socialup.com.ar/wp-content/uploads/2021/11/logo-blanco-135x71.png"
            alt=""
          />
        </div>
        <Box>
          <TextField
            label="Email"
            sx={{ m: 1, width: "25ch" }}
            type="email"
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
              ),
            }}
          />
        </Box>
        <Box>
          <Button variant="contained" endIcon={<SendIcon />} onClick={onSubmit}>
            Sign In
          </Button>
        </Box>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Grid>
          <Link
            className={style.forgotPassword}
            href="/forgotPassword"
            variant="body2"
            color="#6b0040"
          >
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link
            href="/register"
            variant="body2"
            underline="none"
            color="#6b0040"
          >
            Don't have an account?
          </Link>
          <Link
            href="/register"
            variant="subtitle1"
            color="#92213c"
            underline="hover"
          >
            {"Sign Up"}
          </Link>
        </Grid>
      </Card>
    </div>
  );
};

