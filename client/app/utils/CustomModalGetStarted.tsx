import { Modal, Box, IconButton } from "@mui/material";
import React, { FC } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setRoute?: (route: string) => void;
  component: React.ComponentType<any>;
};

const CustomModalGetStarted: FC<Props> = ({
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
      minHeight: "50vh", // Decreased height
      borderRadius: "10px", // Rounded corners
      overflow: "hidden", // Hide overflowing content
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      color: "gray",
      background: "rgba(255, 255, 255, 0.8)",
      borderRadius: "50%", // Make the button circular
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
        className="w-full  rounded-md shadow-lg p-4 outline-none max-w-md mx-auto lg:max-w-2xl xl:max-w-3xl"
        style={styles.modalContent}
      >
        <div className="flex flex-col-reverse lg:flex-row relative">
          <div className="w-full lg:w-2/2 p-4">
            <Component setOpen={setOpen} setRoute={setRoute} />
          </div>

          <IconButton onClick={() => setOpen(false)} sx={styles.closeButton}>
            <CancelIcon />
          </IconButton>
        </div>
      </Box>
    </Modal>
  );
};

export default CustomModalGetStarted;
