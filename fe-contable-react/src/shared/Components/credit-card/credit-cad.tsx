import { Box, FormGroup, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import Card, { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

interface PaymentState {
  numberCard: string;
  expiry: string;
  cvc: string;
  name: string;
  focus: Focused | undefined;
}

const PaymentForm: React.FC = () => {
  const [state, setState] = useState<PaymentState>({
    numberCard: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: undefined,
  });

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, focus: evt.target.name as Focused }));
  };

  return (
    <>
      <Box
        sx={{
          marginTop: "20vh",
          display: "contents",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          number={state.numberCard}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
        <br />
        <FormGroup>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                sx={{ width: "100%" }}
                type="number"
                name="numberCard"
                placeholder="Card Number"
                value={state.numberCard}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                sx={{ width: "100%" }}
                type="text"
                name="name"
                placeholder="Name"
                value={state.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                type="number"
                name="expiry"
                placeholder="Expiry"
                value={state.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="number"
                name="cvc"
                placeholder="CVC"
                value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Grid>
          </Grid>
        </FormGroup>
      </Box>
    </>
  );
};

export default PaymentForm;
