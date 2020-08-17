import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CachedIcon from "@material-ui/icons/Cached";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreIcon from "@material-ui/icons/More";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  /* Default menu design configuration */
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function MenuList(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  var refreshIntervalId;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    var action;
    if (value === "start") {
      action = "startcluster";
    } else if (value === "stop") {
      action = "stopcluster";
    } else if (value === "restart") {
      action = "rebootcluster";
    } else if (value === "terminate") {
      action = "terminatecluster";
    } else if (value === "details") {
      props.onPressDetails();
    } else {
      setAnchorEl(null);
      return;
    }

    manageCluster(action, props.clusterId);
    console.log(props.clusterId);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (
      props.state === "running" ||
      props.state === "stopped" ||
      props.state === "terminated"
    ) {
      console.log("Code inside useEffect, state now = ", props.state);
      clearInterval(refreshIntervalId); /* Not Effective */
    }
  });
  /* Leading to infinite API calls */
  const manageInterval = () => {
    props.onPressMenuItem();
    refreshIntervalId = setInterval(function () {
      console.log("Interval running");
      props.onPressMenuItem();
    }, 5000);
  };

  const manageCluster = (action, clusterId) => {
    console.log("inside managecluster");
    fetch("http://localhost:5000/awsclusterservice/" + action + "/" + clusterId)
      .then((res) => res.json())
      .then((result) => {
        manageInterval();
        console.log(result);
      })
      .catch((err) => console.log(err.stack));
  };

  return (
    <div>
      {props.state === "terminated" ? (
        <IconButton onClick={handleClick} disabled>
          <MoreVertIcon />
        </IconButton>
      ) : (
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      )}
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={() => handleClose("details")}>
          <ListItemIcon>
            <MoreIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Details" />
        </StyledMenuItem>
        {props.state === "stopped" ? (
          <StyledMenuItem onClick={() => handleClose("start")}>
            <ListItemIcon>
              <PowerSettingsNewIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Start" />
          </StyledMenuItem>
        ) : (
          <StyledMenuItem onClick={() => handleClose("stop")}>
            <ListItemIcon>
              <PowerSettingsNewIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Stop" />
          </StyledMenuItem>
        )}
        <StyledMenuItem onClick={() => handleClose("terminate")}>
          <ListItemIcon>
            <DeleteForeverIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Terminate" />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => handleClose("restart")}
          disabled={props.state === "stopped" ? true : false}
        >
          <ListItemIcon>
            <CachedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Restart" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
