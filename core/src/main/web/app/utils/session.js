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
 * Module bk.session
 * This module owns the services of communicating to the session backup end point to load and
 * upload(backup) a session.
 */
(function() {
  'use strict';
  var module = angular.module('bk.session', ['bk.utils']);
  /**
   * bkSession
   * - talks to beaker server (/beaker/rest/session)
   * - bkSessionManager should depend on it to update/backup the session model
   */
  module.factory('bkSession', function(bkUtils) {
    var backupSession = function(sessionId, sessionData) {
      var deferred = bkUtils.newDeferred();
      bkUtils.httpPost(bkUtils.serverUrl("beaker/rest/session-backup/backup/" + sessionId), sessionData)
          .success(function(data) {
            deferred.resolve();
          })
          .error(function(data, status) {
            console.error("Failed to backup session: " + sessionId + ", " + status);
            deferred.reject("Failed to backup session: " + sessionId + ", " + status);
          });
      return deferred.promise;
    };
    var getSessions = function() {
      var deferred = bkUtils.newDeferred();
      bkUtils.httpGet(bkUtils.serverUrl("beaker/rest/session-backup/getExistingSessions"))
          .success(function(sessions) {
            deferred.resolve(sessions);
          })
          .error(function(data, status, headers, config) {
            deferred.reject("Failed to get existing sessions " + status);
          });
      return deferred.promise;
    };
    var loadSession = function(sessionId) {
      var deferred = bkUtils.newDeferred();
      bkUtils.httpGet(bkUtils.serverUrl("beaker/rest/session-backup/load"), {sessionid: sessionId})
          .success(function(session, status) {
            deferred.resolve(session);
          })
          .error(function(data, status, headers, config) {
            deferred.reject("Failed to load session: " + sessionId + ", " + status);
          });
      return deferred.promise;
    };
    var closeSession = function(sessionId) {
      var deferred = bkUtils.newDeferred();
      bkUtils.httpPost(bkUtils.serverUrl("beaker/rest/session-backup/close"), {sessionid: sessionId})
          .success(function(ret) {
            deferred.resolve(sessionId);
          })
          .error(function(data, status, headers, config) {
            deferred.reject("Failed to close session: " + sessionId + ", " + status);
          });
      return deferred.promise;
    };
    var recordLoadedPlugin = function(pluginName, pluginUrl) {
      bkUtils.httpPost(
          bkUtils.serverUrl("beaker/rest/session-backup/addPlugin"),
          {pluginname: pluginName, pluginurl: pluginUrl})
          .success(function(ret) {
            //console.log("recordLoadedPlugin");
          })
          .error(function(data, status, headers, config) {
            console.error("Failed to add plugin, " + pluginName + ", " + pluginUrl + ", " + status);
          });
    };
    var getPlugins = function() {
      var deferred = bkUtils.newDeferred();
      bkUtils.httpGet(bkUtils.serverUrl("beaker/rest/session-backup/getExistingPlugins"), {})
          .success(function(plugins) {
            deferred.resolve(plugins);
          })
          .error(function(data, status, headers, config) {
            deferred.reject("Failed to get existing plugins, " + status);
          });
      return deferred.promise;
    };
    return {
      getSessions: getSessions,
      load: loadSession,
      backup: backupSession,
      close: closeSession,
      recordLoadedPlugin: recordLoadedPlugin,
      getPlugins: getPlugins
    };
  });
})();
