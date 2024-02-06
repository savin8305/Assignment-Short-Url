import { Modal, Box, IconButton } from "@mui/material";
import React, { FC } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setRoute?: (route: string) => void;
  component: React.ComponentType<any>;
};

const CustomModal: FC<Props> = ({
  open,
  setOpen,
  setRoute,
  component: Component,
}) => {
  const styles = {
    modalContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modalContent: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "70vh", // Adjust as needed
    },
    sideImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "0 0 0.375rem 0",
      transition: "transform 0.5s",
      "&:hover": {
        transform: "scale(1.05)",
      },
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      color: "gray",
      background: "rgba(255, 255, 255, 0.8)",
      "&:hover": {
        background: "rgba(255, 255, 255, 0.9)",
      },
    },
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={styles.modalContainer}
    >
      <Box
        className="w-full bg-white dark:bg-gray-800 rounded-md shadow-lg p-4 outline-none  max-w-md mx-auto lg:max-w-2xl xl:max-w-3xl"
        style={styles.modalContent}
      >
        <div className="flex flex-col-reverse lg:flex-row relative">
          <div className="w-full lg:w-1/2 p-4">
            <Component setOpen={setOpen} setRoute={setRoute} />
          </div>
          <div className="w-full lg:w-1/2 overflow-hidden">
            <img
              src="https://i.pinimg.com/564x/43/65/8e/43658eacc5b1454d15439ef42193f3d0.jpg"
              alt="Side Image"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <IconButton onClick={() => setOpen(false)} sx={styles.closeButton}>
            <CancelIcon />
          </IconButton>
        </div>
      </Box>
    </Modal>
  );
};

export default CustomModal;
