import { Label, Padding } from "@mui/icons-material";
import { Box, Button, Card, Input, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import * as React from "react";
import "./form-business.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { BusinessServices } from "../../services/businessServices";

interface FormValues {
  BusinessName: string;
  Phone: string;
  Email: string;
  Address: string;
  BusinessCategory: string;
  Image: string;
  touched: string;
}

const FormBusinessComponent: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [mutateFunction, { loading, error, data }] = useMutation(
    BusinessServices.BusinessMutationServices.AddBusiness
  );
  console.log(data);

  const onSubmit = handleSubmit((values: any) => {
    alert(JSON.stringify(values));
    mutateFunction({
      variables: {
        user: "63e693ce447082f41bcc0c5f",
        name: "Harcode",
      },
    });
  });

  const [imageUrl, setImageUrl] = React.useState<string | undefined>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageUrl = event.target?.result;
        setImageUrl(imageUrl?.toString());
      };

      reader.readAsDataURL(file);
    }
  };

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
          <label htmlFor="image">UPLOAD IMAGE</label>
          <Input type="file" id="image" onChange={handleImageChange} />
          <br />
          <img src={imageUrl} alt="" />
          <br />
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
          <Button onClick={onSubmit} variant="contained">
            Submit
          </Button>
        </FormControl>
      </Card>
    </Box>
  );
};

export default FormBusinessComponent;
