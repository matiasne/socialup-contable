import { Input, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import * as React from "react";
import "./formBusiness.css";
import { useForm, SubmitHandler } from "react-hook-form";

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
  } = useForm<FormValues>({
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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    alert(JSON.stringify(data));
  };

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
    <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
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

      <Input type="submit" />
    </FormControl>
  );
};

export default FormBusinessComponent;
