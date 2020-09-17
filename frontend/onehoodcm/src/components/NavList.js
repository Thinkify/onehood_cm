import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ImageResolver from "./ImageResolver";
import awslogo from "../asset/awslogo.png";
import gcplogo from "../asset/gcplogo.png";
import azurelogo from "../asset/azurelogo.png";
import ModalComponent from "./ModalComponent";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { Link as RouterLink } from "react-router-dom";

import GTranslateTwoToneIcon from "@material-ui/icons/GTranslateTwoTone";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import DockIcon from "@material-ui/icons/Dock";
import WbCloudyIcon from "@material-ui/icons/WbCloudy";

import dockerlogo from "../asset/dockerlogo.png";

export const mainListItems = (
  <div>
    <ListSubheader inset>Cloud Services</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <WbCloudyIcon />
      </ListItemIcon>
      <ListItemText primary="AWS" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GTranslateTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="GCP" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AcUnitIcon />
      </ListItemIcon>
      <ListItemText primary="Azure" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DockIcon />
      </ListItemIcon>
      <ListItemText primary="Docker" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Management</ListSubheader>
    <ListItem button>
      {/* <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" /> */}
      <ModalComponent />
    </ListItem>
    <ListItem button>
      {/* <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" /> */}
      <RouterLink to="/releasemanagement" style={{ textDecoration: "none" }}>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          startIcon={<ArrowUpwardIcon />}
          style={{ width: "180px" }}
          // onClick={handleSubmit}
        >
          Release
        </Button>
      </RouterLink>
    </ListItem>
    {/* <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem> */}
  </div>
);
