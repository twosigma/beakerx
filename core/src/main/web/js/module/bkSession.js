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
/**
 * M_bkSession
 * This module owns the services of communicating to the session backup end point to load and
 * upload(backup) a session.
 */
(function() {
  'use strict';
  var module = angular.module('M_bkSession', ['M_bkUtils']);
  /**
   * bkSession
   * - talks to beaker server (/beaker/rest/session)
   * - bkUtil should depend on it to update/backup bkBaseSessionModel
   */
  module.factory('bkSession', function($http, $q, bkUtils) {
    var backupSession = function(sessionData) {
      var sessionID = sessionData.sessionid;
      if (!sessionID) {
        return;
      }
      bkUtils.httpPost("/beaker/rest/session-backup/backup", sessionData).
          success(function(data) {
            console.log("backup ", sessionID);
          }).
          error(function(data, status) {
            console.error("Failed to backup session: " + sessionID + ", " + status);
          });
    };
    var getSessions = function() {
      var deferred = $q.defer();
      bkUtils.httpGet("/beaker/rest/session-backup/getExistingSessions").
          success(function(sessions) {
            deferred.resolve(sessions);
          }).
          error(function(data, status, headers, config) {
            deferred.reject("Failed to get existing sessions " + status);
          });
      return deferred.promise;
    };
    var loadSession = function(sessionID) {
      var deferred = $q.defer();
      bkUtils.httpGet("/beaker/rest/session-backup/load", {sessionid: sessionID}).
          success(function(session, status) {
            deferred.resolve(session);
          }).
          error(function(data, status, headers, config) {
            deferred.reject("Failed to load session: " + sessionID + ", " + status);
          });
      return deferred.promise;
    };
    var closeSession = function(sessionID) {
      var deferred = $q.defer();
      bkUtils.httpPost("/beaker/rest/session-backup/close", {sessionid: sessionID}).
          success(function(ret) {
            deferred.resolve(sessionID);
          }).
          error(function(data, status, headers, config) {
            deferred.reject("Failed to close session: " + sessionID + ", " + status);
          });
      return deferred.promise;
    };
    var recordLoadedPlugin = function(pluginName, pluginUrl) {
      bkUtils.httpPost(
          "/beaker/rest/session-backup/addPlugin",
          {pluginname: pluginName, pluginurl: pluginUrl}).
          success(function(ret) {
            //console.log("recordLoadedPlugin");
          }).
          error(function(data, status, headers, config) {
            console.error("Failed to add plugin, " + pluginName + ", " + pluginUrl + ", " + status);
          });
    };
    var getPlugins = function() {
      var deferred = $q.defer();
      bkUtils.httpGet("/beaker/rest/session-backup/getExistingPlugins", {}).
          success(function(plugins) {
            deferred.resolve(plugins);
          }).
          error(function(data, status, headers, config) {
            deferred.reject("Failed to get existing plugins, " + status);
          });
      return deferred.promise;
    };
    return {
      getSessions: getSessions,
      loadSession: loadSession,
      backupSession: backupSession,
      closeSession: closeSession,
      recordLoadedPlugin: recordLoadedPlugin,
      getPlugins: getPlugins
    };
  });
})();
