import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  return (
    <React.Fragment>
      <Title>Total Clusters</Title>
      <Typography component="p" variant="h4">
        6
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>   
        {
            new Date().getDate() + 'rd ' + monthNames[new Date().getMonth()] + ' ' + new Date().getFullYear()
        }
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}