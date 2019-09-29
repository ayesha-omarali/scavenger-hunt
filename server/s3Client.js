require('dotenv').config()

const bluebird = require('bluebird');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Promisify the SDK
AWS.config.setPromisesDependency(bluebird);

const s3 = new AWS.S3();

const clientFactory = ({file: Key, data: Body, isUpload = false}) => {
  return s3.putObject({
    Bucket: 'ayesha-scavenger-hunt',
    Key,
    ...(isUpload ? { Body } : {})
  }).promise()
}

const uploadFile = (file, data) => {
  return clientFactory({file, data, isUpload: true})
}

const retrieveFile = (file) => {
  return clientFactory({ file })
}

module.exports = {
  uploadFile,
  retrieveFile
}

