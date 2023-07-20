import React, { ReactNode, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  form: React.ReactNode;
}

export default function FloatingActionButtons({ form }: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log(form?.toLocaleString());
    setOpen(false);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        "& > :not(style)": { m: 1 },
      }}
    >
      <Fab color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "4px",
            padding: "16px",
            outline: "none",
            position: "relative",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: "8px",
              right: "8px",
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          {form}
        </Box>
      </Modal>
    </Box>
  );
}
