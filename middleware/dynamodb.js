// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region

var credentials = new AWS.SharedIniFileCredentials({ profile: "onehood" });
AWS.config.credentials = credentials;
AWS.config.update({ region: "us-east-1" });

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

async function createQuickDeploy(deployname, region, ami, type) {
  var params = {
    TableName: "quickdeploy",
    Item: {
      deployname: { S: deployname },
      region: { S: region },
      ami: { S: ami },
      type: { S: type },
    },
  };

  // Call DynamoDB to add the item to the table
  ddb.putItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
}

async function getQuickDeploys() {
  var res;
  var params = {
    TableName: "quickdeploy",
    // FilterExpression: "#user_status = :user_status_val",
    // ExpressionAttributeNames: {
    //     "#user_status": "user_status",
    // },
    // ExpressionAttributeValues: { ":user_status_val": 'somestatus' }
  };

  await ddb
    .scan(params)
    .promise()
    .then((result) => {
      res = result;
      result.Items.forEach(function (itemdata) {
        // res = itemdata;
        console.log("Item :", JSON.stringify(itemdata));
      });
    });

  console.log("res inside method", res);
  return res;

  // async function onScan(err, data) {
  //   if (err) {
  //     console.error(
  //       "Unable to scan the table. Error JSON:",
  //       JSON.stringify(err, null, 2)
  //     );
  //   } else {
  //     console.log("Scan succeeded.");
  //     data.Items.forEach(function (itemdata) {
  //       res = JSON.stringify(itemdata);
  //       console.log("Item :", ++count, JSON.stringify(itemdata));
  //     });

  //     // continue scanning if we have more items
  //     if (typeof data.LastEvaluatedKey != "undefined") {
  //       console.log("Scanning for more...");
  //       params.ExclusiveStartKey = data.LastEvaluatedKey;
  //       ddb.scan(params, onScan);
  //     }
  //   }
  //   console.log(res);
  //   return res;
  // }
}
getQuickDeploys();

module.exports = {
  createQuickDeploy,
  getQuickDeploys,
};
