require('dotenv').config()

const bluebird = require('bluebird');
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Promisify the SDK
AWS.config.setPromisesDependency(bluebird);

const db = new AWS.DynamoDB.DocumentClient();

const recordS3Upload = (team, urls) => {
  const params = {
    TableName: 's3-uploads',
    Item: {
      team,
      urls
    }
  }
  return db.put(params).promise();
}

const retrieveTeamUrls = (team) => {
  const params = {
    TableName: 's3-uploads',
    KeyConditionExpression: 'team = :i',
    ExpressionAttributeValues: {
      ':i': team
    }
  }
  return db.query(params).promise();
}

const retrieveAllTeamUrls = () => {
  const params = {
    TableName: 's3-uploads',
  }
  return db.scan(params).promise();
}

module.exports = {
  recordS3Upload,
  retrieveTeamUrls,
  retrieveAllTeamUrls
}