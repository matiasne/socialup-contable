import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { ClientServices } from "../../../features/Clients/services/clientServices";
import { ListItems } from "../list-item/list-item";
import { IClient } from "../../../features/Clients/models/client";
import { useNavigate } from "react-router-dom";
import ItemClient from "../../../features/Clients/components/item-client/itemClient";
import { Box } from "@mui/material";

interface Item {
  id?: string;
  name: string;
  image: any;
  city?: string;
  address?: string;
  email: string;
  phone?: string;
  idBusiness?: string;
  postCode?: string;
  documentType?: string;
  documentNumber?: string;
  surname?: string;
}

interface SimpleDialogProps {
  open: boolean;
  onClose: (value?: Item) => void;
}

const SimpleDialog: React.FC<SimpleDialogProps> = ({ open, onClose }) => {
  const { data, error, loading, refetch } = useQuery(
    ClientServices.QueryClientService.clients
  );
  const navigate = useNavigate();
  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (item: Item) => {
    onClose(item);
  };
  const handleClick = () => {
    navigate("/Client");
  };

  return (
    <Dialog onClose={handleClose} open={open} sx={{ textAlign: "center" }}>
      <DialogTitle>Lista de Cliente</DialogTitle>
      <List sx={{ padding: 10, pt: 0 }}>
        {!loading && data && data.findUserBusiness ? (
          <ListItems
            items={data.findUserBusiness[0].client}
            renderItem={(item: IClient) => (
              <ListItem disableGutters key={item.id}>
                <ListItemButton
                  onClick={() =>
                    handleListItemClick({
                      id: item.id,
                      name: item.name,
                      surname: item.surname,
                      documentType: item.documentType,
                      documentNumber: item.documentNumber,
                      image: item.image,
                      email: item.email,
                      phone: item.phone,
                      address: item.address,
                      city: item.city,
                      postCode: item.postCode,
                    })
                  }
                >
                  <ItemClient client={item}></ItemClient>
                </ListItemButton>
              </ListItem>
            )}
            handleItemClick={function (item: IClient): void {
              console.log(item);
              //handleItemDelete(item.id);
            }}
          ></ListItems>
        ) : (
          <div>spinner</div>
        )}
        <ListItem disableGutters>
          <ListItemButton autoFocus onClick={handleClose}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cargar Cliente" onClick={handleClick} />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
};
interface SimpleDialogDemoProps {}
export default function SimpleDialogDemo() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<
    Item | undefined | IClient
  >();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value?: Item) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const cliente: IClient = selectedValue as IClient;
  console.log(cliente);
  return (
    <div>
      {selectedValue !== undefined ? (
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          <ItemClient client={cliente}></ItemClient>
        </Box>
      ) : null}
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Seleccionar Cliente
      </Button>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}
