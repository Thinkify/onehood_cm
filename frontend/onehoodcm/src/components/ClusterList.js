import React, { Component } from "react";
import Link from "@material-ui/core/Link";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Title from "./Title";
import MenuList from "./MenuList";

export default class ClusterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response_data: this.props.clusterData,
      anchorEl: null,
      setAnchorEl: null,
    };
  }

  componentWillMount() {
    this.setState({ response_data: this.props.clusterData });
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    return (
      <React.Fragment>
        <Title>Clusters</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Instance-ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Created On</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.clusterData &&
              this.props.clusterData.Reservations.map((Reservation) =>
                Reservation.Instances.map((Instance) => (
                  <TableRow key={Instance.InstanceId}>
                    <TableCell>{Instance.InstanceId}</TableCell>
                    {Instance.Tags.map((keypair) => (
                      <TableCell>
                        {keypair.Value ? keypair.Value : "Undefined"}
                      </TableCell>
                    ))}
                    <TableCell>{Instance.State.Name}</TableCell>
                    <TableCell>{Instance.LaunchTime.split("T")[0]}</TableCell>
                    <TableCell align="right">
                      <Button size="small" color="primary">
                        <ArrowDropDownIcon />
                      </Button>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={(e) => this.handleClick(e)}
                      >
                        {/* <MenuList
                          anchorEl={this.state.anchorEl}
                          key={this.state.anchorEl}
                        /> */}
                        <MoreVertIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}
