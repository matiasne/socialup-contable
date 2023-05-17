import { Box, Button, Card, Input, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import * as React from "react";
import "./form-business.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@apollo/client";
import ProfileForm from "../../../../shared/Components/avatarNuevo";
import { stringify } from "json5";
import { BusinessMutationServices } from "../../Services/businessMutation/businessMutation.service";

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
  const [imageBase64, setImageBase64] = React.useState<string>("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const [mutateFunction, { loading, error, data }] = useMutation(
    BusinessMutationServices.AddBusiness
  );

  const onSubmit = handleSubmit((values: any) => {
    console.log(values);
    console.log(imageBase64);
    mutateFunction({
      variables: {
        user: "63e693ce447082f41bcc0c5f",
        name: values.BusinessName,
        image: imageBase64,
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
            {...register("Image")}
            onChange={(data: any) => {
              console.log(data);
              setImageBase64(data);
            }}
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
            Submit
          </Button>
        </FormControl>
      </Card>
    </Box>
  );
};

export default FormBusinessComponent;
