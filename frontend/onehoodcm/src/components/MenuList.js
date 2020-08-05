import React, { Component, PureComponent } from "react";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CachedIcon from "@material-ui/icons/Cached";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={1}
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

class MenuList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: this.props.anchorEl,
      setAnchorEl: null,
    };
  }
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  componentWillReceiveProps(newProps) {
    if (newProps.anchorEl !== this.props.anchorEl) {
      this.setState({ anchorEl: this.props.anchorEl });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.anchorEl !== this.props.anchorEl) {
      this.setState({ anchorEl: this.props.anchorEl });
    }
    // this.setState({ anchorEl: this.props.anchorEl });
  }

  render() {
    return (
      <StyledMenu
        id="customized-menu"
        anchorEl={this.state.anchorEl}
        open={Boolean(this.state.anchorEl)}
        onClose={Boolean(this.state.anchorEl)}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <PowerSettingsNewIcon fontSize="small" />
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
    );
  }
}

export default MenuList;
