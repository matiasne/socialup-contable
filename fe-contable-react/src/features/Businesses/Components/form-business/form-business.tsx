import { Label, Padding } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Input, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import * as React from "react";
import "./form-business.css";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import ProfileForm from "../../../../shared/Components/avatarNuevo";
import { stringify } from "json5";
import { BusinessMutationServices } from "../../Services/businessMutation/businessMutation.service";
import { BusinessQueryServices } from "../../Services/businessQuery/businessQuery.service";
import { useParams } from "react-router-dom";

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

  const { data, loading, error } = useQuery(
    BusinessQueryServices.FindOneBusiness,
    {
      variables: {
        findOneBusinessId: id ? id : null,
      },
    }
  );
  if (id) {
    if (!loading && data.findOneBusiness) {
      setValue("BusinessName", data.findOneBusiness.name);
      setValue("Address", data.findOneBusiness.address);
      setValue("Phone", data.findOneBusiness.phone);
      setValue("BusinessCategory", data.findOneBusiness.category);
      setValue("Email", data.findOneBusiness.email);
    }

    if (loading) {
      return <></>;
    }
  }

  const onSubmit = handleSubmit((values: any) => {
    mutateFunction({
      variables: {
        id: id ? id : null,
        user: "6438502e81216f94b566b3fd",
        name: values.BusinessName,
        address: values.Address,
        email: values.email,
        category: values.BusinessCategory,
        image: values.Image,
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
    >
      <Card sx={{ pb: 1 }}>
        <FormControl>
          <ProfileForm
            avatarType="business"
            onChange={(data: any) => {
              setValue("Image", data);
            }}
            defaultImage={id ? data.findOneBusiness.image : imageBase64}
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
