require('dotenv').config()

const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const db = new AWS.DynamoDB();

var tables = [
  {
    TableName : "s3-uploads"
  },
  {
    TableName: "tasks"
  },
  {
    TableName: "users"
  }
];

tables.forEach(params => {
  db.deleteTable(params, (err, data) => {
    if (err) {
      console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
    }
  })
});