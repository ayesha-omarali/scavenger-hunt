const { uploadFile } = require('./s3Client');
const { 
  recordS3Upload, 
  retrieveTeamUrls, 
  retrieveAllTasks, 
  retrieveTeamCompletedTasks, 
  retrieveTeamPendingTasks,
  retrieveIndividualTask,
  updateCompletedTasks
} = require('./dynamoDbClient');
const randomstring = require("randomstring");

const handleUpload = async (team, data, type, taskId) => {
  const fileType = type === 'video' ? 'mp4' : 'jpg';
  const s3BucketName = `${randomstring.generate()}.${fileType}`;
  const [_, teamUrls] = await Promise.all([
    uploadFile(s3BucketName, data),
    retrieveTeamUrls(team)
  ])

  // Store s3 object urls in dynamo for retrieval
  const urls = (teamUrls && teamUrls.Items[0] && teamUrls.Items[0].urls) || [];
  const fileName = `https://s3-us-west-1.amazonaws.com/ayesha-scavenger-hunt/${s3BucketName}`
  urls.push({ fileName, timestamp: new Date().getTime()});
  await recordS3Upload(team, urls);

  // Update completion of task in dynamo
  const individualTask = await retrieveIndividualTask(taskId);
  const completedTeams = (individualTask && individualTask.Items[0] && individualTask.Items[0].completedTeams) || [];
  const payload = individualTask && individualTask.Items[0];
  completedTeams.push(team);
  payload.completedTeams = completedTeams;
  await updateCompletedTasks(payload)
}

const handleTasks = async (team, completed) => {
  let result;
  if (!team) {
    result = await retrieveAllTasks();
  } else if (completed) {
    result = await retrieveTeamCompletedTasks(team);
  } else {
    result = await retrieveTeamPendingTasks(team);
  }
  return result.Items || [];
}

module.exports = {
  handleTasks,
  handleUpload
}