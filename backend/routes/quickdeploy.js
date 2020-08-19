var express = require("express");
const quickdeploy = require("../../middleware/dynamodb");
const bodyParser = require("body-parser");

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/createquickdeploy", function (req, res, next) {
  if (req.body) {
    quickdeploy
      .createQuickDeploy(
        req.body.deploy_name,
        req.body.region,
        req.body.cluster_ami,
        req.body.cluster_type
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

router.get("/getquickdeploys", function (req, res, next) {
  quickdeploy.getQuickDeploys().then((result) => {
    console.log(result);
    console.log(typeof result);
    res.status(200).json(result);
  });
});

module.exports = router;
