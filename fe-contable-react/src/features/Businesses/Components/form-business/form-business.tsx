import { Box, Button, Card, Input, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import * as React from "react";
import "./form-business.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { BusinessMutationServices } from "../../Services/businessMutation/businessMutation.service";
import ProfileForm from "../../../../shared/Components/avatarNuevo";

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
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const [mutateFunction, { loading, error, data }] = useMutation(
    BusinessMutationServices.AddBusiness
  );
  console.log(data);

  const onSubmit = handleSubmit((values: any) => {
    console.log(values);
    mutateFunction({
      variables: {
        user: "63e693ce447082f41bcc0c5f",
        name: "Harcode",
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
            onChange={function (data: any): void {
              setValue("Image", data);
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
