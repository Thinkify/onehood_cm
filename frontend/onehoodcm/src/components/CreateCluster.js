import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
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

export default function CreateCluster() {
  const [clusterName, setClusterName] = useState();
  const [ami, setAmi] = useState();
  const [userName, setUserName] = useState();
  const [clusterType, setClusterType] = useState();
  const [region, setRegion] = useState();
  const [error, setError] = useState();
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

  const handleSubmit = () => {
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
  };

  return (
    <React.Fragment>
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
              displayEmpty
            >
              <MenuItem value="us-east-1">US East (N. Virginia)</MenuItem>
              <MenuItem value="us-east-2">US East (Ohio)</MenuItem>
              <MenuItem value="ap-south-1">Asia Pacific (Mumbai)</MenuItem>
              <MenuItem value="us-west-1">US West (N. California)</MenuItem>
              <MenuItem value="ap-northeast-2">Asia Pacific (Seoul)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl style={{ width: "100%" }}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Select AMI
            </InputLabel>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              onChange={handleAmiChange}
              displayEmpty
            >
              <MenuItem value="ami-0ff8a91507f77f867">Amazon Linux</MenuItem>
              <MenuItem value="ami-0beafb294c86717a8">Amazon Linux 2</MenuItem>
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
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Select Instance Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              onChange={handleClusterTypeChange}
              displayEmpty
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
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this configuration for quick deploy"
          />
        </Grid>
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
    </React.Fragment>
  );
}
