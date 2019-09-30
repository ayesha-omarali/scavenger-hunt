require('dotenv').config()

const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const db = new AWS.DynamoDB();

const userTableParams = {
  AttributeDefinitions: [
    {
      AttributeName: 'email',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'email',
      KeyType: 'HASH'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  },
  TableName: 'users',
  StreamSpecification: {
    StreamEnabled: false
  }
};

const s3TableParams = {
  AttributeDefinitions: [
    {
      AttributeName: 'team',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'team',
      KeyType: 'HASH'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  },
  TableName: 's3-uploads',
  StreamSpecification: {
    StreamEnabled: false
  }
};

const taskTableParams = {
  AttributeDefinitions: [
    {
      AttributeName: 'id',
      AttributeType: 'N'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'id',
      KeyType: 'HASH'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  },
  TableName: 'tasks',
  StreamSpecification: {
    StreamEnabled: false
  }
};


[userTableParams, s3TableParams, taskTableParams].forEach((params) => {
  db.createTable(params, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Table Created", data);
    }
  })
});

