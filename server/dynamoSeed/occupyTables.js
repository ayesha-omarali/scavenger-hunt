require('dotenv').config()

const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const db = new AWS.DynamoDB();

const { users, tasks } = require('./data');

const occupyUsersTable = () => {
  const _generateUserItem = ({ email, team }) => {
    return {
      PutRequest: {
        Item: {
          "email": { "S": email },
          "team": { "S": team }
        }
      }
    }
  }

  return {
    RequestItems: {
      "users": users.map(_generateUserItem)
    }
  }
}

const occupyTaskTable = () => {
  const _generateTaskItem = ({ id, completedTeams, points, subtitle, text, title }) => {
    return {
      PutRequest: {
        Item: {
          "id": { "N": id },
          "points": { "N": points },
          "completedTeams": { "L": completedTeams },
          "subtitle": { "S": subtitle },
          "text": { "S": text },
          "title": { "S": title }
        }
      }
    }
  }

  return {
    RequestItems: {
      "tasks": tasks.map(_generateTaskItem)
    }
  }
}

[occupyUsersTable(), occupyTaskTable()].forEach(params => {
  db.batchWriteItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  })
});