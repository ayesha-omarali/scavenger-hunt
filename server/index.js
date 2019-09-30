require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = 8000;
const storage = multer.memoryStorage()
const upload = multer({ storage })
const { handleUpload, handleTasks } = require('./controller');
const { retrieveTeamUrls, retrieveAllTeamUrls, retrieveUserTeam } = require('./dynamoDbClient');

app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/upload/:type/:team/:taskId', upload.single('file'), async (req, res) => {
  const { team, type, taskId } = req.params;
  const { buffer } = req.file;
  try {
    handleUpload(team, buffer, type, taskId);
    return res.send();
  } catch(e) {
    console.log(e, "ERRRR");
    return res.status(500).send(e);
  }
  
})

app.get('/urls', async (req, res) => {
  const { team } = req.query;
  const response = [];
  const teamUrls = await (team ? retrieveTeamUrls(team) : retrieveAllTeamUrls());

  teamUrls.Items.forEach(({ urls, team }) => urls.forEach(url => {
    url.team = team;
    response.push(url)
  }));
  res.send(response.sort((a, b) => a.timestamp < b.timestamp));
})

app.get('/tasks', async (req, res) => {
  const { team, completed } = req.query;
  const result = await handleTasks(team, completed);
  res.send(result);
})

app.get('/userTeam', async (req, res) => {
  const { email } = req.query;
  if (!email) {
    res.status(404).send("Query must include email address");
  }
  const result = await retrieveUserTeam(email);
  res.send(result.Items[0] && result.Items[0].team);
})

app.listen(port, () => console.log(`Listening on port ${port}!`))