const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');

// Lambda functions
const install = require('./handler');
const fileUpload = require('./fileUpload');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

app.post('/installed', function(req, res) {
    install.installed(req, null, (err, r) => res.send(r));
})

app.post('/fileUploaded', function(req, res) {
    fileUpload.fileReceived(req, null, (err, r) => res.send(r));
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))