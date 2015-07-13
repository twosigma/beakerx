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

module.exports = (function() {
  var http = require('http');
  var events = require('events');
  var qs = require('querystring');

  var emitter = new events.EventEmitter();

  http.createServer(function(request, response) {
    if (request.method === 'GET') {
      if (request.url === '/version') {
        console.log('Got version req');
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('Electron');
        response.end();
      }
    } else if (request.method === 'POST') {
      if (request.url === '/openFile') {
        var body = '';
        request.on('data', function(data) {
          body += data;
          if (body.length > '1000') {
            response.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/html'});
            response.end('413: Request Entity Too Large');
          }
        });
        request.on('end', function() {
          console.log('here: opening at: ' + qs.parse(body)['path']);
          emitter.emit('open-file', qs.parse(body)['path']);
        });
      }
    }
  }).listen(3001);

  return emitter;
})();
