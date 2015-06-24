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
  module.directive("easyFormTextField",
      ['$compile', 'bkUtils', 'bkSessionManager', 'EasyFormConstants', 'EasyFormService',
        function ($compile, bkUtils, bkSessionManager, EasyFormConstants, EasyFormService) {
          return {
            restrict: "E",
            template: "<div id='textFieldContrainer' class='text-field-container'>" +
                "<label id='textFieldLabel' class='text-field-label'/>" +
                "<input type='text' id='textField' class='text-field' " +
                "data-ng-disabled='!component.enabled'/>" +
                "</div>",
            link: function (scope, element, attrs) {

              var component = scope.component;
              scope.componentId = component.label;
              scope.ngModelAttr = bkUtils.getValidNgModelString(component.label);

              if (!component.width
                  || component.width < EasyFormConstants.Components.TextField.MIN_WIDTH) {
                component.width = EasyFormConstants.Components.TextField.MIN_WIDTH;
              }
              element.find('#textFieldLabel').text(component.label);
              var textField = element.find('#textField');
              textField.attr('data-ng-model', scope.ngModelAttr)
                  .css('width', component.width);

              if (component.value) {
                scope[scope.ngModelAttr] = component.value;
              }

              var watchedExpression = function (scope) {
                return scope[scope.ngModelAttr];
              };

              var valueChangeHandler = function (newValue, oldValue) {
                if (newValue != undefined && newValue != null) {
                  EasyFormService.setComponentValue(
                      scope.formId, scope.evaluatorId, component, newValue);
                }
              };

              scope.$watch(watchedExpression, valueChangeHandler);

              scope.$on(EasyFormConstants.Events.UPDATED, function (event, args) {
                args.components.forEach(function(component) {
                  if (component.label === scope.componentId) {
                    scope[scope.ngModelAttr] = component.value;
                    scope.component.enabled = component.enabled;
                  }
                });
              });

              scope.$on(EasyFormConstants.Events.VALUE_LOADED, function (event, args) {
                scope[scope.ngModelAttr] = EasyFormService.getComponentValue(component);
              });

              $compile(element.contents())(scope);
            }
          };
        }]);
})();

(function () {
  'use strict';
  var module = angular.module('bk.outputDisplay');
  module.directive("easyFormTextArea",
      ['$compile', 'bkUtils', 'bkSessionManager', 'EasyFormConstants', 'EasyFormService',
        function ($compile, bkUtils, bkSessionManager, EasyFormConstants, EasyFormService) {
          return {
            restrict: "E",
            template: "<div id='textAreaContrainer' class='text-area-container'>" +
                "<label id='textAreaLabel' class='text-area-label'/>" +
                "<textarea rows='4' cols='35' id='textArea' class='text-area' "
                + "data-ng-disabled='!component.enabled'/>" +
                "</div>",
            link: function (scope, element, attrs) {
              var component = scope.component;
              scope.componentId = component.label;
              scope.ngModelAttr = bkUtils.getValidNgModelString(component.label);

              element.find('#textAreaLabel').text(component.label);
              var textArea = element.find('#textArea');
              textArea.attr('data-ng-model', scope.ngModelAttr);

              if (component.value) {
                scope[scope.ngModelAttr] = component.value;
              }

              var watchedExpression = function (scope) {
                return scope[scope.ngModelAttr];
              };

              var valueChangeHandler = function (newValue, oldValue) {
                if (newValue != undefined && newValue != null) {
                  EasyFormService.setComponentValue(
                      scope.formId, scope.evaluatorId, component, newValue);
                }
              };
              scope.$watch(watchedExpression, valueChangeHandler);

              scope.$on(EasyFormConstants.Events.UPDATED, function (event, args) {
                args.components.forEach(function(component) {
                  if (component.label === scope.componentId) {
                    scope[scope.ngModelAttr] = component.value;
                    scope.component.enabled = component.enabled;
                  }
                });
              });

              scope.$on(EasyFormConstants.Events.VALUE_LOADED, function (event, args) {
                scope[scope.ngModelAttr] = EasyFormService.getComponentValue(component);
              });

              $compile(element.contents())(scope);
            }
          };
        }]);
})();

