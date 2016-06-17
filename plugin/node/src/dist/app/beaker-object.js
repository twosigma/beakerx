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

var Q = require('q');
var _ = require('lodash');
var util = require('util');
var request = require('request');

var transformation = require('./transformation.js');
var log = require('./logging.js');

module.exports = function (urlBase, ctrlUrlBase, utilUrlBase, auth) {

  var _urlBase = urlBase;
  var _ctrlUrlBase = ctrlUrlBase;
  var _utilUrlBase = utilUrlBase;
  var _auth = auth;
  var _session;

  function doPost(url, form, callback) {
    callback = callback || function (body, error, resolve, reject) {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    };
    return Q.promise(function (resolve, reject) {
      request({
        url: url,
        method: 'POST',
        form: form,
        headers: {
          "Authorization": _auth
        }
      }, function (error, r, body) {
        log('body : ' + util.inspect(body));
        log('error: ' + util.inspect(error));
        callback(body, error, resolve, reject)
      });
    });
  }

  function doGet(url, qs, callback, responseTransformer) {
    callback = callback || function (body, error, resolve, reject) {
        responseTransformer = responseTransformer || defaultReponseTransformer;
        if (error) reject(error);
        resolve(responseTransformer(JSON.parse(body)));
      };
    return Q.Promise(function (resolve, reject) {
      request.get({
        url: url,
        qs: qs,
        headers: {
          "Authorization": auth
        }
      }, function (error, r, body) {
        callback(body, error, resolve, reject);
      });
    });
  }

  function defaultReponseTransformer (response) {
    return response;
  }

  function set4(name, value, unset) {
    var form = addSession({
      name: name,
      sync: true
    });
    if (!unset) {
      form.value = JSON.stringify(value);
    }
    return doPost(_urlBase + '/set', form, function (body, error, resolve, reject) {
      if (body === 'ok') {
        resolve(body);
      } else {
        reject(error || body);
      }
    }).then(function () {
      return value;
    });
  }

  var addSession = function (args) {
    args = args || {};
    _.extend(args, {session: _session});
    return args;
  };

  var evaluationResultsCallback = function (result) {
    return transformation.transformBack(JSON.parse(result));
  };

  var beakerPrototype = {
    setSession: function (session) {
      _session = session;
    },
    get: function (name) {
      return doGet(_urlBase + "/get", addSession({name: name}), null, function (result) {
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
      return doPost(_ctrlUrlBase + "/evaluate", addSession({filter: filter})).then(evaluationResultsCallback);
    },
    evaluateCode: function (evaluator, code) {
      return doPost(_ctrlUrlBase + "/evaluateCode", addSession({evaluator: evaluator, code: code})).then(evaluationResultsCallback);
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
      return doGet(_ctrlUrlBase + "/getEvaluators", addSession());
    },
    getVersion: function () {
      return doGet(_utilUrlBase + "/version", addSession(), function (body, error, resolve, reject) {
        error && reject(error) || resolve(body);
      });
    },
    getVersionNumber: function () {
      return doGet(_utilUrlBase + "/getVersionInfo", addSession(), null, function (result) {
        return result.version;
      });
    },
    getCodeCells: function (filter) {
      return doGet(_ctrlUrlBase + "/getCodeCells", addSession({filter: filter}));
    },
    setCodeCellBody: function (name, body) {
      return doPost(_ctrlUrlBase + "/setCodeCellBody", addSession({name: name, body: body}));
    },
    setCodeCellEvaluator: function (name, evaluator) {
      return doPost(_ctrlUrlBase + "/setCodeCellEvaluator", addSession({name: name, evaluator: evaluator}));
    },
    setCodeCellTags: function (name, tags) {
      return doPost(_ctrlUrlBase + "/setCodeCellTags", addSession({name: name, tags: tags}));
    }
  };

  var BeakerObject = function () {

  };

  BeakerObject.prototype = beakerPrototype;
  
  return new BeakerObject()
};