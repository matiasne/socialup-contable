import { Alert, AlertTitle, Typography } from '@mui/material'
import React from 'react'

type IAlert ={
    Title: string,
    Descriptions: string,
    Severity: "error"| "success" | "warning" | "info"
    
}

export default function Alerta (props: IAlert) {
  return (
    <div>
    <Alert severity={props.Severity}>
            <AlertTitle>{props.Title}</AlertTitle>
         <Typography>{props.Descriptions}</Typography>
    </Alert>
    
    </div>
  )
}

