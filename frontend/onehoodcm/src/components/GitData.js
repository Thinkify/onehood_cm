import React, { useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import ImageIcon from "@material-ui/icons/Image";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Radio from "@material-ui/core/Radio";
import clsx from "clsx";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import LinkIcon from "@material-ui/icons/Link";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import CallMergeIcon from "@material-ui/icons/CallMerge";
import { Link as RouterLink } from "react-router-dom";

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function GitData(props) {
  const drawerWidth = 0;

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      // maxWidth: 400,
      backgroundColor: "black",
    },
    card: {
      width: "100%",
      maxWidth: 400,
      backgroundColor: theme.palette.background.paper,
      // backgroundColor: "black",
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: "none",
    },
    title: {
      justifyContent: "flex-start",
      flexGrow: 2,
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
      backgroundColor: "whitesmoke",
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },
    fixedHeight: {
      height: 240,
    },
    pos: {
      marginBottom: 12,
      fontSize: 14,
    },
  }));
  const classes = useStyles();
  const [repos, setRepos] = React.useState();
  const [branches, setBranches] = React.useState();
  const [pulls, setPulls] = React.useState();
  const [selectedRepoIndex, setSelectedRepoIndex] = React.useState(0);
  const [selectedBranchIndex, setSelectedBranchIndex] = React.useState(0);
  const [selectedPullIndex, setSelectedPullIndex] = React.useState(0);
  const [selectedRepoName, setSelectedRepo] = React.useState();
  const [pullId, setSelectedPullId] = React.useState();
  const [pullTitle, setSelectedPullTitle] = React.useState();
  const [pullDesc, setSelectedPullDesc] = React.useState();
  const [pullUrl, setSelectedPullUrl] = React.useState();
  const [user, setUser] = React.useState();
  const [builds, setBuilds] = React.useState();
  const [buildId, setBuildId] = React.useState();
  const [url, setUrl] = React.useState();
  const [status, setStatus] = React.useState();
  const [filteredPulls, setFilteredPulls] = React.useState();
  const [open, setOpen] = React.useState(true);
  const [buildTriggered, setBuildTriggered] = React.useState(0);
  const [buildStatus, setBuildStatus] = React.useState();
  //   const [selectedValue, setSelectedValue] = React.useState();
  const [triggeredBuildId, setTriggeredBuildId] = React.useState();
  const [buildResult, setBuildResult] = React.useState({ pullurl: 0 });
  const [buildState, setBuildState] = React.useState();
  const [buildPullUrl, setBuildPullUrl] = React.useState();
  const [progress, setProgress] = React.useState(0);
  const [mergeDisabled, setMergeDisabled] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (event, index, pull) => {
    setSelectedPullIndex(index);
    setSelectedPullId(pull.id);
    setSelectedPullTitle(pull.title);
    setSelectedPullDesc(pull.body);
    setSelectedPullUrl(pull.html_url);
    setUser(pull.user.login);
  };

  const handleRepoClick = (event, index, reponame) => {
    // console.log(event.target.value);
    setSelectedRepo(reponame);
    setSelectedRepoIndex(index);
    getBranches(reponame);
    getPulls(reponame);

    getBuilds(reponame);
  };

  const handleBranchClick = (event, index, branchName) => {
    // getPulls();
    setSelectedBranchIndex(index);
    setFilteredPulls(pulls.filter((x) => x.head.ref === branchName));
    console.log(pulls);
  };

  const handlePullClick = (event, index, html_url) => {
    setSelectedPullIndex(index);
    window.open(html_url);
  };

  const learnMore = (url) => {
    window.open(url);
  };

  const handleRepo = (event) => {
    getBranches(event.target.value);
    getPulls(event.target.value);
  };

  function getRepos() {
    fetch("https://api.github.com/users/pavantekal/repos")
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setRepos(result);
      })
      .catch((err) => console.log(err.stack));
  }

  function getBranches(repo = "circi_pipeline") {
    fetch("https://api.github.com/repos/pavantekal/" + repo + "/branches")
      .then((res) => res.json())
      .then((result) => {
        // console.log("branche", result);
        setBranches(result);
      })
      .catch((err) => console.log(err.stack));
  }

  function getPulls(repo = "sample_travis") {
    fetch("https://api.github.com/repos/pavantekal/" + repo + "/pulls")
      .then((res) => res.json())
      .then((result) => {
        // console.log("branche", result);
        setPulls(result);
        setFilteredPulls(result);
      })
      .catch((err) => console.log(err.stack));
  }

  async function getBuilds(repo = "sample_travis") {
    console.log(repo);
    await fetch(
      "https://api.travis-ci.org/repos/pavantekal/" + repo + "/builds"
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setBuilds(result);
        console.log(builds);
      })
      .catch((err) => console.log(err.stack));
  }

  async function getBuildData(build_id) {
    var res;
    await fetch("https://api.travis-ci.org/builds/" + build_id)
      .then((res) => res.json())
      .then((result) => {
        res = result;
        setUrl(result.compare_url);
      })
      .catch((err) => console.log(err.stack));
    return res;
  }

  function compareUrl(gitUrl, travisUrl) {
    if (gitUrl === travisUrl) return true;
    else return false;
  }

  async function restartBuild(build_id) {
    var response;
    var formdata = new FormData();
    formdata.append("access_token", "gFwjZy1fuqB5THUd3BPsRQ");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      "https://api.travis-ci.org/builds/" + build_id + "/restart",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        response = result;
      })
      .catch((error) => console.log("error", error));
    return response;
  }

  const triggerBuild = (pullUrl) => {
    setBuildPullUrl(pullUrl);
    builds.forEach((build) => {
      getBuildData(build.id).then((response) => {
        if (compareUrl(pullUrl, response.compare_url)) {
          restartBuild(build.id);
          console.log(buildTriggered);
          getTestStatusInterval(build.id);
          return;
        }
      });
    });
  };

  async function getTestStatus() {
    console.log(
      "Triggered build id inside testStatusmethiod",
      triggeredBuildId
    );
    let buildResult, buildState, url;
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      "https://api.travis-ci.org/builds/" + triggeredBuildId,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        buildState = res.state;
        buildResult = res.result;
        url = res.compare_url;
        console.log(buildState, buildResult);
        return [buildState, buildResult];
      })
      .catch((error) => console.log("error", error));
    return [buildState, buildResult, url];
  }

  React.useEffect(() => {
    getRepos();
    getBranches();
  }, []);

  React.useEffect(() => {
    let intervalId, buildStatus;
    if (buildTriggered) {
      console.log("inside buildtriggered interval running", triggeredBuildId);
      intervalId = setInterval(async () => {
        buildStatus = await getTestStatus();
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 20 : prevProgress + 20
        );
        setBuildState(buildStatus[0]);
        console.log("BuildStatus", buildStatus[0]);
        console.log("BuildResult", buildStatus[1]);
        if (buildStatus[0] === "finished") {
          // setBuildPullUrl(null);
          if (buildStatus[1] === 0) setMergeDisabled(false);
          setProgress(100);
          setBuildResult(buildStatus[1]);
          setBuildTriggered(0);
        }
      }, 30000);
    } else {
      clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [buildTriggered]);

  function getTestStatusInterval(buildId) {
    console.log("build_id", buildId);
    setTriggeredBuildId(buildId);
    setBuildTriggered(1);
  }
  return (
    <div
      className={classes.root}
      // style={{
      //   display: "flex",
      //   justifyContent: "flex-start",
      //   backgroundColor: "black",
      // }}
    >
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <RouterLink
            to="/clustermanagement"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="go back"
              // onClick={handleDrawerOpen}
              // className={clsx(
              //   classes.menuButton,
              //   open && classes.menuButtonHidden
              // )}
            >
              <ArrowBackIcon />
            </IconButton>
          </RouterLink>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            OneHood
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <div>
                <strong> Repositories </strong>
              </div>
              <List
                component="nav"
                aria-label="secondary mailbox folder"
                style={{ backgroundColor: "whitesmoke", color: "black" }}
              >
                {repos
                  ? repos.map((repo, index) => (
                      <ListItem
                        button
                        selected={selectedRepoIndex === index}
                        onClick={(event) =>
                          handleRepoClick(event, index, repo.name)
                        }
                      >
                        <ListItemText
                          key={index}
                          primary={repo.name}
                          value={repo.name}
                        />
                      </ListItem>
                    ))
                  : "Fetching data..."}
              </List>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div>
                <strong>Branches</strong>
              </div>
              <List>
                {branches
                  ? branches.map((branch, index) => (
                      <ListItem
                        button
                        selected={selectedBranchIndex === index}
                        onClick={(event) =>
                          handleBranchClick(event, index, branch.name)
                        }
                      >
                        <ListItemText
                          key={index}
                          primary={branch.name}
                          value={branch.name}
                        />
                      </ListItem>
                    ))
                  : "fetching data..."}
              </List>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div>
                <strong>Pulls</strong>
              </div>
              {/* <List
                component="nav"
                aria-label="secondary mailbox folder"
                style={{ backgroundColor: "white", color: "black" }}
              > */}
              {filteredPulls
                ? filteredPulls.map((pull, index) => (
                    <Card
                      key={index}
                      className={classes.card}
                      variant="outlined"
                    >
                      <CardContent>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          {pull.id}
                        </Typography>
                        <Typography variant="h6" component="h2">
                          {pull.title}
                        </Typography>
                        <Typography
                          className={classes.pos}
                          color="textSecondary"
                        >
                          {pull.created_at.substring(0, 10) +
                            " / " +
                            // date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
                            pull.user.login}
                        </Typography>
                        <div style={{ width: "100%", paddingRight: 5 }}>
                          <Typography variant="body2" component="p">
                            {pull.body}
                          </Typography>
                        </div>
                        {/* {buildStatus ? (
                          <div>
                            <Typography variant="body2" component="p">
                              Test Status - Failed
                            </Typography>
                          </div>
                        ) : (
                          <div>
                            <Typography variant="body2" component="p">
                              Test Status - Passed
                            </Typography>
                          </div>
                        )} */}
                        <Button
                          style={{ fontSize: 12 }}
                          size="small"
                          startIcon={<LinkIcon />}
                          onClick={() => learnMore(pull.html_url)}
                        >
                          Learn More
                        </Button>
                        {buildPullUrl === pull.html_url ? (
                          <div>
                            <LinearProgressWithLabel value={progress} />
                            <Typography variant="body2" component="p">
                              Test Status : {buildState}
                            </Typography>
                            <Typography variant="body2" component="p">
                              Test Result :
                              {buildState === "finished"
                                ? buildResult === 0
                                  ? "PASSED"
                                  : "FAILED"
                                : "AWAITING"}
                            </Typography>
                          </div>
                        ) : null}
                      </CardContent>
                      <CardActions>
                        <Button
                          style={{ fontSize: 12 }}
                          size="small"
                          variant="contained"
                          color={"primary"}
                          startIcon={<AssignmentTurnedInIcon />}
                          onClick={() => triggerBuild(pull.html_url)}
                          disabled={
                            buildPullUrl === pull.html_url ? true : false
                          }
                        >
                          {buildPullUrl === pull.html_url && buildTriggered ? (
                            <div>
                              Running Tests
                              <CircularProgress size={15} />
                            </div>
                          ) : (
                            "Run Tests"
                          )}
                        </Button>

                        {/* {buildPullUrl === pull.html_url && buildTriggered ? (
                          <CircularProgress size={15} />
                        ) : null} */}
                        <Button
                          style={{ fontSize: 12 }}
                          size="small"
                          variant="contained"
                          color="primary"
                          startIcon={<ImageIcon />}
                          //   onClick={handleSubmit}
                        >
                          Create AMI
                        </Button>

                        {buildPullUrl === pull.html_url ? (
                          <Button
                            style={{ fontSize: 12 }}
                            size="small"
                            variant="contained"
                            color={buildResult === 1 ? "secondary" : "primary"}
                            // style={{
                            //   backgroundColor: "green",
                            //   color: "white",
                            // }}
                            disabled={mergeDisabled}
                            startIcon={<CallMergeIcon />}
                            //   onClick={handleSubmit}
                          >
                            Merge PR
                          </Button>
                        ) : null}
                      </CardActions>
                    </Card>
                  ))
                : "Fetching Data..."}
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
