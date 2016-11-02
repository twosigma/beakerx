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

  (function ($) {
    $.widget("custom.combobox", {
      options: {
        change: null,
        disabled: false
      },
      _create: function () {
        this.editable = this.element.attr('easyform-editable') === 'true';
        this.wrapper = $("<span>")
            .addClass("custom-combobox")
            .insertAfter(this.element);

        this.element.hide();
        this._createAutocomplete();
        this._createShowAllButton();
      },

      _createAutocomplete: function () {
        var selected = this.element.children(":selected"),
            value = selected.val() ? selected.text() : "";

        this.input = $("<input>")
            .appendTo(this.wrapper)
            .val(value)
            .attr("title", "")
            .attr("ng-model", this.element.attr('ng-model'))
            .addClass("custom-combobox-input ui-widget ui-widget-content ui-corner-left")
            .autocomplete({
              delay: 0,
              minLength: 0,
              source: $.proxy(this, "_source")
            })
            .tooltip({
              tooltipClass: "ui-state-highlight"
            });

        this.element.removeAttr('ng-model');

        if (!this.editable) {
          this.input.attr('readonly', 'true');
          var input = this.input, wasOpen = false;
          this.input
              .mousedown(function () {
                wasOpen = input.autocomplete("widget").is(":visible");
              })
              .click(function () {
                input.focus();
                if (wasOpen) {
                  return;
                }
                input.autocomplete("search", "");
              });
        }

        if(this.options.disabled){
          this.input.attr('disabled', 'disabled');
        }

        this._on(this.input, {
          autocompleteselect: function (event, ui) {
            ui.item.option.selected = true;
            this._trigger("select", event, {
              item: ui.item.option
            });
            if ($.isFunction(this.options.change)) {
              this.options.change(ui.item.option.value);
            }
          }
        });
      },

      _createShowAllButton: function () {
        var input = this.input,
            wasOpen = false;

        //use jquery button fn instead of bootstrap
        //reverts to jquery button fn
        var bootstrapButtonFn = $.fn.button.noConflict();

        var self = this;
        var showAllButton = $("<a>")
            .attr("tabIndex", -1)
            .attr("title", "Show All Items")
            .appendTo(this.wrapper)
            .button({
              icons: {
                primary: "ui-icon-triangle-1-s"
              },
              text: false
            })
            .removeClass("ui-corner-all")
            .addClass("custom-combobox-toggle ui-corner-right")
            .mousedown(function () {
              if (!self.options.disabled) {
                wasOpen = input.autocomplete("widget").is(":visible");
              }
            })
            .click(function () {
              if (!self.options.disabled) {
                input.focus();
                if (wasOpen) {
                  return;
                }
                input.autocomplete("search", "");
              }
            });

        if (self.options.disabled) {
          showAllButton.attr("disabled", "disabled");
        } else {
          showAllButton.removeAttr("disabled");
        }

        //return to bootstrap button fn
        $.fn.button = bootstrapButtonFn;
      },

      _source: function (request, response) {
        var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
        response(this.element.children("option").map(function () {
          var text = $(this).text();
          if (this.value && ( !request.term || matcher.test(text) ))
            return {
              label: text,
              value: text,
              option: this
            };
        }));
      },

      _destroy: function () {
        this.wrapper.remove();
        this.element.show();
      }
    });
  })(jQuery);

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
        component.value = newValue;
        service.setComponentValue(scope.formId, scope.evaluatorId, component, newValue);
      }
    };

    this.prepareValueForSave = function(value) {
      return value;
    };

    this.buildUI = function () {};

    this.initValue = function (component) {
      if (component.value) {
        scope[scope.ngModelAttr] = component.value;
      }
    };

    this.init = function() {
      component = scope.component;
      scope.componentId = component.label;
      scope.id = scope.componentId.toLowerCase().replace(/\s/g, '');
      scope.ngModelAttr = utils.getValidNgModelString(component.label);

      this.buildUI();

      this.initValue(component);

      if (scope.evaluatorExist) {
        scope.$watch(this.watchedExpression,
            this.valueChangeHandler,
            this.isWatchByObjectEquality());
      }
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
          scope[scope.ngModelAttr] = service.getComponentValue(scope.formId, component);
        });
      });
    };
  };

  module.directive("easyFormTextField",
      ['$compile', 'bkUtils', 'EasyFormConstants', 'EasyFormService',
        function ($compile, bkUtils, EasyFormConstants, EasyFormService) {
          return {
            restrict: "E",
            template:
                "<div class='easyform-container'>" +
                  "<label class='easyform-label'/>" +
                  "<div class='easyform-component-container'>" +
                    "<input type='text' class='text-field' ng-disabled='!component.enabled'/>" +
                  "</div>" +
                "</div>",
            link: function (scope, element, attrs) {

              var efc = new EasyFormComponent(
                  scope, element, EasyFormConstants, EasyFormService, bkUtils);

              efc.buildUI = function() {
                var fixedSize = false;
                if (!efc.getComponent().width
                    || parseInt(efc.getComponent().width)
                      < efc.constants.Components.TextField.MIN_WIDTH) {
                  efc.getComponent().width = efc.constants.Components.TextField.MIN_WIDTH;
                } else {
                  fixedSize = true;
                }
                element.find('.easyform-label').text(efc.getComponent().label);
                var textField = element.find('.text-field');
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
            template:
                "<div class='easyform-container'>" +
                  "<label class='easyform-label'/>" +
                  "<div class='easyform-component-container'>" +
                    "<textarea class='text-area' ng-disabled='!component.enabled'/>" +
                  "</div>" +
                "</div>",
            link: function (scope, element, attrs) {

              var efc = new EasyFormComponent(
                  scope, element, EasyFormConstants, EasyFormService, bkUtils);

              efc.buildUI = function() {
                var fixedSize = false;
                if (!efc.getComponent().height
                    || parseInt(efc.getComponent().height)
                      < efc.constants.Components.TextArea.MIN_HEIGHT) {
                  efc.getComponent().height = efc.constants.Components.TextArea.MIN_HEIGHT;
                }
                if (!efc.getComponent().width
                    || parseInt(efc.getComponent().width)
                      < efc.constants.Components.TextArea.MIN_WIDTH) {
                  efc.getComponent().width = efc.constants.Components.TextArea.MIN_WIDTH;
                } else {
                  fixedSize = true;
                }
                element.find('.easyform-label').text(efc.getComponent().label);
                var textArea = element.find('.text-area');
                textArea
                    .attr('ng-model', scope.ngModelAttr)
                    .attr('rows', efc.getComponent().height);
                if (fixedSize) {
                  element.find('.easyform-component-container').addClass('fixed-size');
                  textArea.css('width', parseInt(efc.getComponent().width) + 1.5 + 'ch');
                }
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
            template:
                "<div class='easyform-container'>" +
                  "<div class='easyform-component-container'>" +
                    "<input type='checkbox' ng-disabled='!component.enabled' class='check-box'/>" +
                    "<label class='easyform-label'/>" +
                  "</div>" +
                "</div>",
            link: function (scope, element, attrs) {

              var efc = new EasyFormComponent(
                  scope, element, EasyFormConstants, EasyFormService, bkUtils);

              efc.buildUI = function() {
                element.find('.easyform-label').text(efc.getComponent().label).attr('for', scope.id);
                var checkBox = element.find('.check-box');
                checkBox.attr('ng-model', scope.ngModelAttr);
                checkBox.attr('id', scope.id);
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
            template:
                "<div class='easyform-container'>" +
                  "<label class='easyform-label'/>" +
                  "<div class='easyform-component-container'>" +
                    "<div class='check-box-group-item'" +
                    " ng-repeat='value in values track by $index' " +
                    " ng-class='{horizontal : !!horizontal}'>" +
                    " <input type='checkbox' id='{{value.id}}' ng-model='value.selected' name='selectedValues[]' " +
                    " ng-disabled='!component.enabled'/>" +
                    " <label for='{{value.id}}' class='check-box-group-item-label' ng-bind='value.name'/>" +
                    "</div>" +
                  "</div>" +
                "</div>",
            link: function (scope, element, attrs) {

              var efc = new EasyFormComponent(
                  scope, element, EasyFormConstants, EasyFormService, bkUtils);

              efc.buildUI = function() {
                scope.values = [];
                if (efc.getComponent().values && efc.getComponent().values.length > 0) {
                  efc.getComponent().values.forEach(function (value) {
                    var valuePostfix = value.toLowerCase().replace(/\s+/g, '');
                    var obj = {
                      name: value,
                      selected: false,
                      id: scope.id + valuePostfix
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
                  var loadedValue = efc.service.getComponentValue(scope.formId, efc.getComponent());
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
                "<div class='easyform-container'>" +
                  "<label class='easyform-label'/>" +
                  "<div class='easyform-component-container position-absolute'>" +
                    "<div class='combo-box-input-outer'>" +
                      "<div class='combo-box-outer'>" +
                        "<select class='combo-box' ng-disabled='!component.enabled'>" +
                          "<option ng-repeat='value in values' value='{{value}}'>" +
                            "{{value}}" +
                          "</option>" +
                        "</select>" +
                      "</div>" +
                    "</div>" +
                  "</div>" +
                "</div>",
            link: function (scope, element, attrs) {

              var efc = new EasyFormComponent(
                  scope, element, EasyFormConstants, EasyFormService, bkUtils);

              efc.buildUI = function() {
                element.find('.easyform-label').text(efc.getComponent().label);
                var comboBox = element.find('.combo-box');
                comboBox.attr('ng-model', scope.ngModelAttr);

                var editable = efc.getComponent().editable
                    && efc.getComponent().editable === 'true';
                comboBox.attr('easyform-editable', editable);
                comboBox.combobox({change : efc.valueChangeHandler, disabled: !scope.component.enabled});
                if (editable && efc.getComponent().width
                    && parseInt(efc.getComponent().width)
                        > efc.constants.Components.ComboBox.MIN_WIDTH) {
                  element.find('.custom-combobox-input')
                      .css('width', parseInt(efc.getComponent().width) + 1 + 'ch');
                }

                if (!efc.getComponent().values) {
                  efc.getComponent().values = [];
                }
                scope.values = efc.getComponent().values;
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
                  var loadedValue = efc.service.getComponentValue(scope.formId, efc.getComponent());
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
                "<div class='easyform-container'>" +
                  "<label class='easyform-label'/>" +
                  "<div class='easyform-component-container'>" +
                    "<div class='list-component-outer'>" +
                      "<select class='list-component' ng-disabled='!component.enabled'/>" +
                    "</div>" +
                  "</div>" +
                "</div>",
            link: function (scope, element, attrs) {

              var setListComponentValue = function(component) {
                if (component.value) {
                  scope[scope.ngModelAttr] =
                    'true' === efc.getComponent().multipleSelection
                      ? component.value.substring(1, component.value.length - 1).split(', ')
                      : component.value;
                }
              };

              var efc = new EasyFormComponent(
                  scope, element, EasyFormConstants, EasyFormService, bkUtils);

              efc.initValue = function (component) {
                setListComponentValue(component);
              };

              efc.buildUI = function() {
                element.find('.easyform-label').text(efc.getComponent().label);
                var listComponent = element.find('.list-component');
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
                        setListComponentValue(component);
                        scope.component.enabled = component.enabled;
                      });
                    }
                  });
                });
              };

              efc.addValueLoadedListener = function() {
                efc.addListener(efc.constants.Events.VALUE_LOADED, function(event, args) {
                  var loadedValue = efc.service.getComponentValue(scope.formId, efc.getComponent());
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
                "<div class='easyform-container'>" +
                  "<label class='easyform-label'/>" +
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
                    var valuePostfix = value.toLowerCase().replace(/\s+/g, '');
                    var outerRadioButtonWrap
                        = angular.element('<div class="radio-button-item"></div>');
                    var outerRadioButtonLabel
                        = angular.element('<label class="radio-button-item-label"></label>');
                    outerRadioButtonWrap.addClass(horizontal ? 'horizontal' : 'vertical');
                    var radioButton
                        = angular.element('<input type="radio" class="radio-button-component-item"'
                        + ' ng-disabled="!component.enabled"/>')
                        .attr('ng-model', scope.ngModelAttr)
                        .attr('value', value)
                        .attr('id', scope.id + valuePostfix);
                    outerRadioButtonLabel.attr('for', scope.id + valuePostfix).text(value);
                    var divSpacer = angular.element('<div class="radio-button-item-spacer"/>');
                    outerRadioButtonWrap.append(radioButton).append(outerRadioButtonLabel).append(divSpacer);
                    radioButtonItemsContainer.append(outerRadioButtonWrap);
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
                "<div class='easyform-container'>" +
                  "<label class='easyform-label'/>" +
                  "<div class='easyform-component-container datepicker-container'>" +
                    "<input type='text' class='date-picker' ng-disabled='!component.enabled'/>" +
                    "<a tabindex='-1' title='Select date' class='date-picker-button ui-button ui-widget ui-state-default ui-button-icon-only custom-combobox-toggle ui-corner-right' role='button' aria-disabled='false'>" +
                      "<span class='ui-button-icon-primary ui-icon ui-icon-triangle-1-s'></span><span class='ui-button-text'></span>" +
                    "</a>" +
                  "</div>" +
                "</div>",
            link: function (scope, element, attrs) {

              var efc = new EasyFormComponent(
                  scope, element, EasyFormConstants, EasyFormService, bkUtils);

              efc.buildUI = function() {
                element.find('.easyform-label').text(efc.getComponent().label);

                var datePicker = element.find('.date-picker');
                datePicker.attr('ng-model', scope.ngModelAttr);

                var datePickerButtonClicked = false;
                var onShowHandler = function() {
                  return datePickerButtonClicked;
                };
                var onCloseHandler = function() {
                  datePickerButtonClicked = false;
                  return true;
                }

                datePicker.attr('maxlength',
                    EasyFormConstants.Components.DatePickerComponent.inputLength);

                if (true === efc.getComponent().showTime) {
                  datePicker.datetimepicker({
                    format: EasyFormConstants.Components.DatePickerComponent.dateTimeFormat,
                    onShow: onShowHandler,
                    onClose: onCloseHandler,
                    allowBlank: true
                  });
                } else {
                  datePicker.datetimepicker({
                    format: EasyFormConstants.Components.DatePickerComponent.dateFormat,
                    onShow: onShowHandler,
                    onClose: onCloseHandler,
                    timepicker: false,
                    allowBlank: true
                  });
                }

                var datePickerButton = element.find('.date-picker-button');
                datePickerButton.on("mousedown", function() {
                  event.stopPropagation();
                  event.preventDefault();
                });
                datePickerButton.click(function() {
                  if (scope.component.enabled) {
                    datePickerButtonClicked = true;
                    datePicker.datetimepicker("toggle");
                  }
                });
                if (scope.component.enabled) {
                  datePickerButton.removeAttr("disabled");
                } else {
                  datePickerButton.attr("disabled", "disabled");
                }
              };

              efc.init();
              $compile(element.contents())(scope);
            }
          };
        }]);

  module.directive("easyFormButtonComponent",
      ['$compile', 'bkUtils', 'bkSessionManager', 'EasyFormConstants', 'EasyFormService',
        'bkCoreManager', '$rootScope',
        function ($compile, bkUtils, bkSessionManager, EasyFormConstants, EasyFormService,
                  bkCoreManager, $rootScope) {
          return {
            restrict: "E",
            template:
                "<div class='button-component-container'>" +
                  "<button type='button' class='btn btn-default' " +
                  "ng-disabled='!component.enabled'/>" +
                "</div>",
            link: function (scope, element, attrs) {
              var component = scope.component;
              scope.component.enabled = component.enabled && scope.evaluatorExist;

              var executeCellWithTag = function () {
                var cellOp = bkSessionManager.getNotebookCellOp();
                var result;
                if (cellOp.hasUserTag(component.tag)) {
                  result = cellOp.getCellsWithUserTag(component.tag);
                  bkCoreManager.getBkApp().evaluateRoot(result)
                      .catch(function (data) {
                        console.log('Evaluation failed');
                      });
                }
              };

              var actionPerformed = function () {
                EasyFormService.sendActionPerformed(scope.formId, scope.evaluatorId,
                    component.label);
              };

              var saveValues = function () {
                var contentAsJson = JSON.stringify(EasyFormService.easyForms[scope.formId]);
                bkUtils.saveFile(component.path, contentAsJson, true);
              };

              var loadValues = function () {
                bkUtils.loadFile(component.path).then(function (contentAsJson) {
                  EasyFormService.easyForms[scope.formId] = JSON.parse(contentAsJson);
                  $rootScope.$broadcast(EasyFormConstants.Events.VALUE_LOADED);
                });
              };

              var buttonComponent = element.find('div.button-component-container button');

              if (EasyFormConstants.Components.ButtonComponent.type == component.type) {
                buttonComponent.text(component.label);
                if (component.tag && scope.evaluatorExist) {
                  buttonComponent.attr('title', component.tag).on('click', executeCellWithTag);
                }
                buttonComponent.on('click', actionPerformed);
                component.click = function() {
                  buttonComponent.click();
                };
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

  beakerRegister.bkoDirective("EasyForm",
      ['$compile', 'bkUtils', 'bkEvaluatorManager', 'bkSessionManager', 'EasyFormConstants',
        'EasyFormService',
        function ($compile, bkUtils, bkEvaluatorManager, bkSessionManager, EasyFormConstants,
                  EasyFormService) {
          return {
            template: "<div class='easy-form-container' bk-enter='clickRunButton()' skipfortag='TEXTAREA'></div>",

            controller: function ($scope) {
              $scope.evaluatorExist = $scope.model.getEvaluatorId && $scope.model.getEvaluatorId();


              $scope.clickRunButton = function () {
                if (event && event.target) {
                  var el = $(event.target);
                  var components = $scope.model.getCellModel().components;
                  if (components) {
                    var componentLabel = EasyFormService.getComponentLabel(
                        EasyFormService.getComponentElement(el));
                    if (componentLabel) {

                      var getComponentIndex = function (label) {
                        for (var i = 0; i < components.length; i++) {
                          if (components[i].label === label) {
                            return i;
                          }
                        }
                      };

                      var getNextButton = function (index) {
                        for (var i = index, component = components[index];
                             i < components.length; i++, component = components[i]) {
                          if (component.type === EasyFormConstants.Components.ButtonComponent.type) {
                            return component;
                          }
                        }
                      };

                      var index = getComponentIndex(componentLabel);
                      var button = getNextButton(index);

                      if (button) {
                        button.click();
                      }

                    }
                  }
                }
              };

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
                if ($scope.evaluatorExist) {
                  $scope.ingestUpdate(model);
                }
                var easyFormContainer = element.find('.easy-form-container');

                if (model.caption) {
                  var fieldsetElement = angular.element('<fieldset></fieldset>');
                  var legendElement = angular.element('<legend></legend>').text(model.caption);
                  easyFormContainer.append(fieldsetElement.append(legendElement));
                  easyFormContainer = fieldsetElement;
                }

                if (model.components) {
                  model.components.forEach(function (component) {
                    component.enabled = !_.isEmpty(model.update_id);
                    var childScope = $scope.$new();
                    childScope.component = component;
                    childScope.formId = $scope.update_id;
                    childScope.evaluatorExist = $scope.evaluatorExist;
                    if ($scope.evaluatorExist) {
                      childScope.evaluatorId = $scope.model.getEvaluatorId();
                    }
                    var newElement
                        = angular.element(EasyFormConstants.Components[component.type].htmlTag);
                    newElement.attr(EasyFormConstants.Attributes.EasyFormComponentID,
                        component.label);
                    childScope.component.enabled = childScope.component.enabled ? true : false;
                    easyFormContainer.append($compile(newElement)(childScope));

                    if ((component.type.indexOf(
                        EasyFormConstants.Components.SaveValuesButton.type) == -1
                        || component.type.indexOf(
                        EasyFormConstants.Components.LoadValuesButton.type) == -1)) {
                      EasyFormService.addComponent($scope.update_id, component);
                    }

                  });
                }

                $scope.alignComponents();

                if ($scope.evaluatorExist) {
                  EasyFormService.setReady($scope.update_id, $scope.model.getEvaluatorId());
                }
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
                if ($scope.evaluatorExist && $scope.subscribedId) {
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

  module.service('EasyFormService', ["EasyFormConstants", function (EasyFormConstants) {
    var service = {
      easyForms: {},
      addComponent: function (formId, component) {
        if (!this.easyForms[formId]) {
          this.easyForms[formId] = {};
        }
        this.easyForms[formId][component.label] = component;
      },
      setComponentValue: function (formId, evaluatorId, component, value) {
        if (!(this.easyForms[formId] && this.easyForms[formId].ready)) {
          return;
        }
        if (this.easyForms[formId][component.label]) {
          this.easyForms[formId][component.label].currentValue = value;
        }
        if (window.languageServiceBase && window.languageServiceBase[evaluatorId]) {
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
        }
      },
      getComponentValue: function (formId, component) {
        if (this.easyForms[formId] && this.easyForms[formId][component.label]) {
          return this.easyForms[formId][component.label].currentValue;
        }
      },
      setReady: function (formId, evaluatorId) {
        if (window.languageServiceBase && window.languageServiceBase[evaluatorId]) {
          var req = $.ajax({
            type: "POST",
            datatype: "json",
            url: window.languageServiceBase[evaluatorId] + '/easyform/setReady/' + formId
          });
          var self = this;
          req.done(function (ret) {
            self.easyForms[formId].ready = true;
          });
          req.error(function (jqXHR, textStatus) {
            console.log("Unable to set easyform ready.");
          });
        }
      },
      setNotReady: function(formId) {
        this.easyForms[formId].ready = false;
      },
      sendActionPerformed: function(formId, evaluatorId, label) {
        if (window.languageServiceBase && window.languageServiceBase[evaluatorId]) {
          var req = $.ajax({
            type: "POST",
            datatype: "json",
            url: window.languageServiceBase[evaluatorId] + '/easyform/actionPerformed/' + formId,
            data: {
              label: label
            }
          });
          req.done(function (ret) {
          });
          req.error(function (jqXHR, textStatus) {
            console.log("Unable to send information about action performed.");
          });
        }
      },
      getComponentElement: function(childElement) {
        var el = childElement;
        while (el != null && el.parent() && !el.prop('tagName').toLowerCase().startsWith("easy-form")) {
          el = el.parent();
        }
        if (el.prop('tagName').toLowerCase().startsWith("easy-form")) {
          return el;
        }
      },
      getComponentLabel: function(element) {
        if (element) {
          if (!element.jquery) {
            element = $(element);
          }
          return element.attr(EasyFormConstants.Attributes.EasyFormComponentID);
        }
      }
    };
    return service;
  }]);

  module.constant("EasyFormConstants", {
    Attributes: {
      EasyFormComponentID: "data-easyform-component-id"
    },
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
        htmlTag: "<easy-form-text-area/>",
        MIN_WIDTH: 1,
        MIN_HEIGHT: 3
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
        htmlTag: "<easy-form-combo-box/>",
        MIN_WIDTH: 1
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
        htmlTag: "<easy-form-date-picker-component/>",
        dateFormat: "Ymd",
        dateTimeFormat: "Ymd H:i",
        inputLength: 9
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