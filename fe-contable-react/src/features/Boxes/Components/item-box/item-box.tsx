import {
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  styled,
  Switch,
  SwitchProps,
  Grid,
  FormControlLabel,
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
  Alert,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { IBox } from "../../models/box";
import { useState, MouseEventHandler } from "react";
import { useQuery } from "@apollo/client";
import { BoxServices } from "../../Services/boxServices";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }: any) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#FA0404" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

function ItemBox(props: IBox) {
  const { data, error, loading, refetch } = useQuery(
    BoxServices.BoxQueryServices.Boxs
  );
  const [showAlert, setShowAlert] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
    setIsDeleteDialogOpen(true);
  };
  const handleDeleteConfirmed: MouseEventHandler<HTMLButtonElement> = () => {
    setIsDeleteDialogOpen(false);
    setShowAlert(true);
    setTimeout(() => {
      refetch();
    }, 1000);
  };

  return (
    <>
      {showAlert && (
        <Alert severity="success" sx={{ marginBottom: "50px" }}>
          Eliminado
        </Alert>
      )}
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText
        primary={`Nombre: ${props.Name}`}
        secondary={`Importe : ${props.ActualAmount}`}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="editar">
          <Edit />
        </IconButton>
        <IconButton edge="end" aria-label="eliminar" onClick={handleDelete}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>¿Está seguro que desea eliminar esta caja?</DialogTitle>

        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteConfirmed}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container justifyContent="center" alignItems="center">
        <FormControlLabel
          control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
          label="Open"
        />
      </Grid>
    </>
  );
}

export default ItemBox;
