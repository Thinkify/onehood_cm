import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import Skeleton from "@material-ui/lab/Skeleton";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const classes = useStyles();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <React.Fragment>
      <Title>Total Clusters</Title>
      <Typography component="p" variant="h4">
        {props.clusterCount}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {new Date().getDate() +
          " " +
          monthNames[new Date().getMonth()] +
          " " +
          new Date().getFullYear()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
