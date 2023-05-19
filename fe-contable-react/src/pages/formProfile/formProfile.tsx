import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import style from "./styleFormProfile.module.css";
import {
  Card,
  FormControl,
  FormLabel,
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
import { FormControlLabel } from "@mui/material";
import ProfileForm from "../../shared/Components/avatarNuevo";

export const FormProfile = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IUser>();
  const [mutateFunction, { loading, error, data }] = useMutation(
    UserServices.UserMutationServices.register
  );
  console.log(data);

  const onSubmit = handleSubmit((values) => {
    console.log(values);
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
        <FormControl>
          <ProfileForm
            avatarType="user"
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
              helperText: "El apellido es demasiado corto",
              error: true,
            })}
          />
          <TextField
            label="Phone"
            sx={{ m: 1, width: "25ch" }}
            type="tel"
            {...register("phone", {
              required: true,
              minLength: 2,
            })}
            {...(errors.phone?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.phone?.type === "minLenght" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
          />
          <TextField
            label="Home address"
            sx={{ m: 1, width: "25ch" }}
            type="text"
            {...register("HomeAddress", {
              required: true,
              minLength: 2,
            })}
            {...(errors.HomeAddress?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.HomeAddress?.type === "minLength" && {
              helperText: "La direccion es demasiado corta",
              error: true,
            })}
          />
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
          <Stack direction="row" spacing={2}>
            <Button
              onClick={onSubmit}
              className={style.submit}
              variant="contained"
              sx={{ m: 1 }}
              endIcon={<SendIcon />}
            >
              Submit
            </Button>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" sx={{ m: 1 }} startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </Stack>
        </FormControl>
      </Card>
    </Box>
  );
};
