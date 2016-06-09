'use strict';

var util = require('util');
var express = require('express');
var bodyParser = require('body-parser');
var basicauth = require('basicauth-middleware');
var http = require('http');
var uuid = require('node-uuid');
var vm = require('vm');
var request = require('request');
var Buffer = require('buffer').Buffer;
var Q = require('q');

var beakerObject = require('./beaker-object.js');
var transformation = require('./transformation.js');

var app = express();
var beakerCorePort = process.env.beaker_core_port;
var urlBase = "http://127.0.0.1:" + beakerCorePort + "/rest/namespace";
var ctrlUrlBase = "http://127.0.0.1:" + beakerCorePort + "/rest/notebookctrl";
var auth = "Basic " + new Buffer("beaker:" + process.env.beaker_core_password).toString('base64');

var port = process.argv[2];
var host = process.argv[3];

var shells = {};

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: false})); // to support URL-encoded bodies

app.use(basicauth('beaker', process.env.beaker_plugin_password));

// route for testing service is alive
app.get('/pulse', function (request, response) {
  response.send('node server is running');
});

app.post('/shell', function (request, response) {
  var shellID = uuid.v4();
  shells[shellID] = {
    context: new vm.createContext(createSandbox(shellID))
  };
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({'shellID': shellID}));
});

app.post('/session', function (request, response) {
  var shellID = request.body.shellID;
  var session = request.body.session;
  var shell = shells[shellID];
  shell.context.setSession(session);
  response.send('ok');
});

app.post('/evaluate', function (request, response) {
  var shellID = request.body.shellID;
  var code = decodeURIComponent(request.body.code);
  if(!shells[shellID]) {
    response.statusCode = 401;
    response.send('cant find shell ' + shellID);
  }
  var evaluationResult = processCode(code, shells[shellID]);
  Q.when(evaluationResult.evaluation, function (result) {
    if (evaluationResult.processed) {
      response.statusCode = 200;
    } else {
      response.statusCode = 422;
    }
    var transformed = transformation.transform(result);
    response.send(JSON.stringify(transformed));
  }, function (error) {
    response.statusCode = 401;
    response.send(error.toString());
  });
});

app.post('/add-module-path', function (request, response) {
  var pathParam = decodeURIComponent(request.body.path);
  pathParam.split('\n').forEach(function (eachPath) {
    require('app-module-path').addPath(eachPath);
  });
  response.send('ok');
});

app.listen(port, host);

function processCode(code, shell) {
  var returnValue;
  var result;
  try {
    result = vm.runInContext(code, shell.context);
    if (typeof result === "undefined") {
      result = 'undefined';
    }
    returnValue = {
      evaluation: result,
      processed: true
    };
  } catch (e) {
    returnValue = {
      evaluation: 'Error: ' + e.message + '\n' + e.stack,
      processed: false
    };
  }
  return returnValue;
}

var createSandbox = function () {
  return {
    require: require,
    http: http,
    Q: Q,

    DataFrame: require('./transformation.js').DataFrame,

    setSession: function (v) {
      this.beaker.setSession(v);
    },
    beaker: beakerObject(urlBase, ctrlUrlBase, auth)
  };
};