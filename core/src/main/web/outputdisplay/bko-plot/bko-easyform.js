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
            template: "<div id='textFieldContrainer' class='text-field-container'>" +
                "<label id='textFieldLabel' class='text-field-label'/>" +
                "<input type='text' id='textField' class='text-field' " +
                "ng-disabled='!component.enabled'/>" +
                "</div>",
            link: function (scope, element, attrs) {

              var efc = new EasyFormComponent(
                  scope, element, EasyFormConstants, EasyFormService, bkUtils);

              efc.buildUI = function() {
                if (!efc.getComponent().width
                    || efc.getComponent().width < efc.constants.Components.TextField.MIN_WIDTH) {
                  efc.getComponent().width = efc.constants.Components.TextField.MIN_WIDTH;
                }
                element.find('#textFieldLabel').text(efc.getComponent().label);
                var textField = element.find('#textField');
                textField.attr('ng-model', scope.ngModelAttr)
                    .css('width', efc.getComponent().width);
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
            template: "<div id='textAreaContrainer' class='text-area-container'>" +
                "<label id='textAreaLabel' class='text-area-label'/>" +
                "<textarea rows='4' cols='35' id='textArea' class='text-area' "
                + "ng-disabled='!component.enabled'/>" +
                "</div>",
            link: function (scope, element, attrs) {

              var efc = new EasyFormComponent(
                  scope, element, EasyFormConstants, EasyFormService, bkUtils);

              efc.buildUI = function() {
                element.find('#textAreaLabel').text(efc.getComponent().label);
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
            template: "<div id='checkBoxContrainer' class='check-box-container'>" +
                "<label id='checkBoxLabel' class='check-box-label'/>" +
                "<input type='checkbox' id='checkBox' "
                + "ng-disabled='!component.enabled' class='check-box'/>" +
                "</div>",
            link: function (scope, element, attrs) {

              var efc = new EasyFormComponent(
                  scope, element, EasyFormConstants, EasyFormService, bkUtils);

              efc.buildUI = function() {
                element.find('#checkBoxLabel').text(efc.getComponent().label);
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
            template: "<div id='checkBoxGroupContainer' class='check-box-group-container'>" +
                "<label id='checkBoxGroupLabel' class='check-box-group-label'/>" +
                "<label class='check-box-group-item-label'" +
                " ng-repeat='value in values track by $index' " +
                " ng-class='{vertical : !horizontal}'>" +
                " <input type='checkbox' ng-model='value.selected' name='selectedValues[]' " +
                " ng-disabled='!component.enabled'/> {{value.name}}" +
                "</label>" +
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

                element.find('#checkBoxGroupLabel').text(efc.getComponent().label);
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
            template: "<div id='comboBoxContrainer' class='combo-box-container'>" +
                "<label id='comboBoxLabel' class='combo-box-label'/>" +
                "<select id='comboBox' class='combo-box' ng-disabled='!component.enabled'/>" +
                "</div>",
            link: function (scope, element, attrs) {

              var efc = new EasyFormComponent(
                  scope, element, EasyFormConstants, EasyFormService, bkUtils);

              efc.buildUI = function() {
                element.find('#comboBoxLabel').text(efc.getComponent().label);
                var comboBox = element.find('#comboBox');
                comboBox.attr('ng-model', scope.ngModelAttr);

                scope.component.enabled = true;
                if (efc.getComponent().editable) {
                  scope.component.enabled = efc.getComponent().editable === 'true' ? true : false;
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
                        scope.component.enabled
                            = efc.getComponent().editable === 'true' ? true : false;
                        scope.component.enabled = scope.component.enabled && component.enabled;
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
            template: "<div id='listComponentContrainer' class='list-component-container'>" +
                "<label id='listComponentLabel' class='list-component-label'/>" +
                "<select id='listComponent' class='list-component' " +
                "ng-disabled='!component.enabled'/>" +
                "</div>",
            link: function (scope, element, attrs) {

              var efc = new EasyFormComponent(
                  scope, element, EasyFormConstants, EasyFormService, bkUtils);

              efc.buildUI = function() {
                element.find('#listComponentLabel').text(efc.getComponent().label);
                var listComponent = element.find('#listComponent');
                listComponent.attr('ng-model', scope.ngModelAttr);

                if ('true' === efc.getComponent().multipleSelection) {
                  listComponent.attr('multiple', 'true');
                }

                if (efc.getComponent().size && efc.getComponent().size > 0) {
                  listComponent.attr('size', efc.getComponent().size);
                } else if (efc.getComponent().values && efc.getComponent().values.length > 0) {
                  listComponent.attr('size', efc.getComponent().values.length);
                } else {
                  listComponent.attr('size', 1);
                }

                if (efc.getComponent().values) {
                  listComponent.attr('ng-options', 'v for v in component.values');
                }
              };

              efc.prepareValueForSave = function(value) {
                if ('true' === efc.getComponent().multipleSelection) {
                  value = '[' + value.join(', ') + ']';
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
            template: "<div id='radioButtonComponentContrainer' class='radio-button-container'>" +
                "<label id='radioButtonComponentLabel' class='radio-button-label'/>" +
                "</div>",
            link: function (scope, element, attrs) {

              var efc = new EasyFormComponent(
                  scope, element, EasyFormConstants, EasyFormService, bkUtils);

              efc.buildUI = function() {
                element.find('#radioButtonComponentLabel').text(efc.getComponent().label);

                if (efc.getComponent().values && efc.getComponent().values.length > 0) {
                  var container = element.find('#radioButtonComponentContrainer');
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
                        angular.element('<span class="radio-button-item-text"></span>')
                            .addClass(horizontal ? 'horizontal' : 'vertical');
                    textSpanElement.text(value);
                    outerRadioButtonLabel.append(textSpanElement).append(radioButton);
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
            template: "<div id='datePickerComponentContrainer' class='date-picker-container'>" +
                "<label id='datePickerLabel' class='date-picker-label'/>" +
                "<input type='date' id='datePicker' class='date-picker' " +
                " ng-disabled='!component.enabled'/>" +
                "</div>",
            link: function (scope, element, attrs) {

              var efc = new EasyFormComponent(
                  scope, element, EasyFormConstants, EasyFormService, bkUtils);

              efc.buildUI = function() {
                element.find('#datePickerLabel').text(efc.getComponent().label);
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
                  easyFormContainer = legendElement;
                }

                if (model.components) {
                  model.components.forEach(function (component) {

                    var childScope = $scope.$new();
                    childScope.component = component;
                    childScope.formId = $scope.update_id;
                    childScope.evaluatorId = $scope.model.getEvaluatorId();
                    var newElement = angular.element(EasyFormConstants.Components[component.type].htmlTag);
                    childScope.component.enabled = childScope.component.enabled ? true : false;
                    easyFormContainer.append($compile(newElement)(childScope));

                    if (!(component.type.includes(EasyFormConstants.Components.SaveValuesButton.type)
                        || component.type.includes(EasyFormConstants.Components.LoadValuesButton.type))) {
                      EasyFormService.addComponent(component);
                    }

                  });
                }

              };

              $scope.$on('$destroy', function () {
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
        MIN_WIDTH: 50
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