(function () {
  'use strict';
  var module = angular.module('bk.outputDisplay');
  module.directive("easyFormCheckBox",
      ['$compile', 'bkUtils', 'bkSessionManager', 'EasyFormConstants', 'EasyFormService',
        function ($compile, bkUtils, bkSessionManager, EasyFormConstants, EasyFormService) {
          return {
            restrict: "E",
            template: "<div id='checkBoxContrainer' class='check-box-container'>" +
                "<label id='checkBoxLabel' class='check-box-label'/>" +
                "<input type='checkbox' id='checkBox' "
                + "data-ng-disabled='!component.enabled' class='check-box'/>" +
                "</div>",
            link: function (scope, element, attrs) {
              var component = scope.component;
              scope.componentId = component.label;
              scope.ngModelAttr = bkUtils.getValidNgModelString(component.label);

              element.find('#checkBoxLabel').text(component.label);
              var checkBox = element.find('#checkBox');

              checkBox.attr('data-ng-model', scope.ngModelAttr);
              scope[scope.ngModelAttr] = false;

              if (component.value && 'true' == component.value) {
                scope[scope.ngModelAttr] = true;
                checkBox.attr('checked', 'true');
              }

              var watchedExpression = function (scope) {
                return scope[scope.ngModelAttr];
              };
              var valueChangeHandler = function (newValue, oldValue) {
                if (newValue != undefined && newValue != null) {
                  EasyFormService.setComponentValue(
                      scope.formId, scope.evaluatorId, component, newValue);
                }
              };
              scope.$watch(watchedExpression, valueChangeHandler);

              scope.$on(EasyFormConstants.Events.UPDATED, function (event, args) {
                args.components.forEach(function(component) {
                  if (component.label === scope.componentId) {
                    scope[scope.ngModelAttr] = component.value;
                    scope.component.enabled = component.enabled;
                  }
                });
              });

              scope.$on(EasyFormConstants.Events.VALUE_LOADED, function (event, args) {
                scope[scope.ngModelAttr] = EasyFormService.getComponentValue(component);
              });

              $compile(element.contents())(scope);
            }
          };
        }]);
})();
(function () {
  'use strict';
  var module = angular.module('bk.outputDisplay');
  module.directive('easyFormCheckBoxGroup',
      ['$compile', 'bkUtils', 'bkSessionManager', 'EasyFormConstants', 'EasyFormService',
        function ($compile, bkUtils, bkSessionManager, EasyFormConstants, EasyFormService) {
          return {
            restrict: "E",
            template: "<div id='checkBoxGroupContainer' class='check-box-group-container'>" +
                "<label id='checkBoxGroupLabel' class='check-box-group-label'/>" +
                "<label class='check-box-group-item-label'" +
                " data-ng-repeat='(value,enabled) in values track by $index' " +
                " ng-class='{vertical : !horizontal}'>" +
                "<input type='checkbox' data-ng-model='values[value]' " +
                " data-ng-disabled='!component.enabled'> {{value}}" +
                "</label>" +
                "</div>",
            link: function (scope, element, attrs) {
              var component = scope.component;
              scope.values = [];
              if (component.values && component.values.length > 0) {
                component.values.forEach(function (value) {
                  var obj = new Object();
                  obj[value] = false;
                  scope.values.push(obj);
                });
              }
              scope.componentId = component.label;
              scope.ngModelAttr = bkUtils.getValidNgModelString(component.label);

              if (component.value) {
                scope[scope.ngModelAttr] = component.value;
              }

              element.find('#checkBoxGroupLabel').text(component.label);
              scope.horizontal
                  = component.isHorizontal && 'true' == component.isHorizontal.toString();

              var watchedExpression = function (scope) {
                return scope.values;
              };

              var valueChangeHandler = function (newValue, oldValue) {
                if (newValue != undefined && newValue != null) {
                  EasyFormService.setComponentValue(
                      scope.formId, scope.evaluatorId, component, newValue);
                }
              };
              scope.$watch(watchedExpression, valueChangeHandler);

              scope.$on(EasyFormConstants.Events.UPDATED, function (event, args) {
                args.components.forEach(function(component) {
                  if (component.label === scope.componentId) {
                    scope[scope.ngModelAttr] = component.value;
                    scope.component.enabled = component.enabled;
                  }
                });
              });

              scope.$on(EasyFormConstants.Events.VALUE_LOADED, function (event, args) {
                scope.values = JSON.parse(EasyFormService.getComponentValue(component));
              });
              $compile(element.contents())(scope);
            }
          };
        }]);
})();

