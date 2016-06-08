var Q = require('q');
var _ = require('lodash');
var util = require('util');
var request = require('request');

var transformation = require('./transformation.js');

module.exports = function (urlBase, ctrlUrlBase, auth) {

  var _urlBase = urlBase;
  var _ctrlUrlBase = ctrlUrlBase;
  var _auth = auth;
  var _session;

  function doPost(url, form) {
    console.log('url : ' + url);
    console.log('form: ' + util.inspect(form));
    return Q.promise(function (resolve, reject) {
      request({
        url: url,
        method: 'POST',
        form: form,
        headers: {
          "Authorization": _auth
        }
      }, function (error, r, body) {
        console.log(error);
        console.log(body);
        if (body === 'ok') resolve('');
        reject();
      });
    });
  }

  function doGet(url, qs, responseTransformer) {
    console.log('url: ' + url);
    console.log('qs : ' + util.inspect(qs));
    responseTransformer = responseTransformer || defaultReponseTransformer;
    return Q.Promise(function (resolve, reject) {
      request.get({
        url: url,
        qs: qs,
        headers: {
          "Authorization": auth
        }
      }, function (error, r, body) {
        console.log(error);
        console.log(body);
        if (error) reject(error);
        var result = JSON.parse(body);
        resolve(responseTransformer(result));
      });
    });
  }

  function defaultReponseTransformer (response) {
    return response ? response.value : undefined;
  }

  function set4(name, value, unset) {
    var form = addSession({
      name: name,
      sync: true
    });
    if (!unset) {
      form.value = JSON.stringify(value);
    }
    return doPost(_urlBase + '/set', form).then(function () {
      return value;
    });
  }

  var addSession = function (args) {
    _.extend(args, {session: _session});
    return args;
  };

  var beakerPrototype = {
    setSession: function (session) {
      _session = session;
    },
    get: function (name) {
      return doGet(_urlBase + "/get", addSession({name: name}), function (result) {
        var mapped = transformation.transformBack(result);
        return mapped ? mapped.value : mapped;
      });
    },
    set: function (name, value) {
      return set4(name, transformation.transform(value), false);
    },
    unset: function (name) {
      return set4(name, null, true);
    },
    evaluate: function (filter) {
      return doPost(_ctrlUrlBase + "/evaluate", addSession({filter: filter}));
    },
    evaluateCode: function (evaluator, code) {
      return doPost(_ctrlUrlBase + "/evaluateCode", addSession({evaluator: evaluator, code: code}));
    },
    showStatus: function (msg) {
      return doPost(_ctrlUrlBase + "/showStatus", addSession({msg: msg}));
    },
    clearStatus: function (msg) {
      return doPost(_ctrlUrlBase + "/clearStatus", addSession({msg: msg}));
    },
    showTransientStatus: function (msg) {
      return doPost(_ctrlUrlBase + "/showTransientStatus", addSession({msg: msg}));
    },
    getEvaluators: function () {
      return doGet(_ctrlUrlBase + "/getEvaluators", addSession({}), function (result) { return result; });
    }
  };

  var BeakerObject = function () {

  };

  BeakerObject.prototype = beakerPrototype;
  
  return new BeakerObject()
};