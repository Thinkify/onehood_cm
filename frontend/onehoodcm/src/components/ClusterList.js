import React ,{Component} from 'react';
import Link from '@material-ui/core/Link';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Title from './Title';
import Menu ,{ MenuProps } from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CachedIcon from '@material-ui/icons/Cached';


const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={1}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

export default class ClusterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          response_data: null,
          anchorEl: null, 
          setAnchorEl: null,
        };
      }

      handleClick = (event) => {
        this.setState({anchorEl:event.currentTarget});
      };

      handleClose = () => {
        this.setState({anchorEl:null});
      }

      componentDidMount () {
        this.renderMyData().then((result)=> this.setState({
            response_data: result
          }, () => {
              console.log(this.state.response_data);
          })).then(console.log("response data=",this.state.response_data));
        
    }
      async renderMyData() {
          var data;
        await fetch("http://localhost:5000/awsclusterservice/describeclusters").then(res => {return res.json()})
        .then(result => data = result)
        .catch(err => console.log(err));
        return data;
      }
      
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
            {/* <TableCell align="right">Actions</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {
              this.state.response_data &&
            //   JSON.stringify(this.state.response_data)
            //   this.state.response_data
            this.state.response_data.Reservations.map((Reservation) => (
                Reservation.Instances.map((Instance) => (
                  <TableRow key={Instance.InstanceId}>
                  <TableCell>{Instance.InstanceId}</TableCell>
                  {Instance.Tags.map((keypair) => (
                    <TableCell>{keypair.Value? keypair.Value : "Undefined"}</TableCell>
                  ) )
    }
                  <TableCell>{Instance.State.Name}</TableCell>
                  <TableCell>{Instance.LaunchTime.split("T")[0]}</TableCell>
                  <TableCell align="right">
                  <Button size="small" color="primary"><ArrowDropDownIcon/></Button>
                  <Button size="small" color="secondary" onClick={this.handleClick}><MoreVertIcon/></Button>
                  {/* <Menu
                    id="fade-menu"
                    elevation={1}
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}>
                    <MenuItem onClick={this.handleClose}><PowerSettingsNewIcon/>Start</MenuItem>
                    <MenuItem onClick={this.handleClose}><CachedIcon/>Reboot</MenuItem>
                    <MenuItem onClick={this.handleClose}><DeleteForeverIcon/>Terminate</MenuItem>
                    </Menu> */}
                    <StyledMenu
        id="customized-menu"
        anchorEl={this.state.anchorEl}
        keepMounted
        open={Boolean(this.state.anchorEl)}
        onClose={this.handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <PowerSettingsNewIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText primary="Start" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <DeleteForeverIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Terminate" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <CachedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Restart" />
        </StyledMenuItem>
      </StyledMenu>
                  </TableCell>
                </TableRow>
                ))
              ))
          }
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
}