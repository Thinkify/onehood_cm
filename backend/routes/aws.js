var express = require("express");
const bodyParser = require("body-parser");
const aws = require("../../middleware/aws");

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.post("/createcluster", function (req, res, next) {
  if (req.body) {
    console.log(
      req.body.cluster_type,
      req.body.cluster_name,
      req.body.cluster_ami
    );
    aws
      .createInstance(
        req.body.cluster_type,
        req.body.cluster_name,
        req.body.cluster_ami
      )
      .then((aws_response) => {
        console.log("Aws response", aws_response);
        res.status(200).json(aws_response);
      });
  } else {
    res.status(412).json({
      Message:
        "The pre condition given in the request evaluated to false by the server.",
    });
  }
});

router.get("/startcluster/:cluster_id", function (req, res, next) {
  if (req.params.cluster_id) {
    aws.startInstance(req.params.cluster_id).then((aws_response) => {
      console.log("Aws response", aws_response);
      res.status(200).json(aws_response);
    });
  } else {
    res.status(412).json({
      Message:
        "The pre condition given in the request evaluated to false by the server.",
    });
  }
});

router.get("/stopcluster/:cluster_id", function (req, res, next) {
  if (req.params.cluster_id) {
    aws.stopInstance(req.params.cluster_id).then((aws_response) => {
      console.log("Aws response", aws_response);
      res.status(200).json(aws_response);
    });
  } else {
    res.status(412).json({
      Message:
        "The pre condition given in the request evaluated to false by the server.",
    });
  }
});

router.get("/terminatecluster/:cluster_id", function (req, res, next) {
  if (req.params.cluster_id) {
    aws
      .terminateInstance(String(req.params.cluster_id))
      .then((aws_response) => {
        console.log("Aws response", aws_response);
        res.status(200).json(aws_response);
      });
  } else {
    res.status(412).json({
      Message:
        "The pre condition given in the request evaluated to false by the server.",
    });
  }
});

router.get("/rebootcluster/:cluster_id", function (req, res, next) {
  if (req.params.cluster_id) {
    aws.rebootInstance(String(req.params.cluster_id)).then((aws_response) => {
      console.log("Aws response", aws_response);
      res.status(200).json(aws_response);
    });
  } else {
    res.status(412).json({
      Message:
        "The pre condition given in the request evaluated to false by the server.",
    });
  }
});

router.get("/describeclusters", function (req, res, next) {
  aws.describeInstance().then((aws_response) => {
    console.log("Aws response", aws_response);
    res.status(200).json(aws_response);
  });
});

module.exports = router;