(function () {
  'use strict';
  var module = angular.module('bk.outputDisplay');
  module.directive("easyFormComboBox",
      ['$compile', 'bkUtils', 'bkSessionManager', 'EasyFormConstants', 'EasyFormService',
        function ($compile, bkUtils, bkSessionManager, EasyFormConstants, EasyFormService) {
          return {
            restrict: "E",
            template: "<div id='comboBoxContrainer' class='combo-box-container'>" +
                "<label id='comboBoxLabel' class='combo-box-label'/>" +
                "<select id='comboBox' class='combo-box' data-ng-disabled='!component.enabled'/>" +
                "</div>",
            link: function (scope, element, attrs) {
              var component = scope.component;
              scope.componentId = component.label;
              scope.ngModelAttr = bkUtils.getValidNgModelString(component.label);

              if (component.value) {
                scope[scope.ngModelAttr] = component.value;
              }

              element.find('#comboBoxLabel').text(component.label);
              var comboBox = element.find('#comboBox');

              comboBox.attr('data-ng-model', scope.ngModelAttr);

              if (!component.editable || 'false' == component.editable) {
                scope.component.enabled = false;
              }

              if (component.values) {
                comboBox.attr('ng-options', 'v for v in component.values');
              }

              var watchedExpression = function (scope) {
                return scope[scope.ngModelAttr];
              };

              var valueChangeHandler = function (newValue, oldValue) {
                if (newValue != undefined && newValue != null) {
                  EasyFormService.setComponentValue(
                      scope.formId, scope.evaluatorId, component, newValue);
                }
              };
              scope.$watch(watchedExpression, valueChangeHandler);

              scope.$on(EasyFormConstants.Events.UPDATED, function (event, args) {
                args.components.forEach(function(component) {
                  if (component.label === scope.componentId) {
                    scope[scope.ngModelAttr] = component.value;
                    scope.component.enabled = component.enabled;
                  }
                });
              });

              scope.$on(EasyFormConstants.Events.VALUE_LOADED, function (event, args) {
                var loadedValue = EasyFormService.getComponentValue(component);
                if (loadedValue) {
                  scope[scope.ngModelAttr] = JSON.parse(loadedValue);
                }
              });

              $compile(element.contents())(scope);
            }
          };
        }]);
})();

