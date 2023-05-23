import { useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  styled,
  Switch,
  SwitchProps,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import NavBarMenu from "../../../../shared/NavBar/NavBarMenu";
import { UserServices } from "../../../../shared/services/userServices/userServices";
import { IBox } from "../../models/box";

import ProfileForm from "../../../../shared/Components/avatarNuevo";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BoxMutationServices } from "../../Services/boxMutation/boxMutation.service";
import { BoxQueryServices } from "../../Services/boxQuery/boxQuery.service";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#FA0404" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export const FormBoxComponent = () => {
  const [imageBase64, setImageBase64] = React.useState<any>(null);
  const [img, setImg] = React.useState("");
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IBox>({
    defaultValues:{
      Name: "",
      Status: "",
      ActualAmount: "",
      DailyAmount: "",
      Image: ""
    }
  });
   const { id } = useParams();
   const [mutateFunction] = useMutation(
    id
      ? BoxMutationServices.UpdateBox
      : BoxMutationServices.CreateBox
  );
   
  const { data, loading } = useQuery(
    BoxQueryServices.FindOnebox,
    {
      variables: {
        findOneBox: id ? id : null,
      },
    }
  );
  
  useEffect(()=>{
    console.log(data)
    if (data) {
      setValue("Name", data.findOne.name);
      setValue("Status", data.findOneBox.status);
      setValue("ActualAmount", data.findOneBox.ActualAmount);
      setValue("DailyAmount", data.findOneBox.ActualAmount)
    } 
   },[data])

   if (loading) {
    return <></>;
  }

  const onSubmit = handleSubmit(async (values: any) => {
    console.log(values)
    mutateFunction({
     variables: {
       id: id ? id : null,
       user: "63e693ce447082f41bcc0c5f",
       name: values.name,
       status: values.status,
       ActualAmount: values.actualamount,
       DailyAmount: values.dailyamount,
       image: values.Image ? values.Image : data.FindOnebox.Image,
     },
   });
   //await refetch()
 });



  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "10vh",
      }}
      onSubmit={onSubmit}
    >
      <Card sx={{ p: 1 }}>
        <FormControl>
          <ProfileForm
            avatarType="box"
            onChange={(data: any) => {
              console.log(data);
            }}
            defaultImage={""}
          />
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Crear Caja
          </Typography>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            label="Name"
            sx={{ m: 1, width: "25ch" }}
            type="text"
            {...register("Name", {
              required: true,
              minLength: 2,
            })}
            {...(errors.Name?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.Name?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            label="Monto inicial"
            sx={{ m: 1, width: "25ch" }}
            type="number"
            {...register("ActualAmount", {
              required: true,
              minLength: 2,
            })}
            {...(errors.ActualAmount?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.ActualAmount?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ p: "3%" }}
          >
            <Button onClick={onSubmit} variant="contained">
              Submit
            </Button>
          </Grid>
          <Grid container justifyContent="center" alignItems="center">
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              label="Open"
            />
          </Grid>
        </FormControl>
      </Card>
    </Box>
  );
};
