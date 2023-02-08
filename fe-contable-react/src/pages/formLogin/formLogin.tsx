import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import style from "./styleFormLogin.module.css";
import { ILoginUser } from "../../models/user";
import { Card } from "@mui/material";
import { AxiosInterceptors } from "../../interceptors/axios.interceptor";
import { useMutation, useQuery } from "@apollo/client";
import { Login } from "../../shared/query/userQuery";

export const FormLogin = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formValue, setForm] = useState<ILoginUser>({
    email: "",
    password: "",
  });
  const [mutateFunction, { loading, error, data }] = useMutation(Login);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (data) console.log(data);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const handleInputChange = (event: any) => {
    setForm({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const submit = (e: any) => {
    e.preventDefault();
    mutateFunction({
      variables: { username: formValue.email, password: formValue.password },
    });
  };

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
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <TextField
            label="Email"
            variant="standard"
            type="email"
            name="email"
            required
            value={formValue.email}
            onChange={handleInputChange}
          ></TextField>
        </FormControl>
        <Box>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              value={formValue.password}
              name="password"
              onChange={handleInputChange}
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Box>
          <Button variant="contained" endIcon={<SendIcon />} onClick={submit}>
            Sign In
          </Button>
        </Box>
        {formValue.email && formValue.password !== "" && (
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
        )}
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
