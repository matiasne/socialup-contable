import { Label, Padding } from "@mui/icons-material";
import { Box, Button, Input, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import * as React from "react";
import "./formBusiness.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { BusinessMutationServices } from "../services/businessMutation/businessMutation.service";
import { useMutation } from "@apollo/client";
import { IBusiness } from "../model/business";
import { BusinessServices } from "../services/businessServices";

const FormBusinessComponent: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBusiness>({
    defaultValues: {
      BusinessName: "",
      Phone: "",
      Mail: "",
      Address: "",
      BusinessCategory: "",
      Image: "",
      touched: "",
    },
  });
  const [mutateFunction, { loading, error, data }] = useMutation(
    BusinessServices.BusinessMutationServices.addBusiness
  );
  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values));
    mutateFunction({
      variables: {
        user: "6438502e81216f94b566b3fd",
        name: values.BusinessName,
        phone: values.Phone,
        mail: values.Mail,
        address: values.Address,
        businessCategory: values.BusinessCategory,
        image: values.Image,
        touched: values.touched,
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

  console.log("touched", errors);

  return (
    <FormControl component="form" onSubmit={onSubmit}>
      <label htmlFor="image">UPLOAD IMAGE</label>
      <Input type="file" id="image" onChange={handleImageChange} />
      <br />
      <img src={imageUrl} alt="" />
      <br />
      <TextField
        label="Business Name"
        variant="outlined"
        {...register("BusinessName", { required: true })}
      />
      <TextField
        label="Phone"
        variant="outlined"
        type="number"
        {...register("Phone")}
      />
      <TextField label="Mail" variant="outlined" {...register("Mail")} />
      <TextField label="Address" variant="outlined" {...register("Address")} />
      <TextField
        label="Business Category"
        variant="outlined"
        {...register("BusinessCategory")}
      />

      <Box>
        <Button onClick={onSubmit} variant="contained">
          Submit
        </Button>
      </Box>
    </FormControl>
  );
};

export default FormBusinessComponent;
