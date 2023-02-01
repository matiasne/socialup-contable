import { Button, Card, TextField } from "@mui/material"
import React, { useState } from "react";





export const FormForgotPassword = ()=>{
    const [email, setEmail] = useState("");
        
    const submit = ()=> console.log(email)
    const handleSubmit = (e:any) =>{    
        console.log("Ya se envio")
        alert("El E-mail se ha enviado")
    };
    
    return(
        <Card variant="outlined">
            <div>
                <h3>Recuperar su contraseña</h3>
                <p>Ingrese su Correo Electrónico para poder recibir las indicaciones para recuperar su Contraseña.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="E-mail"
                        name="email"
                        type="e-mail"
                        value={email}onChange={(e)=>setEmail(e.target.value)}
                    />
                  
               
                </div> <br></br>
                <div>
                    <Button type="submit" variant="contained" >Enviar</Button>
                </div>
            </form>
           
            
        </Card>
    )}