(function () {
  'use strict';
  var module = angular.module('bk.outputDisplay');
  module.directive("easyFormListComponent",
      ['$compile', 'bkUtils', 'bkSessionManager', 'EasyFormConstants', 'EasyFormService',
        function ($compile, bkUtils, bkSessionManager, EasyFormConstants, EasyFormService) {
          return {
            restrict: "E",
            template: "<div id='listComponentContrainer' class='list-component-container'>" +
                "<label id='listComponentLabel' class='list-component-label'/>" +
                "<select id='listComponent' class='list-component' " +
                "data-ng-disabled='!component.enabled'/>" +
                "</div>",
            link: function (scope, element, attrs) {
              var component = scope.component;
              scope.componentId = component.label;
              scope.ngModelAttr = bkUtils.getValidNgModelString(component.label);

              if (component.value) {
                scope[scope.ngModelAttr] = component.value;
              }

              element.find('#listComponentLabel').text(component.label);
              var listComponent = element.find('#listComponent');

              listComponent.attr('data-ng-model', scope.ngModelAttr);

              if (component.multipleSelection && 'true' == component.multipleSelection) {
                listComponent.attr('multiple', 'true');
              }

              if (component.size && component.size > 0) {
                listComponent.attr('size', component.size);
              } else if (component.values && component.values.length > 0) {
                listComponent.attr('size', component.values.length);
              } else {
                listComponent.attr('size', 1);
              }

              if (component.values) {
                listComponent.attr('ng-options', 'v for v in component.values');
              }

              var watchedExpression = function (scope) {
                return scope[scope.ngModelAttr];
              };

              var valueChangeHandler = function (newValue, oldValue) {
                if (newValue != undefined && newValue != null) {
                  EasyFormService.setComponentValue(
                      scope.formId, scope.evaluatorId, component, newValue);
                }
              };
              scope.$watch(watchedExpression, valueChangeHandler);

              scope.$on(EasyFormConstants.Events.UPDATED, function (event, args) {
                args.components.forEach(function(component) {
                  if (component.label === scope.componentId) {
                    scope[scope.ngModelAttr] = component.value;
                    scope.component.enabled = component.enabled;
                  }
                });
              });

              scope.$on(EasyFormConstants.Events.VALUE_LOADED, function (event, args) {
                var loadedValue = EasyFormService.getComponentValue(component);
                if (loadedValue) {
                  scope[scope.ngModelAttr] = JSON.parse(loadedValue);
                }
              });

              $compile(element.contents())(scope);
            }
          };
        }]);
})();

