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

const retrieveTeamUrls = team => {
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

const retrieveAllTasks = () => {
  const params = {
    TableName: 'tasks'
  }
  return db.scan(params).promise();
}

const retrieveTeamCompletedTasks = team => {
  const params = {
    TableName: 'tasks',
    FilterExpression: "contains(completedTeams, :team)",
    ExpressionAttributeValues : {   
      ':team' : team,
    }
  }
  return db.scan(params).promise();
}

const retrieveTeamPendingTasks = team => {
  const params = {
    TableName: 'tasks',
    FilterExpression: "NOT contains(completedTeams, :team)",
    ExpressionAttributeValues : {   
      ':team' : team,
    }
  }
  return db.scan(params).promise();
}

const retrieveIndividualTask = id => {
  const params = {
    TableName: 'tasks',
    KeyConditionExpression: 'id = :i',
    ExpressionAttributeValues: {
      ':i': Number(id)
    }
  }
  return db.query(params).promise();
}

const retrieveUserTeam = email => {
  const params = {
    TableName: 'users',
    KeyConditionExpression: 'email = :i',
    ExpressionAttributeValues: {
      ':i': email
    }
  }
  return db.query(params).promise();
}

const updateCompletedTasks = ({id, ...payload}) => {
  console.log("IN UPDATE");
  console.log(payload, "PAYLOAD");
  const params = {
    TableName: 'tasks',
    Item: {
      id: Number(id),
      ...payload
    }
  }
  return db.put(params).promise();
}

module.exports = {
  recordS3Upload,
  retrieveTeamUrls,
  retrieveAllTeamUrls,
  retrieveAllTasks,
  retrieveIndividualTask,
  retrieveTeamCompletedTasks,
  retrieveTeamPendingTasks,
  retrieveUserTeam,
  updateCompletedTasks
}