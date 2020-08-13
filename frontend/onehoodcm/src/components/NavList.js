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

import dockerlogo from "../asset/dockerlogo.png";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ImageResolver image={awslogo} fluid />
      </ListItemIcon>
      <ListItemText primary="AWS" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ImageResolver image={gcplogo} />
      </ListItemIcon>
      <ListItemText primary="GCP" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ImageResolver image={azurelogo} />
      </ListItemIcon>
      <ListItemText primary="Azure" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ImageResolver image={dockerlogo} />
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
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
    {/* <ListItem button>
      <ModalComponent form={<CreateCluster />}></ModalComponent>
      <ListItemText primary="Create Cluster" />
    </ListItem> */}
  </div>
);
