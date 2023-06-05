import { Avatar, Box, Button, Card, Input, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import * as React from "react";
import "./form-business.css";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import ProfileForm from "../../../../shared/Components/avatarNuevo";
import { useParams } from "react-router-dom";
import { BusinessQueryServices } from "../../services/businessQuery/businessQuery.service";
import { useEffect, useState } from "react";
import {
  getSessionServices,
  setSessionService,
} from "../../../../auth/services/session.service";
import { BusinessMutationServices } from "../../services/businessMutation/businessMutation.service";


interface FormValues {
  BusinessName: string;
  Phone: string;
  Email: string;
  Address: string;
  BusinessCategory: string;
  Image: any;
  touched: string;
}

const FormBusinessComponent: React.FC = () => {
  const [imageBase64, setImageBase64] = React.useState<any>(null);
  const [img, setImg] = React.useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      BusinessName: "",
      Address: "",
      BusinessCategory: "",
      Email: "",
      Image: "",
      Phone: "",
      touched: "",
    },
  });
  const { id } = useParams();
  const [mutateFunction] = useMutation(
    id
      ? BusinessMutationServices.UpdateBusiness
      : BusinessMutationServices.AddBusiness
  );


 
const idBusiness = getSessionServices("business")
      console.log(idBusiness)
const { data, loading } = useQuery(
    BusinessQueryServices.FindOneBusiness,
    {
      variables: {
        findOneBusinessId: idBusiness ? idBusiness : null,
      },
    }
  );
  


  useEffect(()=>{
    if (data) {
      console.log(data);
      setValue("BusinessName", data.findOneBusiness.name);
      setValue("Address", data.findOneBusiness.address);
      setValue("Phone", data.findOneBusiness.phone);
      setValue("BusinessCategory", data.findOneBusiness.category);
      setValue("Email", data.findOneBusiness.email);
      setValue("Image", data.findOneBusiness.image);
    }
  }, [data]);

  if (loading) {
    return <></>;
  }

  const onSubmit = handleSubmit(async (values: any) => {
    const response = await mutateFunction({
      variables: {
        id: id ? id : null,
        name: values.BusinessName,
        address: values.Address,
        email: values.email,
        category: values.BusinessCategory,
        image: values.Image ? values.Image : data.findOneBusiness.image,
      },
    });
    setSessionService("business", response.data.addBusiness._id);
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
    >
      <Card sx={{ pb: 1 }}>
        <FormControl>
          <ProfileForm
            avatarType="business"
            onChange={(data: any) => {
              console.log(data);
              setValue("Image", data);
            }}
            defaultImage={idBusiness ? data.findOneBusiness.image : imageBase64}
          />
          <TextField
            sx={{ m: 1, width: "25ch" }}
            label="Business Name"
            variant="outlined"
            type="text"
            {...register("BusinessName", { required: true })}
          />
          <TextField
            sx={{ m: 1, width: "25ch" }}
            label="Phone"
            variant="outlined"
            type="tel"
            {...register("Phone")}
          />
          <TextField
            sx={{ m: 1, width: "25ch" }}
            label="Email"
            variant="outlined"
            type="email"
            {...register("Email")}
          />
          <TextField
            sx={{ m: 1, width: "25ch" }}
            label="Address"
            variant="outlined"
            type="text"
            {...register("Address")}
          />
          <TextField
            sx={{ m: 1, width: "25ch" }}
            label="Business Category"
            variant="outlined"
            type="text"
            {...register("BusinessCategory")}
          />
          <Button
            sx={{ m: 1, width: "43ch" }}
            onClick={onSubmit}
            variant="contained"
          >
            {id ? "Editar" : "Crear"}
          </Button>
        </FormControl>
      </Card>
    </Box>
  );
};

export default FormBusinessComponent;
