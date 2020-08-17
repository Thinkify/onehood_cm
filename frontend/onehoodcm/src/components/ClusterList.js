import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import MenuList from "./MenuList";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import InfoIcon from "@material-ui/icons/Info";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

/* Define styles here */

// const useStyles = makeStyles((theme) => ({
//   seeMore: {
//     marginTop: theme.spacing(3),
//   },
// }));

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

export default function ClusterList(props) {
  const classes = useRowStyles();
  const { rows } = props.clusterData;
  const [open, setOpen] = React.useState(false);

  const onPressDetails = () => {
    setOpen(!open);
  };
  // const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Clusters</Title>
      <Table size="small" stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <b>Instance-ID</b>
            </TableCell>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell>
              <b>State</b>
            </TableCell>
            <TableCell>
              <b>Created On</b>
            </TableCell>
            <TableCell>
              <b>Details</b>
            </TableCell>
            <TableCell align="right">
              <b>Actions</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.clusterData &&
            props.clusterData.Reservations.map((Reservation) =>
              Reservation.Instances.map((Instance) => (
                <React.Fragment>
                  <TableRow key={Instance.InstanceId} className={classes.root}>
                    <TableCell>
                      {Instance.State.Name === "stopped" ? (
                        <CancelIcon
                          style={{ color: "orange" }}
                          fontSize="small"
                        />
                      ) : null}
                      {Instance.State.Name === "running" ? (
                        <CheckCircleIcon
                          style={{ color: "green" }}
                          fontSize="small"
                        />
                      ) : null}
                      {Instance.State.Name === "pending" ? (
                        <InfoIcon style={{ color: "grey" }} fontSize="small" />
                      ) : null}
                      {Instance.State.Name === "terminated" ? (
                        <DeleteForeverIcon
                          style={{ color: "red" }}
                          fontSize="small"
                        />
                      ) : null}
                    </TableCell>
                    <TableCell>{Instance.InstanceId}</TableCell>
                    {Instance.Tags.map((keypair, i) => (
                      <TableCell key={i}>
                        {keypair.Value ? keypair.Value : "Undefined"}
                      </TableCell>
                    ))}

                    <TableCell>
                      {Instance.State.Name}
                      {Instance.State.Name === "pending" ||
                      Instance.State.Name === "stopping" ||
                      Instance.State.Name === "shutting-down" ? (
                        <CircularProgress size={10} />
                      ) : null}
                    </TableCell>
                    <TableCell>{Instance.LaunchTime.split("T")[0]}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                      >
                        {open ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <MenuList
                        key={Instance.State.Name}
                        clusterId={Instance.InstanceId}
                        state={Instance.State.Name}
                        onPressMenuItem={props.onPressMenuItem}
                        // onPressDetails={() => onPressDetails}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key={Instance.InstanceId}>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                          {/* <Typography variant="h6" gutterBottom component="div">
                            Cluster Details
                          </Typography> */}
                          <Grid container spacing={3}>
                            <Grid item xs={3}>
                              <Paper spacing={2}>
                                <b>Architecture - </b>
                                {Instance.Architecture}
                              </Paper>
                              <Paper p={1}>
                                <b>Platform - </b>

                                {Instance.Platform
                                  ? Instance.Platform
                                  : "Unavailable"}
                              </Paper>
                              <Paper p={1}>
                                <b>Region - </b>

                                {Instance.Placement.AvailabilityZone}
                              </Paper>
                            </Grid>
                            <Grid item xs={3}>
                              <Paper>
                                <b>Root - </b>
                                {Instance.RootDeviceName}
                              </Paper>
                              <Paper>
                                <b>Root Type - </b>
                                {Instance.RootDeviceType}
                              </Paper>
                              <Paper>
                                <b>Hypervisor - </b>

                                {Instance.Hypervisor}
                              </Paper>
                            </Grid>
                            <Grid item xs={6}>
                              <Paper>
                                <b>Private DNS - </b>
                                {Instance.PrivateDnsName}
                              </Paper>
                              <Paper>
                                <b>Private IP Address - </b>
                                {Instance.PrivateIpAddress}
                              </Paper>
                              <Paper>
                                <b>Public DNS Name - </b>

                                {Instance.PublicDnsName}
                              </Paper>
                            </Grid>
                          </Grid>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            )}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
