import { Label, Padding } from "@mui/icons-material";
import { Box, Input, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import * as React from "react";
import "./formBusiness.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { BusinessMutationServices } from "../Services/business.services";

interface FormValues {
  BusinessName: string;
  Phone: string;
  Mail: string;
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
    BusinessMutationServices.AddBusiness
  );
  console.log(data)

  const onSubmit=handleSubmit((values: any) => {
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
    <Box  >
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

      <button  onClick={onSubmit} />
    </Box>
  );
};

export default FormBusinessComponent;
