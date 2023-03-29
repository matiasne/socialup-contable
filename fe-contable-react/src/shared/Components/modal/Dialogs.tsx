import { Box } from "@mui/material";
import { FormLogin } from "../../../pages/formLogin/formLogin";
import { FormRegister } from "../../../pages/formRegister/formRegister";
import ConfirmationDialog from "./ConfitmationDialog";
import SelectDialog from "./SelectDialog";

export const Dialog = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "10vh",
        position: "row",
      }}
    >
      <ConfirmationDialog title="Confiation Chango">
        {<FormLogin></FormLogin>}
      </ConfirmationDialog>
      <SelectDialog title="Cliente" titleInput="Clientes">
        <FormRegister></FormRegister>
      </SelectDialog>
    </Box>
  );
};
