import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
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

/* Define styles here */

// const useStyles = makeStyles((theme) => ({
//   seeMore: {
//     marginTop: theme.spacing(3),
//   },
// }));

export default function ClusterList(props) {
  // const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Clusters</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Instance-ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Created On</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.clusterData &&
            props.clusterData.Reservations.map((Reservation) =>
              Reservation.Instances.map((Instance) => (
                <TableRow key={Instance.InstanceId}>
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
                  <TableCell align="center">
                    <MenuList
                      key={Instance.State.Name}
                      clusterId={Instance.InstanceId}
                      state={Instance.State.Name}
                      onPressMenuItem={props.onPressMenuItem}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
