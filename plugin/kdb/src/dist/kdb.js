/**
 * Kdb evaluator plugin.
 */
define(function(require, exports, module) {
  'use strict';
  var PLUGIN_NAME = "kdb";
  var COMMAND = "kdb/kdbPlugin";
  var serviceBase = null;
  var cometdUtil = bkHelper.getUpdateService();
  var kdbCancelFunction = null;
  
  var KDB = {
    pluginName: PLUGIN_NAME,
    cmMode: "r",
    background: "#C0CFF0",
    bgColor: "#353C41",
    fgColor: "#FFFFFF",
    borderColor: "",
    shortName: "K",
    newShell: function(shellId, cb) {
      if (!shellId) shellId = "";
      bkHelper.httpPost(serviceBase + "/rest/kdb/getShell", { shellid: shellId, sessionId: bkHelper.getSessionId() })
        .success(cb)
        .error(function() {
          console.log("failed to create shell", arguments);
        });
    },
    evaluate: function(code, modelOutput, refreshObj) {
      var deferred = Q.defer();
      
      if (kdbCancelFunction) {
        deferred.reject("An evaluation is already in progress");
        return deferred.promise;
      }

      var self = this;
      bkHelper.setupProgressOutput(modelOutput);
      
      kdbCancelFunction = function () {
        $.ajax({
          type: "POST",
          datatype: "json",
          url: serviceBase + "/rest/kdb/interrupt",
          data: {shellID: self.settings.shellID}
        }).done(function (ret) {
          console.log("done cancelExecution",ret);
        });
        bkHelper.setupCancellingOutput(modelOutput);
      }
      $.ajax({
        type: "POST",
        datatype: "json",
        url: serviceBase + "/rest/kdb/evaluate",
        data: {shellID: self.settings.shellID, code: code }
      }).done(function(ret) {
        var onEvalStatusUpdate = function(evaluation) {
          if (bkHelper.receiveEvaluationUpdate(modelOutput, evaluation, PLUGIN_NAME, self.settings.shellID)) {
            cometdUtil.unsubscribe(evaluation.update_id);
            kdbCancelFunction = null;
            if (evaluation.status === "ERROR")
              deferred.reject(evaluation.payload);
            else
              deferred.resolve(evaluation.payload);
          }
          if (refreshObj !== undefined)
            refreshObj.outputRefreshed();
          else
            bkHelper.refreshRootScope();
        };
        onEvalStatusUpdate(ret);
        if (ret.update_id) {
          cometdUtil.subscribe(ret.update_id, onEvalStatusUpdate);
        }
      });
      return deferred.promise;
    },
    autocomplete: function(code, cpos, cb) {
      var self = this;
      $.ajax({
        type: "POST",
        datatype: "json",
        url: serviceBase + "/rest/kdb/autocomplete",
        data: {shellID: self.settings.shellID, code: code, caretPosition: cpos}
      }).done(function(x) {
        var matchedText = undefined;
        if (x !== undefined) {
          var i, shortest;
          shortest = undefined;
          for (i=0; i<x.length; i++) {
            if (shortest === undefined || shortest.length > x[1].length)
              shortest = x[i];            
          }
          console.log("short: "+shortest);
          for (i=shortest.length; i>0; i--) {
            var a = code.substring(cpos-i,cpos);
            var b = shortest.substring(0,i);
            console.log("'"+a+"' '"+b+"'");
            if (a === b)
              break;
          }
          if (i>0)
            matchedText = shortest.substring(0,i);
          else if(code.charAt(cpos-1) === '(') {
            for (i=0; i<x.length; i++) {
              x[i] = '(' + x[i];
            }
          } else if(code.charAt(cpos-1) === ',') {
            for (i=0; i<x.length; i++) {
              x[i] = ',' + x[i];
            }
          } else if(code.charAt(cpos-1) === ' ') {
            for (i=0; i<x.length; i++) {
              x[i] = ' ' + x[i];
            }
          }
        }
        cb(x, matchedText, false);
      });
    },
    exit: function(cb) {
      this.cancelExecution();
      kdbCancelFunction = null;
      var self = this;
      $.ajax({
        type: "POST",
        datatype: "json",
        url: serviceBase + "/rest/kdb/exit",
        data: { shellID: self.settings.shellID }
      }).done(cb);
    },
    interrupt: function() {
      this.cancelExecution();
    },
    cancelExecution: function() {
      if (kdbCancelFunction) {
        kdbCancelFunction();
      }
    },
    spec: {
      resetEnv:    {type: "action", action: "resetEnvironment", name: "Reset Environment" },
      killAllThr:  {type: "action", action: "killAllThreads", name: "Kill All Threads" }
    },
    cometdUtil: cometdUtil
  };
  var shellReadyDeferred = bkHelper.newDeferred();
  
  var init = function() {
    bkHelper.locatePluginService(PLUGIN_NAME, {
        command: COMMAND,
        startedIndicator: "Server started",
        waitfor: "Started SelectChannelConnector",
        recordOutput: "true"
    }).success(function(ret) {
      serviceBase = ret;
      if (window.languageServiceBase == undefined) {
        window.languageServiceBase = {};
      }
      window.languageServiceBase[PLUGIN_NAME] = serviceBase + '/rest/kdb';
      if (window.languageUpdateService == undefined) {
        window.languageUpdateService = {};
      }
      window.languageUpdateService[PLUGIN_NAME] = cometdUtil;
      cometdUtil.init(PLUGIN_NAME, serviceBase);

      var kdbShell = function(settings, doneCallback) {
        var self = this;
        var setShellIdCB = function(id) {
          settings.shellID = id;
          self.settings = settings;
          if (doneCallback) {
            doneCallback(self);
          }
        };
        if (!settings.shellID) settings.shellID = "";
        this.newShell(settings.shellID, setShellIdCB);
        this.perform = function(what) {
          var action = this.spec[what].action;
          this[action]();
        };
      };
      kdbShell.prototype = KDB;
      shellReadyDeferred.resolve(kdbShell);
    }).error(function() {
      console.log("failed to locate plugin service", PLUGIN_NAME, arguments);
      shellReadyDeferred.reject("failed to locate plugin service");
    });
  };
  init();

  exports.getEvaluatorFactory = function() {
    return shellReadyDeferred.promise.then(function(Shell) {
      return {
        create: function(settings) {
          var deferred = bkHelper.newDeferred();
          new Shell(settings, function(shell) {
            deferred.resolve(shell);
          });
          return deferred.promise;
        }
      };
    },
    function(err) { return err; });
  };

  exports.name = PLUGIN_NAME;
});
