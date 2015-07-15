/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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

module.exports = function(ipcPort) {
  console.log('ipcport is ' + ipcPort);
  // var http = require('http');
  var events = require('events');
  // var qs = require('querystring');
  var express = require('express');
  var bodyParser = require('body-parser');
  var app = express();

  process.on('uncaughtException', function(err) {
    if (err.errno === 'EADDRINUSE') {
      console.log('Electron port ' + ipcPort + ' taken. Please free this port.');
    } else {
      console.log(err);
      process.exit(1);
    }
  });

  var emitter = new events.EventEmitter();

  app.use(bodyParser.urlencoded({extended: false}));
  console.log('Using port ' + (ipcPort || 3000) + 'for main thread IPC');
  app.set('port', ipcPort || 3000);
  app.listen(ipcPort || 3000);

  app.post('/open-files', function(request, response) {
    response.end('Electron success!');
    emitter.emit('open-files', JSON.parse(request.body.paths));
  })

  return emitter;
};
