import { Label, Padding } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Input, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import * as React from "react";
import "./form-business.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import ProfileForm from "../../../../shared/Components/avatarNuevo";
import { BusinessMutationServices } from "../../services/businessMutation/businessMutation.service";
import { stringify } from "json5";
import { BusinessQueryServices } from "../../services/businessQuery/businessQuery.service";

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
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const [mutateFunction] = useMutation(
    BusinessMutationServices.AddBusiness
  );
  function dataURLtoFile(dataurl:any, filename:any) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);  
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type:mime});
  }
  const {data,loading,error} = useQuery(
    BusinessQueryServices.FindOneBusiness,{variables:{
      findOneBusinessId:"64652186e5fdb4c0f9a501ff"
    }}
  )
  if(!loading&&data.findOneBusiness){
    console.log(data.findOneBusiness)
   let im= dataURLtoFile(data.findOneBusiness.image,'123')

  }
  const onSubmit = handleSubmit((values: any) => {

    mutateFunction({
      variables: {
        user: "63e693ce447082f41bcc0c5f",
        name: values.BusinessName,
        image: imageBase64
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
            console.log(data)
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
