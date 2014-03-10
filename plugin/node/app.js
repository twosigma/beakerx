var express = require('express');
var http = require('http');
var uuid = require('node-uuid');

var app = express();
var port = process.argv[2];
var host = process.argv[3];

console.log('Server Starting')

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


// route for testing service is alive
app.get('/pulse', function(request, response){
    response.send('node server is running');
});

app.post('/shell', function(request, response){
    returnObject = {'shellID':uuid.v4()};
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify(returnObject));
});

app.post('/evaluate', function(request, response){
    shellID = request.body.shellID;
    code =  decodeURIComponent(request.body.code);
    response.send(processCode(code));
});

function processCode(code) {
    'use strict';
    try {
        return (eval(code)).toString();
    } catch (e) {
        return 'Error: ' + e.message;
    }
}

app.listen(port, host);
