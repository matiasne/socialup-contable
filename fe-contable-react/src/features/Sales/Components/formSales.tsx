import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  FormControlLabel,
  Radio,
  RadioGroup,
  Modal,
  Checkbox,
  CardContent,
  FormGroup,
} from "@mui/material";
import { UserServices } from "../../../shared/services/userServices/userServices";
import { ISale } from "../models/sale";
import { useMutation, useQuery } from "@apollo/client";
import NavBarMenu from "../../../shared/NavBar/NavBarMenu";
import { useForm } from "react-hook-form";
import { ClientServices } from "../../Clients/services/clientServices";
import SimpleDialogDemo from "../../../shared/Components/modal/DialogsSelect";
import { useState } from "react";
import { Label, Margin } from "@mui/icons-material";

interface typePayment {
  cash: boolean;
  credit: boolean;
  check: boolean;
  transfer: boolean;
  currentAccout: boolean;
}

export const FormSalesComponent = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ISale>();
  const [mutateFunction] = useMutation(
    UserServices.UserMutationServices.register
  );
  const { loading, error, data } = useQuery(
    ClientServices.QueryClientService.clients
  );
  const [statechecked, setStateChecked] = useState<typePayment>({
    cash: false,
    credit: false,
    check: false,
    transfer: false,
    currentAccout: false,
  }); //manejos del checkBox
  const [openModal, setOpenModal] = useState(false); //manejo del modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setStateChecked({
      cash: false,
      credit: false,
      check: false,
      transfer: false,
      currentAccout: false,
    });
  };
  console.log(statechecked);
  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values));
    mutateFunction({
      variables: {
        client: values.client,
        product: values.item,
        total: values.total,
        variations: values.variations,
      },
    });
  });

  return (
    <div>
      <NavBarMenu></NavBarMenu>
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "10vh",
        }}
        onSubmit={onSubmit}
      >
        <Card sx={{ p: 1, minWidth: "20em", textAlign: "center" }}>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Venta
          </Typography>
          <SimpleDialogDemo></SimpleDialogDemo>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            label="Variación"
            sx={{ m: 1, width: "25ch" }}
            type="text"
            {...register("variations", {
              required: true,
              minLength: 2,
            })}
            {...(errors.variations?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.variations?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="porsent" control={<Radio />} label="%" />
              <FormControlLabel value="male" control={<Radio />} label="$" />
            </RadioGroup>
          </Box>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
            label="Total"
            sx={{ m: 1, width: "25ch" }}
            type="text"
            {...register("total", {
              required: true,
              minLength: 2,
            })}
            {...(errors.total?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.total?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ p: "3%" }}
          >
            <Button onClick={handleOpenModal} variant="contained">
              Terminar Venta
            </Button>

            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box
                sx={{
                  marginTop: "20vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card sx={{ p: 3, maxWidth: "30em", textAlign: "center" }}>
                  <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
                    Forma de Pago
                  </Typography>
                  <FormGroup>
                    <Grid container spacing={1}>
                      <Grid container>
                        <Grid item xs={6} textAlign={"left"}>
                          <FormControlLabel
                            sx={{
                              "& .MuiSvgIcon-root": { fontSize: 30 },
                            }}
                            label="Cash"
                            control={
                              <>
                                <Checkbox
                                  onChange={() =>
                                    setStateChecked({
                                      ...statechecked,
                                      cash: !statechecked.cash,
                                    })
                                  }
                                />
                              </>
                            }
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            disabled={statechecked.cash == false}
                            type="number"
                            sx={{
                              position: "relative",
                              width: "15ch",
                              marginLeft: "32px",
                            }}
                            InputProps={{
                              readOnly: true,
                              startAdornment: (
                                <InputAdornment position="end">
                                  $
                                </InputAdornment>
                              ),
                            }}
                            variant="standard"
                            size="small"
                          />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={6} textAlign={"left"}>
                          <FormControlLabel
                            sx={{
                              position: "-moz-initial",
                              "& .MuiSvgIcon-root": { fontSize: 30 },
                            }}
                            label="Credit"
                            control={
                              <>
                                <Checkbox
                                  onChange={() =>
                                    setStateChecked({
                                      ...statechecked,
                                      credit: !statechecked.credit,
                                    })
                                  }
                                />
                              </>
                            }
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            disabled={statechecked.credit == false}
                            type="number"
                            sx={{ width: "15ch", marginLeft: "32px" }}
                            InputProps={{
                              readOnly: true,
                              startAdornment: (
                                <InputAdornment position="end">
                                  $
                                </InputAdornment>
                              ),
                            }}
                            variant="standard"
                            size="small"
                          />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={6} textAlign={"left"}>
                          <FormControlLabel
                            sx={{
                              position: "-moz-initial",
                              "& .MuiSvgIcon-root": { fontSize: 30 },
                            }}
                            label="Transfer"
                            control={
                              <>
                                <Checkbox
                                  onChange={() =>
                                    setStateChecked({
                                      ...statechecked,
                                      transfer: !statechecked.transfer,
                                    })
                                  }
                                />
                              </>
                            }
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            disabled={statechecked.transfer == false}
                            type="number"
                            sx={{ width: "15ch", marginLeft: "32px" }}
                            InputProps={{
                              readOnly: true,
                              startAdornment: (
                                <InputAdornment position="end">
                                  $
                                </InputAdornment>
                              ),
                            }}
                            variant="standard"
                            size="small"
                          />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item textAlign={"left"} xs={6}>
                          <FormControlLabel
                            sx={{
                              "& .MuiSvgIcon-root": { fontSize: 30 },
                            }}
                            label="Current Account"
                            control={
                              <>
                                <Checkbox
                                  onChange={() =>
                                    setStateChecked({
                                      ...statechecked,
                                      currentAccout:
                                        !statechecked.currentAccout,
                                    })
                                  }
                                />
                              </>
                            }
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            disabled={statechecked.currentAccout == false}
                            type="number"
                            sx={{ width: "15ch", marginLeft: "32px" }}
                            InputProps={{
                              readOnly: true,
                              startAdornment: (
                                <InputAdornment position="end">
                                  $
                                </InputAdornment>
                              ),
                            }}
                            variant="standard"
                            size="small"
                          />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={6} textAlign={"left"}>
                          <FormControlLabel
                            sx={{
                              "& .MuiSvgIcon-root": { fontSize: 30 },
                            }}
                            label="Check"
                            control={
                              <>
                                <Checkbox
                                  onChange={() =>
                                    setStateChecked({
                                      ...statechecked,
                                      check: !statechecked.check,
                                    })
                                  }
                                />
                              </>
                            }
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            disabled={statechecked.check == false}
                            type="number"
                            sx={{ width: "15ch", marginLeft: "32px" }}
                            InputProps={{
                              readOnly: true,
                              startAdornment: (
                                <InputAdornment position="end">
                                  $
                                </InputAdornment>
                              ),
                            }}
                            variant="standard"
                            size="small"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </FormGroup>
                  <br />
                  <Button onClick={handleCloseModal} variant="contained">
                    Confirmar Venta
                  </Button>
                </Card>
              </Box>
            </Modal>
          </Grid>
        </Card>
      </Box>
    </div>
  );
};
