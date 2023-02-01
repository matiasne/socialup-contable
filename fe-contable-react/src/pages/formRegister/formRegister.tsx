import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import style from './styleFormRegister.module.css'
import { Card } from '@mui/material';

export const FormRegister = () => {

    const [formValue, setFormValue] = useState({
      name: "",
      phone: "",
      homeAdress: "",
      email: "",
      password: "",
      confirmPassword: "",
    }) 

    const handleInputChange = (event: any ) => {
      setFormValue ({
        ...formValue,
        [event.target.name]: event.target.value
      })
    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    }
    
    const submit = (event: any ) => {
      event.preventDefault()
      console.log(formValue)
    }
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <Card sx={{p:1}}>
      <div>
        <Box><TextField label="Name" sx={{ m: 1, width: '25ch' }} type="text" onChange={handleInputChange} name= "name" value={formValue.name}/></Box>
        <Box><TextField label="Phone" sx={{ m: 1, width: '25ch' }} type="tel" onChange={handleInputChange} name= "phone" value={formValue.phone}/></Box>
        <Box><TextField label="Home address" sx={{ m: 1, width: '25ch' }} type="text" onChange={handleInputChange} name= "homeAdress" value={formValue.homeAdress}/></Box>
        <Box><TextField label="Email" sx={{ m: 1, width: '25ch' }} type="email" onChange={handleInputChange} name= "email" value={formValue.email}/></Box>
        <Box><FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            onChange={handleInputChange} name= "password" value={formValue.password}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"/>
        </FormControl></Box>
        <Box><FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
          <OutlinedInput
            onChange={handleInputChange} name= "confirmPassword" value={formValue.confirmPassword}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm password"/>
        </FormControl></Box>
        <Box>
          <Button onClick={submit} 
          className = {style.submit} variant="contained">Submit</Button>
        </Box>
      </div>
      </Card>
      
      </Box>
    );
}