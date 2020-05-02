'use strict';

const express = require('express'),
  bodyParser = require('body-parser'),
  // cors = require('cors'),
  mongoose = require('mongoose'),
  config = require(`./server/config/${process.env.NODE_ENV || 'dev'}`);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.mDBConfig || config.dbConfig.connectionString).then(
	() => {console.log('Database is connected') },
	err => { console.log('Can not connect to the database'+ err)}
);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(cors());
const port = process.env.PORT || 80;

// If deployed, display application from the server.
// if(process.env.ENV) {
  // Create link to Angular build directory
  let distDir = __dirname + "/dist/";
  app.use(express.static(distDir));
  app.use('/*', (req, res, next)=>{
    res.sendFile(distDir);
  });
// }

const server = app.listen(port, () => {
	console.log('Listening on port ' + port);
});

server.timeout = 10000;