var express = require('express');
var router = express.Router();
const aws = require('../../aws');
/* GET home page. */
router.get('/startcluster/:cluster_id', function (req, res, next) {
    if (req.params.cluster_id == null || req.params.cluster_id == "") {
        res.status(400).json({ "Status": "Request failure", "Message": "Missing cluster ID" })
    } else {
        aws.startInstance(req.params.cluster_id).then((aws_response) => {
            console.log("Aws response", aws_response);
            res.status(200).json(aws_response);
        });
    }

});

router.get('/stopcluster/:cluster_id', function (req, res, next) {
    if (req.params.cluster_id == null || req.params.cluster_id == "") {
        res.status(400).json({ "Status": "Request failure", "Message": "Missing cluster ID" })
    } else {
        aws.stopInstance(req.params.cluster_id).then((aws_response) => {
            console.log("Aws response", aws_response);
            res.status(200).json(aws_response);
        })
    }
})

router.get('/rebootcluster/:cluster_id', function (req, res, next) {
    if (req.params.cluster_id == null || req.params.cluster_id == "") {
        res.status(400).json({ "Status": "Request failure", "Message": "Missing cluster ID" })
    } else {
        aws.rebootInstance(req.params.cluster_id).then((aws_response) => {
            console.log("Aws response", aws_response);
            res.status(200).json(aws_response);
        })
    }
})

router.get('/describeclusters', function (req, res, next) {
    if (req.params.cluster_id == null || req.params.cluster_id == "") {
        res.status(400).json({ "Status": "Request failure", "Message": "Missing cluster ID" })
    } else {
        aws.describeInstance().then((aws_response) => {
            console.log("Aws response", aws_response);
            res.status(200).json(aws_response);
        })
    }
})

module.exports = router;