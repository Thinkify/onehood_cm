import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";
import CreateCluster from "./CreateCluster";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 500,
    backgroundColor: theme.palette.background.paper,
    // border: "0px solid",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ModalComponent(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        size="small"
        variant="contained"
        color="secondary"
        startIcon={<AddCircleIcon />}
        onClick={handleOpen}
        style={{ width: "180px" }}
      >
        Create Cluster
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <IconButton onClick={handleClose} style={{ float: "right" }}>
              <CancelIcon />
            </IconButton>
            <CreateCluster
              onPressButton={handleClose}
              onCreateCluster={props.onSubmit}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
