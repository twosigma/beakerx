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
(function () {
  'use strict';
  var module = angular.module('bk.outputDisplay');

  function EasyFormComponent(scope, element, constants, service, utils) {

    this.scope = scope;
    this.element = element;
    this.constants = constants;
    this.service = service;
    this.utils = utils;
    this.watchByObjectEquality = false;

    var component = null;

    this.getComponent = function() {
      return component;
    };

    this.setWatchByObjectEquality = function(value) {
      this.watchByObjectEquality = value;
    };

    this.isWatchByObjectEquality = function() {
      return this.watchByObjectEquality;
    };

    this.watchedExpression = function (scope) {
      return scope[scope.ngModelAttr];
    };

    var that = this;

    this.valueChangeHandler = function (newValue, oldValue) {
      if (newValue != undefined && newValue != null) {
        newValue = that.prepareValueForSave(newValue);
        service.setComponentValue(scope.formId, scope.evaluatorId, component, newValue);
      }
    };

    this.prepareValueForSave = function(value) {
      return value;
    };

    this.buildUI = function () {};

    this.init = function() {
      component = scope.component;
      scope.componentId = component.label;
      scope.ngModelAttr = utils.getValidNgModelString(component.label);

      this.buildUI();

      if (component.value) {
        scope[scope.ngModelAttr] = component.value;
      }

      scope.$watch(this.watchedExpression, this.valueChangeHandler, this.isWatchByObjectEquality());
      this.addUpdatedListener();
      this.addValueLoadedListener();
    };

    this.addListener = function(event, handler) {
      scope.$on(event, handler);
    };

    this.addUpdatedListener = function() {
      this.addListener(constants.Events.UPDATED, function(event, args) {
        args.components.forEach(function(component) {
          if (component.label === scope.componentId) {
            scope.$apply(function() {
              scope[scope.ngModelAttr] = component.value;
              scope.component.enabled = component.enabled;
            });
          }
        });
      });
    };

    this.addValueLoadedListener = function() {
      this.addListener(constants.Events.VALUE_LOADED, function(event, args) {
        scope.$apply(function() {
          scope[scope.ngModelAttr] = service.getComponentValue(component);
        });
      });
    };
  };

  module.directive("easyFormTextField",
      ['$compile', 'bkUtils', 'EasyFormConstants', 'EasyFormService',
        function ($compile, bkUtils, EasyFormConstants, EasyFormService) {
          return {
            restrict: "E",
            template: "<div id='textFieldContrainer' class='easyform-container'>" +
                "<label class='easyform-label'/>" +
                "<div class='easyform-component-container'>" +
                "<input type='text' id='textField' class='text-field' " +
                "ng-disabled='!component.enabled'/>" +
                "</div>" +
                "</div>",
            link: function (scope, element, attrs) {

              var efc = new EasyFormComponent(
                  scope, element, EasyFormConstants, EasyFormService, bkUtils);

              efc.buildUI = function() {
                var fixedSize = false;
                if (!efc.getComponent().width
                    || efc.getComponent().width < efc.constants.Components.TextField.MIN_WIDTH) {
                  efc.getComponent().width = efc.constants.Components.TextField.MIN_WIDTH;
                } else {
                  fixedSize = true;
                }
                element.find('.easyform-label').text(efc.getComponent().label);
                var textField = element.find('#textField');
                textField.attr('ng-model', scope.ngModelAttr)
                    .attr('size', efc.getComponent().width);
                if (fixedSize) {
                  element.find('.easyform-component-container').addClass('fixed-size');
                }
              };

              efc.init();
              $compile(element.contents())(scope);
            }
          };
        }]);

  module.directive("easyFormTextArea",
      ['$compile', 'bkUtils', 'EasyFormConstants', 'EasyFormService',
        function ($compile, bkUtils, EasyFormConstants, EasyFormService) {
          return {
            restrict: "E",
            template: "<div id='textAreaContrainer' class='easyform-container'>" +
                "<label class='easyform-label'/>" +
                "<div class='easyform-component-container'>" +
                "<textarea rows='4' cols='35' id='textArea' class='text-area' "
                + "ng-disabled='!component.enabled'/>" +
                "</div>" +
                "</div>",
            link: function (scope, element, attrs) {

              var efc = new EasyFormComponent(
                  scope, element, EasyFormConstants, EasyFormService, bkUtils);

              efc.buildUI = function() {
                element.find('.easyform-label').text(efc.getComponent().label);
                var textArea = element.find('#textArea');
                textArea.attr('ng-model', scope.ngModelAttr);
              };

              efc.init();
              $compile(element.contents())(scope);
            }
          };
        }]);

  module.directive("easyFormCheckBox",
      ['$compile', 'bkUtils', 'EasyFormConstants', 'EasyFormService',
        function ($compile, bkUtils, EasyFormConstants, EasyFormService) {
          return {
            restrict: "E",
            template: "<div id='checkBoxContrainer' class='easyform-container'>" +
                "<label id='checkBoxLabel' class='easyform-label'/>" +
                "<div class='easyform-component-container'>" +
                "<input type='checkbox' id='checkBox' "
                + "ng-disabled='!component.enabled' class='check-box'/>" +
                "</div>" +
                "</div>",
            link: function (scope, element, attrs) {

              var efc = new EasyFormComponent(
                  scope, element, EasyFormConstants, EasyFormService, bkUtils);

              efc.buildUI = function() {
                element.find('.easyform-label').text(efc.getComponent().label);
                var checkBox = element.find('#checkBox');
                checkBox.attr('ng-model', scope.ngModelAttr);
                if ('true' === efc.getComponent().value) {
                  efc.getComponent().value = true;
                  checkBox.attr('checked', 'true');
                } else {
                  efc.getComponent().value = false;
                }
              };

              efc.addUpdatedListener = function() {
                efc.addListener(efc.constants.Events.UPDATED, function(event, args) {
                  args.components.forEach(function(component) {
                    if (component.label === scope.componentId) {
                      scope.$apply(function() {
                        scope[scope.ngModelAttr] = component.value === 'true' ? true : false;
                        scope.component.enabled = component.enabled;
                      });
                    }
                  });
                });
              };

              efc.init();
              $compile(element.contents())(scope);
            }
          };
        }]);

  module.directive('easyFormCheckBoxGroup',
      ['$compile', 'bkUtils', 'EasyFormConstants', 'EasyFormService',
        function ($compile, bkUtils, EasyFormConstants, EasyFormService) {
          return {
            restrict: "E",
            template: "<div id='checkBoxGroupContainer' class='easyform-container'>" +
                "<label id='checkBoxGroupLabel' class='easyform-label'/>" +
                "<div class='easyform-component-container'>" +
                "<label class='check-box-group-item-label'" +
                " ng-repeat='value in values track by $index' " +
                " ng-class='{vertical : !horizontal}'>" +
                " <input type='checkbox' ng-model='value.selected' name='selectedValues[]' " +
                " ng-disabled='!component.enabled'/> {{value.name}}" +
                "</label>" +
                "</div>" +
                "</div>",
            link: function (scope, element, attrs) {

              var efc = new EasyFormComponent(
                  scope, element, EasyFormConstants, EasyFormService, bkUtils);

              efc.buildUI = function() {
                scope.values = [];
                if (efc.getComponent().values && efc.getComponent().values.length > 0) {
                  efc.getComponent().values.forEach(function (value) {
                    var obj = {
                      name: value,
                      selected: false
                    };
                    scope.values.push(obj);
                  });
                }

                element.find('.easyform-label').text(efc.getComponent().label);
                scope.horizontal = 'true' === efc.getComponent().isHorizontal.toString();
              };

              efc.watchedExpression = function (scope) {
                return scope.values;
              };

              efc.prepareValueForSave = function (value) {
                value = value
                    .filter(function(x) { return x.selected; })
                    .map(function(x) { return x.name; })
                    .join(', ');
                if (value) {
                  value = '[' + value + ']';
                }
                return value;
              };

              efc.setWatchByObjectEquality(true);

              efc.addUpdatedListener = function() {
                efc.addListener(efc.constants.Events.UPDATED, function(event, args) {
                  args.components.forEach(function(component) {
                    if (component.label === scope.componentId && component.value) {
                      var selectedValues = component.value.substring(1, component.value.length - 1)
                          .split(', ');
                      scope.values.forEach(function(value) {
                        value.selected = selectedValues.indexOf(value.name) != -1
                      });
                      scope.$apply(function() {
                        scope[scope.ngModelAttr] = component.value;
                        scope.component.enabled = component.enabled;
                      });
                    }
                  });
                });
              };

              efc.addValueLoadedListener = function() {
                efc.addListener(efc.constants.Events.VALUE_LOADED, function(event, args) {
                  var loadedValue = efc.service.getComponentValue(efc.getComponent());
                  if (loadedValue) {
                    scope.$apply(function() {
                      scope.values = JSON.parse(loadedValue);
                    });
                  }
                });
              };

              efc.init();
              $compile(element.contents())(scope);
            }
          };
        }]);

  module.directive("easyFormComboBox",
      ['$compile', 'bkUtils', 'EasyFormConstants', 'EasyFormService',
        function ($compile, bkUtils, EasyFormConstants, EasyFormService) {
          return {
            restrict: "E",
            template:
                "<div id='comboBoxContrainer' class='easyform-container'>" +
                  "<label id='comboBoxLabel' class='easyform-label'/>" +
                  "<div class='easyform-component-container position-absolute'>" +
                    "<div class='combo-box-input-outer' id='outerFilterDiv'>" +
                      "<input type='text' class='combo-box-input' />" +
                      "<div class='combo-box-outer'>" +
                        "<select id='comboBox' class='combo-box' ng-disabled='!component.enabled'/>" +
                      "</div>" +
                    "</div>" +
                  "</div>" +
                "</div>",
            link: function (scope, element, attrs) {

              var efc = new EasyFormComponent(
                  scope, element, EasyFormConstants, EasyFormService, bkUtils);

              efc.buildUI = function() {
                element.find('.easyform-label').text(efc.getComponent().label);
                var comboBox = element.find('#comboBox');
                comboBox.attr('ng-model', scope.ngModelAttr);

                scope.component.enabled = true;
                var editable = efc.getComponent().editable && efc.getComponent().editable === 'true';
                var textField = element.find('.combo-box-input');
                if (editable) {
                  textField.attr('ng-model', scope.ngModelAttr);
                  //todo replace this hack
                  var tmp = document.createElement("span");
                  tmp.innerHTML = efc.getComponent().value;
                  document.body.appendChild(tmp);
                  var theWidth = tmp.getBoundingClientRect().width + 10;
                  document.body.removeChild(tmp);
                  textField.width(theWidth);
                } else {
                  textField.hide();
                }

                if (efc.getComponent().values) {
                  comboBox.attr('ng-options', 'v for v in component.values');
                }
              };

              efc.addUpdatedListener = function() {
                efc.addListener(efc.constants.Events.UPDATED, function(event, args) {
                  args.components.forEach(function(component) {
                    if (component.label === scope.componentId) {
                      scope.$apply(function() {
                        scope[scope.ngModelAttr] = component.value;
                        scope.component.enabled = component.enabled;
                      });
                    }
                  });
                });
              };

              efc.addValueLoadedListener = function() {
                efc.addListener(efc.constants.Events.VALUE_LOADED, function(event, args) {
                  var loadedValue = efc.service.getComponentValue(efc.getComponent());
                  if (loadedValue) {
                    scope.$apply(function() {
                      scope[scope.ngModelAttr] = JSON.parse(loadedValue);
                    });
                  }
                });
              };

              efc.init();
              $compile(element.contents())(scope);
            }
          };
        }]);

  module.directive("easyFormListComponent",
      ['$compile', 'bkUtils', 'EasyFormConstants', 'EasyFormService',
        function ($compile, bkUtils, EasyFormConstants, EasyFormService) {
          return {
            restrict: "E",
            template:
                "<div id='listComponentContrainer' class='easyform-container'>" +
                  "<label id='listComponentLabel' class='easyform-label'/>" +
                  "<div class='easyform-component-container'>" +
                    "<div class='list-component-outer'>" +
                      "<select id='listComponent' class='list-component' " +
                      "ng-disabled='!component.enabled'/>" +
                    "</div>" +
                  "</div>" +
                "</div>",
            link: function (scope, element, attrs) {

              var efc = new EasyFormComponent(
                  scope, element, EasyFormConstants, EasyFormService, bkUtils);

              efc.buildUI = function() {
                element.find('.easyform-label').text(efc.getComponent().label);
                var listComponent = element.find('#listComponent');
                listComponent.attr('ng-model', scope.ngModelAttr);

                if ('true' === efc.getComponent().multipleSelection) {
                  listComponent.attr('multiple', 'true');
                }

                var size;
                if (efc.getComponent().size && efc.getComponent().size > 0) {
                  size = efc.getComponent().size;
                  listComponent.attr('size', size);
                } else if (efc.getComponent().values && efc.getComponent().values.length > 0) {
                  size = efc.getComponent().values.length;
                  listComponent.attr('size', size);
                }

                if (size >= efc.getComponent().values.length) {
                  //hide scrollbar
                  var outerDiv = element.find('.list-component-outer');
                  outerDiv.addClass('hide-scrollbar');
                }

                if (efc.getComponent().values) {
                  listComponent.attr('ng-options', 'v for v in component.values');
                }
              };

              efc.prepareValueForSave = function(value) {
                if ('true' === efc.getComponent().multipleSelection) {
                  if (value.join) {
                    value = '[' + value.join(', ') + ']';
                  } else {
                    value = '[' + value + ']';
                  }
                }
                return value;
              };

              efc.addUpdatedListener = function() {
                efc.addListener(efc.constants.Events.UPDATED, function(event, args) {
                  args.components.forEach(function(component) {
                    if (component.label === scope.componentId) {
                      scope.$apply(function() {
                        if (component.value) {
                          scope[scope.ngModelAttr] =
                                  'true' === efc.getComponent().multipleSelection
                              ? component.value.substring(1, component.value.length - 1).split(', ')
                              : component.value;
                        }
                        scope.component.enabled = component.enabled;
                      });
                    }
                  });
                });
              };

              efc.addValueLoadedListener = function() {
                efc.addListener(efc.constants.Events.VALUE_LOADED, function(event, args) {
                  var loadedValue = efc.service.getComponentValue(efc.getComponent());
                  if (loadedValue) {
                    scope.$apply(function() {
                      scope.values = JSON.parse(loadedValue);
                    });
                  }
                });
              };

              efc.init();
              $compile(element.contents())(scope);
            }
          };
        }]);

  module.directive("easyFormRadioButtonComponent",
      ['$compile', 'bkUtils', 'bkSessionManager', 'EasyFormConstants', 'EasyFormService',
        function ($compile, bkUtils, bkSessionManager, EasyFormConstants, EasyFormService) {
          return {
            restrict: "E",
            template:
                "<div id='radioButtonComponentContrainer' class='easyform-container'>" +
                  "<label id='radioButtonComponentLabel' class='easyform-label'/>" +
                  "<div class='easyform-component-container'>" +
                  "</div>" +
                "</div>",
            link: function (scope, element, attrs) {

              var efc = new EasyFormComponent(
                  scope, element, EasyFormConstants, EasyFormService, bkUtils);

              efc.buildUI = function() {
                element.find('.easyform-label').text(efc.getComponent().label);

                if (efc.getComponent().values && efc.getComponent().values.length > 0) {
                  var container = element.find('.easyform-component-container');
                  var horizontal = 'true' === efc.getComponent().isHorizontal.toString();
                  var radioButtonItemsContainer
                      = angular.element('<div class="radio-button-items-container"></div>');

                  efc.getComponent().values.forEach(function (value) {
                    var outerRadioButtonLabel
                        = angular.element('<label class="radio-button-item-label"></label>');
                    outerRadioButtonLabel.addClass(horizontal ? 'horizontal' : 'vertical');
                    var radioButton
                        = angular.element('<input type="radio" class="radio-button-component-item"'
                        + ' ng-disabled="!component.enabled"/>')
                        .attr('ng-model', scope.ngModelAttr)
                        .attr('value', value);
                    var textSpanElement =
                        angular.element('<span class="radio-button-item-text"></span>');
                    textSpanElement.text(value);
                    var divSpacer = angular.element('<div class="radio-button-item-spacer"/>');
                    outerRadioButtonLabel.append(radioButton).append(textSpanElement)
                        .append(divSpacer);
                    radioButtonItemsContainer.append(outerRadioButtonLabel);
                  });

                  container.append(radioButtonItemsContainer);
                }
              };

              efc.init();
              $compile(element.contents())(scope);
            }
          };
        }]);

  module.directive("easyFormDatePickerComponent",
      ['$compile', 'bkUtils', 'EasyFormConstants', 'EasyFormService',
        function ($compile, bkUtils, EasyFormConstants, EasyFormService) {
          return {
            restrict: "E",
            template:
                "<div id='datePickerComponentContrainer' class='easyform-container'>" +
                  "<label id='datePickerLabel' class='easyform-label'/>" +
                  "<div class='easyform-component-container'>" +
                    "<input type='date' id='datePicker' class='date-picker' " +
                    " ng-disabled='!component.enabled'/>" +
                  "</div>" +
                "</div>",
            link: function (scope, element, attrs) {

              var efc = new EasyFormComponent(
                  scope, element, EasyFormConstants, EasyFormService, bkUtils);

              efc.buildUI = function() {
                element.find('.easyform-label').text(efc.getComponent().label);
                var datePicker = element.find('#datePicker');
                datePicker.attr('ng-model', scope.ngModelAttr);

                if ('true' === efc.getComponent().showTime) {
                  datePicker.attr('type', 'datetime');
                }
              };

              efc.init();
              $compile(element.contents())(scope);
            }
          };
        }]);

  module.directive("easyFormButtonComponent",
      ['$compile', 'bkUtils', 'bkSessionManager', 'EasyFormConstants', 'EasyFormService',
        'bkCoreManager',
        function ($compile, bkUtils, bkSessionManager, EasyFormConstants, EasyFormService,
                  bkCoreManager) {
          return {
            restrict: "E",
            template: "<div id='buttonComponentContrainer' class='button-component-container'>" +
                "<button type='button' id='buttonComponent' class='button-component' " +
                "ng-disabled='!component.enabled'/>" +
                "</div>",
            link: function (scope, element, attrs) {
              var component = scope.component;

              var executeCellWithTag = function () {
                var cellOp = bkSessionManager.getNotebookCellOp();
                var result;
                if (cellOp.hasUserTag(component.tag)) {
                  result = cellOp.getCellsWithUserTag(component.tag);
                }
                bkCoreManager.getBkApp().evaluateRoot(result)
                    .catch(function (data) {
                      console.log('Evaluation failed');
                    });
              };

              var saveValues = function () {
                var contentAsJson = JSON.stringify(EasyFormService.easyForm);
                bkUtils.saveFile(component.path, contentAsJson, true);
              };

              var loadValues = function () {
                bkUtils.loadFile(component.path).then(function (contentAsJson) {
                  EasyFormService.easyForm = JSON.parse(contentAsJson);
                  scope.$root.$broadcast(EasyFormConstants.Events.VALUE_LOADED);
                });
              };

              var buttonComponent = element.find('#buttonComponent');

              if (EasyFormConstants.Components.ButtonComponent.type == component.type) {
                buttonComponent.text(component.label);

                if (component.tag) {
                  buttonComponent.attr('title', component.tag).on('click', executeCellWithTag);
                }
              } else if (EasyFormConstants.Components.SaveValuesButton.type == component.type) {
                buttonComponent.text("Save");
                buttonComponent.on('click', saveValues);
              } else if (EasyFormConstants.Components.LoadValuesButton.type == component.type) {
                buttonComponent.text("Load");
                buttonComponent.on('click', loadValues);
              }

              scope.$on(EasyFormConstants.Events.UPDATED, function (event, args) {
                args.components.forEach(function(component) {
                  if (component.label === scope.componentId) {
                    scope.$apply(function() {
                      scope.component.enabled = component.enabled;
                    });
                  }
                });
              });
            }
          };
        }]);

  beaker.bkoDirective("EasyForm",
      ['$compile', 'bkUtils', 'bkEvaluatorManager', 'bkSessionManager', 'EasyFormConstants',
        'EasyFormService',
        function ($compile, bkUtils, bkEvaluatorManager, bkSessionManager, EasyFormConstants,
                  EasyFormService) {
          return {
            template: "<div id='easyFormContainer' class='easy-form-container'></div>",

            controller: function ($scope) {
              $scope.getUpdateService = function () {
                if (window !== undefined && window.languageUpdateService !== undefined
                    && bkEvaluatorManager.getEvaluator($scope.model.getEvaluatorId()) !== undefined)
                  return window.languageUpdateService[$scope.model.getEvaluatorId()];
                return undefined;
              };

              $scope.ingestUpdate = function (model) {
                $scope.update_id = model.update_id;
                var srv = $scope.getUpdateService();

                if ($scope.subscribedId && $scope.subscribedId !== $scope.update_id) {
                  if (srv !== undefined)
                    srv.unsubscribe($scope.subscribedId);
                  $scope.subscribedId = null;
                }

                if (!$scope.subscribedId && $scope.update_id && srv !== undefined) {
                  var onUpdate = function (update) {
                    $scope.ingestUpdate(update);
                    $scope.$broadcast(EasyFormConstants.Events.UPDATED, update);
                  };
                  srv.subscribe($scope.update_id, onUpdate);
                  $scope.subscribedId = $scope.update_id;
                }

              };

              $scope.fetchFromCellModel = function (model, element) {
                $scope.ingestUpdate(model);
                var easyFormContainer = element.find('#easyFormContainer');

                if (model.caption) {
                  var fieldsetElement = angular.element('<fieldset></fieldset>');
                  var legendElement = angular.element('<legend></legend>').text(model.caption);
                  easyFormContainer.append(fieldsetElement.append(legendElement));
                  easyFormContainer = fieldsetElement;
                }

                if (model.components) {
                  model.components.forEach(function (component) {

                    var childScope = $scope.$new();
                    childScope.component = component;
                    childScope.formId = $scope.update_id;
                    childScope.evaluatorId = $scope.model.getEvaluatorId();
                    var newElement
                        = angular.element(EasyFormConstants.Components[component.type].htmlTag);
                    childScope.component.enabled = childScope.component.enabled ? true : false;
                    easyFormContainer.append($compile(newElement)(childScope));

                    if ((component.type.indexOf(
                        EasyFormConstants.Components.SaveValuesButton.type) == -1
                        || component.type.indexOf(
                        EasyFormConstants.Components.LoadValuesButton.type) == -1)) {
                      EasyFormService.addComponent(component);
                    }

                  });
                }

                $scope.alignComponents();
              };

              $scope.alignComponents = function() {
                var labels = $('.easyform-label');
                var components = $('.easyform-component-container');
                var maxLabelWidth = findMaxLabelWidth();
                if (maxLabelWidth <= 0) {
                  return;
                }
                var safeIndent = 5;
                var maxComponentWidth = countMaxComponentWidth(maxLabelWidth + safeIndent);
                setComponentsWidthInPercents(maxComponentWidth);
                setEqualLabelsWidth(maxLabelWidth);

                function findMaxLabelWidth() {
                  var maxWidth = -1;
                  for (var i = 0; i < labels.size(); i++) {
                    var elementWidth = labels.eq(i).width();
                    maxWidth = maxWidth < elementWidth ? elementWidth : maxWidth;
                  }
                  return maxWidth;
                }

                function countMaxComponentWidth(labelWidth) {
                  var maxComponentWidth = 0;
                  if (components) {
                    var parentWidth = components.eq(0).parent().width();
                    var defaultBorder = 2, defaultPadding = 1, textFieldMargin = 5,
                        delta = (defaultBorder + defaultPadding + textFieldMargin) * 2;
                    maxComponentWidth = (parentWidth - labelWidth - delta) / parentWidth * 100;
                  }
                  return maxComponentWidth;
                }

                function setComponentsWidthInPercents(width) {
                  for (var i = 0; i < components.size(); i++) {
                    var component = components.eq(i);
                    if (!component.hasClass('fixed-size')) {
                      component.css('width', width + '%');
                    }
                  }
                }

                function setEqualLabelsWidth(width) {
                  for (var i = 0; i < labels.size(); i++) {
                    labels.eq(i).width(width);
                  }
                }
              };

              $(window).resize($scope.alignComponents);

              $scope.$on('$destroy', function () {
                $(window).off('resize', $scope.alignComponents);
                if ($scope.subscribedId) {
                  var srv = $scope.getUpdateService();
                  if (srv !== undefined) {
                    srv.unsubscribe($scope.subscribedId);
                  }
                }
              });
            },

            link: function (scope, element, attrs) {

              scope.getState = function () {
                return scope.model.getCellModel();
              };

              scope.$watch(function () {
                return element.is(':visible')
              }, scope.alignComponents);

              scope.fetchFromCellModel(scope.getState(), element);
            }
          };
        }
      ]);

  module.service('EasyFormService', function () {
    var service = {
      easyForm: {},
      addComponent: function (component) {
        this.easyForm[component.label] = component;
      },
      setComponentValue: function (formId, evaluatorId, component, value) {
        if (this.easyForm[component.label]) {
          this.easyForm[component.label].currentValue = value;
        }
        var req = $.ajax({
          type: "POST",
          datatype: "json",
          url: window.languageServiceBase[evaluatorId] + '/easyform/set',
          data: {
            id: formId,
            key: component.label,
            value: value
          }
        });
        req.done(function (ret) {
        });
        req.error(function (jqXHR, textStatus) {
          console.error("Unable to set easyform value");
        });
      },
      getComponentValue: function (component) {
        if (this.easyForm[component.label]) {
          return this.easyForm[component.label].currentValue;
        }
      }
    };
    return service;
  });

  module.constant("EasyFormConstants", {
    Events: {
      UPDATED: "easyformupdated",
      VALUE_LOADED: "easyformvalueloaded"
    },
    Components: {
      TextField: {
        type: "TextField",
        htmlTag: "<easy-form-text-field/>",
        MIN_WIDTH: 1
      },
      TextArea: {
        type: "TextArea",
        htmlTag: "<easy-form-text-area/>"
      },
      CheckBox: {
        type: "CheckBox",
        htmlTag: "<easy-form-check-box/>"
      },
      CheckBoxGroup: {
        type: "CheckBoxGroup",
        htmlTag: "<easy-form-check-box-group/>"
      },
      ComboBox: {
        type: "ComboBox",
        htmlTag: "<easy-form-combo-box/>"
      },
      ListComponent: {
        type: "ListComponent",
        htmlTag: "<easy-form-list-component/>"
      },
      RadioButtonComponent: {
        type: "RadioButtonComponent",
        htmlTag: "<easy-form-radio-button-component/>"
      },
      DatePickerComponent: {
        type: "DatePickerComponent",
        htmlTag: "<easy-form-date-picker-component/>"
      },
      ButtonComponent: {
        type: "ButtonComponent",
        htmlTag: "<easy-form-button-component/>"
      },
      SaveValuesButton: {
        type: "SaveValuesButton",
        htmlTag: "<easy-form-button-component/>"
      },
      LoadValuesButton: {
        type: "LoadValuesButton",
        htmlTag: "<easy-form-button-component/>"
      }
    }
  });
})();