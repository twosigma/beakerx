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

(function() {
  'use strict';

  var module = angular.module('bk.notebook.share', ["bk.notebookCellModelManager"]);

  module.factory("notebookModel", function() {
    return window.notebookModel;
  });

  module.directive("bkNotebook", function(notebookModel, bkNotebookCellModelManager) {
    return {
      restrict: 'E',
      template:
          '<div class="bkcell">' +
          '  <bk-cell ng-repeat="cell in getChildren()" cellmodel="cell"></bk-cell>' +
          '</div>',
      scope: {},
      link: function(scope) {
        window.bkNotebookCellModelManager = bkNotebookCellModelManager; // for debug only
        window.notebookModel = notebookModel; // for debug only
        bkNotebookCellModelManager.reset(notebookModel.cells);
        scope.getChildren = function() {
          return bkNotebookCellModelManager.getChildren("root");
        }
      }
    };
  });

  module.directive("bkCell", function() {
    return {
      restrict: 'E',
      template:
          '<div class="bkcell">' +
          '  <div ng-include="getTypeCellUrl()"></div>' +
          '</div>',
      scope: {
        cellmodel: "="
      },
      link: function(scope) {
        scope.getTypeCellUrl = function() {
          var type = scope.cellmodel.type;
          return type + "-cell.html";
        };
      }
    };
  });

  module.directive("bkSectionCell", function(bkNotebookCellModelManager) {
    return {
      restrict: 'E',
      template:
          '<div ng-hide="cellmodel.hideTitle">' +
          '  <i class="fa fa-plus-square-o bksectiontoggleplus" ng-click="toggleShowChildren()" ng-hide="isShowChildren()"></i>' +
          '  <i class="fa fa-minus-square-o bksectiontoggleminus" ng-click="toggleShowChildren()" ng-show="isShowChildren()"></i>' +
          '  <span class="section{{cellmodel.level}} bk-section-title" contenteditable="true">{{cellmodel.title}}</span>' +
          '</div>' +
          '<div bk-show="isShowChildren()">' +
          '  <bk-cell ng-repeat="cell in getChildren()" cellmodel="cell"></bk-cell>' +
          '</div>',
      link: function(scope) {
        scope.toggleShowChildren = function() {
          if (scope.cellmodel.collapsed === undefined) {
            scope.cellmodel.collapsed = false;
          }
          scope.cellmodel.collapsed = !scope.cellmodel.collapsed;
        };
        scope.isShowChildren = function() {
          if (scope.cellmodel.collapsed === undefined) {
            scope.cellmodel.collapsed = false;
          }
          return !scope.cellmodel.collapsed;
        };
        scope.getChildren = function() {
          return bkNotebookCellModelManager.getChildren(scope.cellmodel.id);
        }
      }
    };
  });

  module.directive('bkTextCell', function() {
    return {
      restrict: 'E',
      template: "<div>{{cellmodel.body}}</div>"
    };
  });

  module.directive('bkMarkdownCell', function() {
    return {
      restrict: 'E',
      template: "<div></div>",
      link: function(scope, element, attrs) {
        // always overwrite mode to "preview" for "Read-Only"
        scope.cellmodel.mode = "preview";

        var div = element.find("div").first().get()[0];
        var options = {
          basePath: '../../vendor/epiceditor',
          container: div,
          file: {
            defaultContent: scope.cellmodel.body
          },
          clientSideStorage: false,
          autogrow: {
            minHeight: 50,
            maxHeight: false,
            scroll: true
          },
          button: {
            preview: false
          },
          string: {
            toggleFullscreen: 'Enter Fullscreen(Alt+f)'
          }
        };
        var editor = new EpicEditor(options).load();
        setTimeout(function() {
          editor.preview();
        }, 1000);
      }
    };
  });

  module.directive('bkCodeCell', function(notebookModel) {
    return {
      restrict: 'E',
      template: '<div>' +
        '  <div class="bkcell" ng-show="isShowInput()">' +
        '    <textarea class="bkcelltextarea" ng-model="cellmodel.input.body"></textarea>' +
        '  </div>' +
        '  <span ng-show="isShowOutput()">'+
        '    <bk-code-cell-output'+
        '        model="cellmodel.output"'+
        '        evaluator-id="{{ cellmodel.evaluator }}">'+
        '    </bk-code-cell-output>'+
        '  </span>'+
        '</div>',
      scope: {
        cellmodel: "=",
        cellmenu: "="
      },
      link: function (scope, element, attrs) {
        var isLocked = function() {
          return notebookModel.locked;
        };
        scope.isShowInput = function() {
          if (isLocked()) {
            return false;
          }
          if (scope.cellmodel.input.hidden === true) {
            return false;
          }
          return true;
        };
        scope.isShowOutput = function() {
          if (scope.cellmodel.output.hidden === true) {
            return false;
          }
          var result = scope.cellmodel.output.result;
          if (result && result.hidden === true) {
            return false;
          }
          return !(result === undefined || result === null);
        };

        var evaluator = _(notebookModel.evaluators).find(function(evaluator) {
          return evaluator.name === scope.cellmodel.evaluator;
        });
        var cm = CodeMirror.fromTextArea(element.find("textarea")[0], {
          mode: evaluator.view.cm.mode,
          lineNumbers: true,
          matchBrackets: true,
          onKeyEvent: function (cm, e) {
          },
          extraKeys: {},
          readOnly: true
        });
        $(cm.getWrapperElement()).css("background", evaluator.view.cm.background);
        cm.setValue(scope.cellmodel.input.body);
      }
    };
  });

  module.directive('bkCodeCellOutput', function () {
    return {
      restrict: "E",
      template: '<bk-output-display model="getOutputDisplayModel()" type="getOutputDisplayType()" show-separator="false"></bk-output-display>',
      link: function ($scope, outputDisplayFactory) {
        $scope.getOutputDisplayType = function () {
          var display = $scope.cellmodel.output.selectedType;
          if (!display) {
            display = outputDisplayFactory.getApplicableDisplays($scope.cellmodel.output.result)[0];
          }
          if (display === "BeakerDisplay") {
            return $scope.cellmodel.output.result.innertype;
          } else {
            return display;
          }
        };
        $scope.getOutputDisplayModel = function () {
          var display = $scope.cellmodel.output.selectedType;
          if (!display) {
            display = outputDisplayFactory.getApplicableDisplays($scope.cellmodel.output.result)[0];
          }
          if (display === "BeakerDisplay") {
            return $scope.cellmodel.output.result.object;
          } else {
            return $scope.cellmodel.output.result;
          }
        };
      }
    };
  });

  module.directive('bkOutputDisplay', function () {
    return {
      restrict: 'E',
      scope: {
        type: "=", // optional
        model: "=",
        showSeparator: "@"
      },
      template: '<hr ng-if="showSeparator" /><div ng-include="getType()"></div>',
      controller: function ($scope, outputDisplayFactory) {
        var getDefaultType = function (model) {
          var display = outputDisplayFactory.getApplicableDisplays(model)[0];
          if (display === "BeakerDisplay") {
            if (model) {
              return "bko" + model.innertype + ".html";
            } else {
              return "bkoHidden.html";
            }
          } else {
            return "bko" + display + ".html";
          }
        };
        $scope.getType = function () {
          if ($scope.type) {
            return "bko" + $scope.type + ".html";
          } else {
            return getDefaultType($scope.model);
          }
        };
      }
    };
  });

  module.factory('outputDisplayFactory', function () {
    var resultType2DisplayTypesMap = {
      // The first in the array will be used as default
      "text": ["Text", "Html", "Latex"],
      "TableDisplay": ["Table", "DataTables", "Text"],
      "html": ["Html"],
      "ImageIcon": ["Image", "Text"],
      "BeakerDisplay": ["BeakerDisplay", "Text"],
      "Plot": ["Chart", "Text"],
      "TimePlot": ["Chart", "Text"],
      "HiddenOutputCell": ["Hidden"],
      "Warning": ["Warning"],
      "BeakerOutputContainerDisplay": ["OutputContainer", "Text"],
      "OutputContainerCell": ["OutputContainer", "Text"]
    };

    var isJSON = function (value) {
      var ret = true;
      try {
        JSON.parse(value);
      } catch (err) {
        ret = false;
      }
      return ret;
    };

    var isHTML = function (value) {
      return /<[a-z][\s\S]*>/i.test(value);
    };

    // TODO: think how to dynamically add more display types
    return {
      getApplicableDisplays: function (result) {
        if (!result) {
          return ["Text"];
        }
        if (!result.type) {
          var ret = ["Text", "Html", "Latex"];
          if (isJSON(result)) {
            //ret.splice(0, 0, "JSON", "Vega");
            ret.push("JSON", "Vega");
          }
          if (isHTML(result)) {
            ret = ["Html", "Text", "Latex"];
          }
          if (_.isArray(result)) {
            if (_.isObject(result[0])) {
              ret.push("Table");
            }
          }
          return ret;
        }
        if (resultType2DisplayTypesMap.hasOwnProperty(result.type)) {
          return resultType2DisplayTypesMap[result.type];
        } else {
          return ["Text"];
        }
      }
    };
  });

  module.directive('bkoText', function () {
    return {
      restrict: "E",
      template: "<pre>{{getText()}}</pre>",
      controller: function ($scope) {
        $scope.getText = function () {
          if ($scope.model && $scope.model.text) {
            return $scope.model.text;
          } else {
            return $scope.model;
          }
        };
      }
    };
  });

  module.directive('bkoWarning', function () {
    return {
      restrict: "E",
      template: "<pre class='out_warning'>{{model.message}}</pre>"
    };
  });

  module.directive('bkoError', function () {
    return {
      restrict: "E",
      template: "<pre class='out_error' ng-hide='expanded'>" +
          "<img ng-src='/static/common/img/plus2.png' ng-click='expanded=!expanded' ng-show='model[1]'></img>" +
          "<span></span>" + // first span
          "</pre>" +
          "<pre class='out_error' ng-show='expanded'>" +
          "<img ng-src='/static/common/img/minus2.png' ng-click='expanded=!expanded'></img>" +
          "<span></span>" + // last span
          "</pre>",
      controller: function ($scope, $element) {
        $scope.expanded = false;
        $scope.$watch('model', function () {
          if (_.isArray($scope.model)) {
            $element.find('span').first().html($scope.model[0]);
            $element.find('span').last().html($scope.model[1]);
          } else {
            $element.find('span').first().html($scope.model);
            $element.find('span').last().html("");
          }
        });
      }
    };
  });

  module.directive('bkoHtml', function () {
    return {
      restrict: "E",
      template: "<div></div>",
      link: function (scope, element, attrs) {
        var div = element.find("div").first();
        div.html(scope.model);
      }
    };
  });

  module.directive('bkoOutputContainer', function () {
    return {
      restrict: 'E',
      template: '<bk-output-display ng-repeat="m in model.items" model="m" show-separator="{{ $index != 0}}"></bk-output-display>'
    };
  });
})();