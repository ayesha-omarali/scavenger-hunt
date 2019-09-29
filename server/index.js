require('dotenv').config()

const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 8000;
const cors = require('cors');
const Busboy = require('busboy');
const { handleUpload } = require('./controller');
const { retrieveTeamUrls, retrieveAllTeamUrls } = require('./dynamoDbClient');

app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/upload/:team', (req, res) => {
  const busboy = new Busboy({headers: req.headers});
  let fileData = null;
  busboy.on('file', (_, file) => {
    file.on('data', (data) => {
      if (fileData === null) {
        fileData = data;
      } else {
        fileData = Buffer.concat([fileData, data]);
      }
    });

    file.on('end', async () => {
      try {
        const { team } = req.params;
        await handleUpload(team, fileData)
        res.end();
      } catch(e) {
        console.log(e, "ERRR");
        res.status(500).send(e);
      }
    });
  });
  req.pipe(busboy);
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

app.listen(port, () => console.log(`Listening on port ${port}!`))