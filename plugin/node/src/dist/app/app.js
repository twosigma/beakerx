/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

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
var trycatch = require('trycatch')
var Q = require('q');

var beakerObject = require('./beaker-object.js');
var transformation = require('./transformation.js');
var log = require('./logging.js');

var app = express();
var beakerCorePort = process.env.beaker_core_port;
var urlBase = "http://127.0.0.1:" + beakerCorePort + "/rest/namespace";
var ctrlUrlBase = "http://127.0.0.1:" + beakerCorePort + "/rest/notebookctrl";
var utilUrlBase = "http://127.0.0.1:" + beakerCorePort + "/rest/util";
var auth = "Basic " + new Buffer("beaker:" + process.env.beaker_core_password).toString('base64');

var port = process.argv[2];
var host = process.argv[3];

var shells = {};

console.log('Server Starting'); // important line - PluginServiceLocator determines when node has started by this line in output

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: false})); // to support URL-encoded bodies

app.use(basicauth('beaker', process.env.beaker_plugin_password));

// log.setEnabled(true);

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

function execute(code, shell, response) {
  var evaluationResult = processCode(code, shell);
  Q.when(evaluationResult.evaluation, function (result) {
    if (evaluationResult.processed) {
      response.statusCode = 200;
    } else {
      response.statusCode = 422;
    }
    log('result: ' + util.inspect(result));
    try {
      var transformed;
      if(transformation.isCircularObject(result)) {
        transformed = "ERROR: circular objects are not supported";
      } else {
        transformed = transformation.transform(result);
      }
      response.send(JSON.stringify(transformed));
    } catch (e) {
      response.statusCode = 500;
      response.send(e.message + '\n' + e.stack);
    }
  }, function (error) {
    response.statusCode = 500;
    response.send(error.toString());
  });
}
app.post('/evaluate', function (request, response) {
  var shellID = request.body.shellID;
  var code = decodeURIComponent(request.body.code);
  var shell = shells[shellID];
  if(!shell) {
    response.statusCode = 401;
    response.send('cant find shell ' + shellID);
  }
  trycatch(function () {
    execute(code, shell, response);
  }, function (err) {
    response.statusCode = 500;
    response.send(err.message);
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
    beaker: beakerObject(urlBase, ctrlUrlBase, utilUrlBase, auth)
  };
};