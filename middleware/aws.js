/* Author - Pavan Sreenivasa */
var AWS = require("aws-sdk");
var uuid = require("uuid");

var credentials = new AWS.SharedIniFileCredentials({ profile: "onehood" });
AWS.config.credentials = credentials;

//set region for instance deployment
AWS.config.update({ region: "us-east-1" });
AWS.config.setPromisesDependency();

//create ec2 service object, any further operations with respect to ec2 can be done using this object.
var ec2 = new AWS.EC2({ apiVersion: "2016-11-15" });

async function createInstance(cluster_type, cluster_name, ami_id) {
  var res_data;
  // AMI is amzn-ami-2011.09.1.x86_64-ebs. configuration options for instance.
  var instanceParams = {
    ImageId: ami_id,
    InstanceType: cluster_type,
    MinCount: 1,
    MaxCount: 1,
  };

  // Create a promise on an EC2 service object
  // Handle promise's fulfilled/rejected states
  await ec2
    .runInstances(instanceParams)
    .promise()
    .then(function (data) {
      console.log(data);
      res_data = data;
      var instanceId = data.Instances[0].InstanceId;
      console.log("Created instance", instanceId);
      // Add tags to the instance
      tagParams = {
        Resources: [instanceId],
        Tags: [
          {
            Key: "Name",
            Value: "OneHood_" + cluster_name,
          },
        ],
      };
      // Create a promise on an EC2 service object
      // Handle promise's fulfilled/rejected states
      ec2
        .createTags(tagParams)
        .promise()
        .then(function (data) {
          console.log("Instance tagged");
        })
        .catch(function (err) {
          res_data = err.stack;
          console.error(err, err.stack);
        });
    })
    .catch(function (err) {
      res_data = err.stack;
      console.error(err, err.stack);
    });
  return res_data;
}

async function startInstance(instance_id) {
  var res_data;
  var params = {
    InstanceIds: [instance_id],
    DryRun: false,
  };
  await ec2
    .startInstances(params)
    .promise()
    .then((data) => {
      res_data = data;
    })
    .catch(function (err) {
      res_data = err;
    });
  return res_data;
}

async function stopInstance(instance_id) {
  var params = {
    InstanceIds: [instance_id],
    DryRun: false,
  };
  await ec2
    .stopInstances(params)
    .promise()
    .then((data) => {
      res_data = data;
    })
    .catch(function (err) {
      res_data = err;
    });
  return res_data;
}

async function terminateInstance(instance_id) {
  var params = {
    InstanceIds: [instance_id],
  };
  await ec2
    .terminateInstances(params)
    .promise()
    .then((data) => {
      res_data = data;
    })
    .catch(function (err) {
      res_data = err;
    });
  return res_data;
}

// rebootInstance("i-0734bcb364657b778");

async function rebootInstance(instance_id) {
  var params = {
    InstanceIds: [instance_id],
    // InstancesSet: [instance_id],
    // DryRun: false,
  };

  // Call EC2 to reboot instances
  await ec2
    .rebootInstances(params)
    .promise()
    .then((data) => {
      res_data = data;
    })
    .catch(function (err) {
      res_data = err;
    });
  console.log(res_data);
  return res_data;
}

async function describeInstance() {
  var params = {
    DryRun: false,
  };
  await ec2
    .describeInstances(params)
    .promise()
    .then((data) => {
      res_data = data;
    })
    .catch(function (err) {
      res_data = err;
    });
  return res_data;
}

function describeKeyPairs() {
  ec2.describeKeyPairs(function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", JSON.stringify(data.KeyPairs));
    }
  });
}

AWS.config.getCredentials(function (err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
  }
});

module.exports = {
  startInstance,
  stopInstance,
  createInstance,
  rebootInstance,
  terminateInstance,
  describeKeyPairs,
  describeInstance,
};