(function () {
  'use strict';
  var module = angular.module('bk.outputDisplay');
  module.directive("easyFormRadioButtonComponent",
      ['$compile', 'bkUtils', 'bkSessionManager', 'EasyFormConstants', 'EasyFormService',
        function ($compile, bkUtils, bkSessionManager, EasyFormConstants, EasyFormService) {
          return {
            restrict: "E",
            template: "<div id='radioButtonComponentContrainer' class='radio-button-container'>" +
                "<label id='radioButtonComponentLabel' class='radio-button-label'/>" +
                "</div>",
            link: function (scope, element, attrs) {
              var component = scope.component;
              scope.componentId = component.label;
              scope.ngModelAttr = bkUtils.getValidNgModelString(component.label);

              if (component.value) {
                scope[scope.ngModelAttr] = component.value;
              }

              element.find('#radioButtonComponentLabel').text(component.label);

              if (component.values && component.values.length > 0) {
                var container = element.find('#radioButtonComponentContrainer');

                var horizontal
                    = component.isHorizontal && 'true' == component.isHorizontal.toString();

                var radioButtonItemsContainer
                    = angular.element('<div class="radio-button-items-container"></div>');

                component.values.forEach(function (value) {
                  var outerRadioButtonLabel
                      = angular.element('<label class="radio-button-item-label"></label>');
                  outerRadioButtonLabel.addClass(horizontal ? 'horizontal' : 'vertical');
                  var radioButton
                      = angular.element('<input type="radio" class="radio-button-component-item"'
                      + ' data-ng-disabled="!component.enabled"/>')
                      .attr('data-ng-model', scope.ngModelAttr)
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

              var watchedExpression = function (scope) {
                return scope[scope.ngModelAttr];
              };

              var valueChangeHandler = function (newValue, oldValue) {
                if (newValue != undefined && newValue != null) {
                  EasyFormService.setComponentValue(
                      scope.formId, scope.evaluatorId, component, newValue);
                }
              };
              scope.$watch(watchedExpression, valueChangeHandler);

              scope.$on(EasyFormConstants.Events.UPDATED, function (event, args) {
                args.components.forEach(function(component) {
                  if (component.label === scope.componentId) {
                    scope[scope.ngModelAttr] = component.value;
                    scope.component.enabled = component.enabled;
                  }
                });
              });

              scope.$on(EasyFormConstants.Events.VALUE_LOADED, function (event, args) {
                scope[scope.ngModelAttr] = EasyFormService.getComponentValue(component);
              });

              $compile(element.contents())(scope);
            }
          };
        }]);
})();

(function () {
  'use strict';
  var module = angular.module('bk.outputDisplay');
  module.directive("easyFormDatePickerComponent",
      ['$compile', 'bkUtils', 'bkSessionManager', 'EasyFormConstants', 'EasyFormService',
        function ($compile, bkUtils, bkSessionManager, EasyFormConstants, EasyFormService) {
          return {
            restrict: "E",
            template: "<div id='datePickerComponentContrainer' class='date-picker-container'>" +
                "<label id='datePickerLabel' class='date-picker-label'/>" +
                "<input type='date' id='datePicker' class='date-picker' " +
                " data-ng-disabled='!component.enabled'/>" +
                "</div>",
            link: function (scope, element, attrs) {
              var component = scope.component;
              scope.componentId = component.label;
              scope.ngModelAttr = bkUtils.getValidNgModelString(component.label);

              if (component.value) {
                scope[scope.ngModelAttr] = component.value;
              }

              element.find('#datePickerLabel').text(component.label);
              var datePicker = element.find('#datePicker');
              datePicker.attr('data-ng-model', scope.ngModelAttr);

              if (component.showTime && 'true' == component.showTime) {
                datePicker.attr('type', 'datetime');
              }

              var watchedExpression = function (scope) {
                return scope[scope.ngModelAttr];
              };

              var valueChangeHandler = function (newValue, oldValue) {
                if (newValue != undefined && newValue != null) {
                  EasyFormService.setComponentValue(
                      scope.formId, scope.evaluatorId, component, newValue);
                }
              };
              scope.$watch(watchedExpression, valueChangeHandler);

              scope.$on(EasyFormConstants.Events.UPDATED, function (event, args) {
                args.components.forEach(function(component) {
                  if (component.label === scope.componentId) {
                    scope[scope.ngModelAttr] = component.value;
                    scope.component.enabled = component.enabled;
                  }
                });
              });

              scope.$on(EasyFormConstants.Events.VALUE_LOADED, function (event, args) {
                scope[scope.ngModelAttr] = EasyFormService.getComponentValue(component);
              });

              $compile(element.contents())(scope);
            }
          };
        }]);
})();

(function () {
  'use strict';
  var module = angular.module('bk.outputDisplay');
  module.directive("easyFormButtonComponent",
      ['$compile', 'bkUtils', 'bkSessionManager', 'EasyFormConstants', 'EasyFormService',
        'bkCoreManager',
        function ($compile, bkUtils, bkSessionManager, EasyFormConstants, EasyFormService,
                  bkCoreManager) {
          return {
            restrict: "E",
            template: "<div id='buttonComponentContrainer' class='button-component-container'>" +
                "<button type='button' id='buttonComponent' class='button-component' " +
                "data-ng-disabled='!component.enabled'/>" +
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

              scope.$on(EasyFormConstants.Events.SET_ENABLED, function (event, args) {
                var session = args.data.session;
                var label = args.data.label;
                if (session && session == bkSessionManager.getSessionId()
                    && label && label == scope.ngModelAttr) {
                  scope.component.enabled = args.data.enabled;
                }
              })

            }
          };
        }]);
})();

(function () {
  'use strict';
  var retfunc = function ($compile, bkUtils, bkEvaluatorManager, bkSessionManager,
                          EasyFormConstants, EasyFormService) {
    return {
      template: "<div id='easyFormContainer' class='easy-form-container'></div>",

      controller: function($scope) {
        $scope.getUpdateService = function() {
          if (window !== undefined && window.languageUpdateService !== undefined
              && bkEvaluatorManager.getEvaluator($scope.model.getEvaluatorId())!==undefined)
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
            var onUpdate = function(update) {
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

        scope.getState = function() {
          return scope.model.getCellModel();
        };

        scope.fetchFromCellModel(scope.getState(), element);

      }
    };
  };
  beaker.bkoDirective("EasyForm",
      ['$compile', 'bkUtils', 'bkEvaluatorManager', 'bkSessionManager', 'EasyFormConstants', 'EasyFormService',
        retfunc]);
})();

(function () {
  var module = angular.module('bk.outputDisplay');

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