import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import style from "./styleFormProfile.module.css";
import {
  Card,
  FormControl,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { UserServices } from "../../shared/services/userServices/userServices";
import { useMutation } from "@apollo/client/react";
import { IUser } from "../../models/user";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";

export const FormProfile = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IUser>();
  const [mutateFunction, { loading, error, data }] = useMutation(
    UserServices.UserMutationServices.register
  );

  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values));
    mutateFunction({
      variables: {
        image: values.image,
        name: values.name,
        surname: values.surname,
        phone: values.phone,
        HomeAddress: values.HomeAddress,
        gender: values.gender,
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
              {...(errors.name?.type === "minLength" && {
                helperText: "El nombre es demasiado corto",
                error: true,
              })}
            />
          </Box>
          <Box>
            <TextField
              label="Surname"
              sx={{ m: 1, width: "35ch" }}
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
                helperText: "El apellido es demasiado corto",
                error: true,
              })}
            />
          </Box>
          <Box>
            <TextField
              label="Phone"
              sx={{ m: 1, width: "35ch" }}
              type="tel"
              {...register("phone", {
                required: true,
                minLength: 2,
              })}
              {...(errors.phone?.type === "required" && {
                helperText: "Campo Obligatorio",
                error: true,
              })}
              {...(errors.phone?.type === "minLenght" && {
                helperText: "Campo Obligatorio",
                error: true,
              })}
            />
          </Box>
          <Box>
            <TextField
              label="Home address"
              sx={{ m: 1, width: "35ch" }}
              type="text"
              {...register("HomeAddress", {
                required: true,
                minLength: 2,
              })}
              {...(errors.HomeAddress?.type === "required" && {
                helperText: "Campo Obligatorio",
                error: true,
              })}
              {...(errors.HomeAddress?.type === "minLength" && {
                helperText: "La direccion es demasiado corta",
                error: true,
              })}
            />
          </Box>
          <div>
            <FormControl>
              <FormLabel sx={{ m: 1 }} id="demo-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                sx={{ m: 1 }}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                {...register("gender")}
              >
                <FormControlLabel
                  {...register("gender")}
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  {...register("gender")}
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  {...register("gender")}
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <Stack direction="row" spacing={2}>
            <Box>
              <Button
                onClick={onSubmit}
                className={style.submit}
                variant="contained"
                sx={{ m: 1 }}
                endIcon={<SendIcon />}
              >
                Submit
              </Button>
            </Box>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" sx={{ m: 1 }} startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </Stack>
        </div>
      </Card>
    </Box>
  );
};
