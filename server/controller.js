const { uploadFile, retrieveFile } = require('./s3Client');
const { recordS3Upload, retrieveTeamUrls } = require('./dynamoDbClient');
const randomstring = require("randomstring");

const handleUpload = async (team, data) => {
  const s3BucketName = `${randomstring.generate()}.jpg`
  const [_, teamUrls] = await Promise.all([
    uploadFile(s3BucketName, data),
    retrieveTeamUrls(team)
  ])
  const urls = (teamUrls && teamUrls.Items[0] && teamUrls.Items[0].urls) || [];
  const fileName = `https://s3-us-west-1.amazonaws.com/ayesha-scavenger-hunt/${s3BucketName}`
  urls.push({ fileName, timestamp: new Date().getTime()});
  await recordS3Upload(team, urls);
}

module.exports = {
  handleUpload
}