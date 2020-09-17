import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CreateCluster(props) {
  const classes = useStyles();
  const [clusterName, setClusterName] = useState();
  const [ami, setAmi] = useState("ami-0ff8a91507f77f867");
  const [userName, setUserName] = useState();
  const [clusterType, setClusterType] = useState("t2.micro");
  const [region, setRegion] = useState("us-east-1");
  const [error, setError] = useState();
  const [value, setValue] = React.useState(0);
  const [quickDeployCheck, setQuickDeployCheck] = React.useState(false);
  const [quickDeployName, setQuickDeployName] = React.useState();
  const [quickDeploys, setQuickDeploys] = React.useState();
  const [selectedQuickDeploy, setSelectedQuickDeploy] = React.useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const setCluster = (event) => {
    setClusterName(event.target.value);
  };

  const setUser = (event) => {
    setUserName(event.target.value);
  };

  const handleAmiChange = (event) => {
    setAmi(event.target.value);
  };

  const handleClusterTypeChange = (event) => {
    setClusterType(event.target.value);
  };

  const handleRegion = (event) => {
    setRegion(event.target.value);
  };

  const handleQuickDeployChange = (event) => {
    setSelectedQuickDeploy(event.target.value);
  };

  const handleQuickDeploy = () => {
    setQuickDeployCheck(!quickDeployCheck);
  };

  const handleQuickDeployName = (event) => {
    setQuickDeployName(event.target.value);
  };

  const createQuickDeploy = () => {
    console.log("Inside quick deploy method");
    var quickDeployHeaders = new Headers();
    quickDeployHeaders.append(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    var urlencodedQuickDeploy = new URLSearchParams();
    urlencodedQuickDeploy.append("region", region);
    urlencodedQuickDeploy.append("cluster_type", clusterType);
    urlencodedQuickDeploy.append("deploy_name", quickDeployName);
    urlencodedQuickDeploy.append("cluster_ami", ami);

    var requestOptions = {
      method: "POST",
      headers: quickDeployHeaders,
      body: urlencodedQuickDeploy,
      redirect: "follow",
    };

    fetch("http://localhost:5000/quickdeploy/createquickdeploy", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const handleSubmit = () => {
    if (quickDeployCheck) {
      createQuickDeploy();
    }
    if (clusterType != null && clusterName != null && ami != null) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("cluster_type", clusterType);
      urlencoded.append("cluster_name", clusterName);
      urlencoded.append("cluster_ami", ami);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch(
        "http://localhost:5000/awsclusterservice/createcluster",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    } else {
      setError("Please check for missing fields");
    }

    props.onPressButton();
    // props.onCreateCluster();
  };

  const getQuickDeploys = () => {
    var quickDeployHeaders = new Headers();
    quickDeployHeaders.append(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    var requestOptions = {
      method: "GET",
      headers: quickDeployHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:5000/quickdeploy/getquickdeploys", requestOptions)
      .then((res) => res.json())
      .then((response) => {
        console.log(typeof response);
        setQuickDeploys(response);
        console.log(response);
      })
      .catch((error) => console.log("error", error));
  };

  React.useEffect(() => {
    getQuickDeploys();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          centered
        >
          <Tab label="Create Cluster" {...a11yProps(0)} />
          <Tab label="Quick Deploy" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div>
          <Typography variant="h6" gutterBottom>
            Enter Cluster Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="standard-adornment-clustername">
                  Cluster Name
                </InputLabel>
                <Input
                  id="standard-adornment-clustername"
                  onChange={setCluster}
                  startAdornment={
                    <InputAdornment position="start">OneHood</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="Username"
                name="Username"
                label="Username"
                onChange={setUser}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl style={{ width: "100%" }}>
                <InputLabel shrink id="cluster-region">
                  Select Region
                </InputLabel>
                <Select
                  labelId="cluster-region-label"
                  id="cluster-region-id"
                  onChange={handleRegion}
                  value="us-east-1"
                >
                  <MenuItem value="us-east-1">US East (N. Virginia)</MenuItem>
                  <MenuItem value="us-east-2">US East (Ohio)</MenuItem>
                  <MenuItem value="ap-south-1">Asia Pacific (Mumbai)</MenuItem>
                  <MenuItem value="us-west-1">US West (N. California)</MenuItem>
                  <MenuItem value="ap-northeast-2">
                    Asia Pacific (Seoul)
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl style={{ width: "100%" }}>
                <InputLabel
                  shrink
                  id="demo-simple-select-placeholder-label-label"
                >
                  Select AMI
                </InputLabel>
                <Select
                  labelId="demo-simple-select-placeholder-label-label"
                  id="demo-simple-select-placeholder-label"
                  value="Select"
                  onChange={handleAmiChange}
                  value="ami-0ff8a91507f77f867"
                >
                  <MenuItem value="ami-0ff8a91507f77f867">
                    Amazon Linux
                  </MenuItem>
                  <MenuItem value="ami-0beafb294c86717a8">
                    Amazon Linux 2
                  </MenuItem>
                  <MenuItem value="ami-0ac80df6eff0e70b5">
                    Ubuntu 18.04 LTS x64
                  </MenuItem>
                  <MenuItem value="ami-0f38562b9d4de0dfe">
                    Windows Server 2019 Base
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl style={{ width: "100%" }}>
                <InputLabel
                  shrink
                  id="demo-simple-select-placeholder-label-label"
                >
                  Select Instance Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-placeholder-label-label"
                  id="demo-simple-select-placeholder-label"
                  onChange={handleClusterTypeChange}
                  value="t2.micro"
                >
                  <MenuItem value="t2.micro">t2.micro</MenuItem>
                  <MenuItem value="t2.small">t2.small</MenuItem>
                  <MenuItem value="t2.medium">t2.medium</MenuItem>
                  <MenuItem value="t3.medium">t3.medium</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
            />
          </Grid> */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    name="saveCluster"
                    value="yes"
                    onChange={handleQuickDeploy}
                  />
                }
                label="Use this configuration for quick deploy"
              />
            </Grid>
            {quickDeployCheck ? (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="standard-adornment-clustername">
                    Deploy Name*
                  </InputLabel>
                  <Input
                    id="standard-adornment-deployname"
                    onChange={handleQuickDeployName}
                  />
                </FormControl>
              </Grid>
            ) : null}

            <Grid item xs={12} container justify="center">
              <Button
                variant="contained"
                color="primary"
                startIcon={<ArrowUpwardIcon />}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
            {/* <Grid item xs={12} sm={6} container justify="center">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<CancelIcon />}
              onClick={this.handleClose}
            >
              Cancel
            </Button>
          </Grid> */}
          </Grid>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Quick Deploy List
        <p>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            onChange={handleQuickDeployChange}
            value="deploy1"
            fullWidth
          >
            {quickDeploys
              ? quickDeploys.Items.map((items) => (
                  <MenuItem key={items.deployname.S} value={items.deployname.S}>
                    {items.deployname.S}
                  </MenuItem>
                ))
              : "fetching data..."}
          </Select>
        </p>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowUpwardIcon />}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </TabPanel>
    </div>
  );
}
