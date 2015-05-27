( function() {
    'use strict';
    var module = angular.module('bk.outputDisplay');
    module.directive("easyFormTextField", ['$compile', 'bkUtils', 'bkSessionManager', 'EasyFormConstants', function($compile, bkUtils, bkSessionManager, EasyFormConstants) {
        return {
            restrict : "E",
            template : "<div id='textFieldContrainer' class='text-field-container'>" +
                    "<label id='textFieldLabel' class='text-field-label'/>" +
                    "<input type='text' id='textField' class='text-field'/>" +
                    "</div>",
            link : function(scope, element, attrs) {
                var component = scope.component;
                var MIN_WIDTH = 50;
                if (!component.width || component.width < MIN_WIDTH) {
                    component.width = MIN_WIDTH;
                }
                scope.ngModelAttr = component.label;

                element.find('#textFieldLabel').text(component.label);
                var textField = element.find('#textField');
                textField.attr('data-easyform-label', component.label)
                         .attr('data-ng-model', component.label)
                         .css('width', component.width);

                if (component.enabled && component.enabled == false) {
                    textField.attr('disabled', 'true');
                }

                var watchedExpression = function (scope) {
                    return scope[scope.ngModelAttr];
                };
                var valueChangeHandler = function (newValue, oldValue) {
                    bkUtils.setEasyFormValue(scope.ngModelAttr, newValue, bkSessionManager.getSessionId());
                };
                scope.$watch(watchedExpression, valueChangeHandler);

                scope.$on(EasyFormConstants.Events.VALUE_SET, function(event, args) {
                    if (args && args.data) {
                        var session = args.data.session;
                        var name = args.data.name;
                        if (session && session == bkSessionManager.getSessionId()
                                && name && name == scope.ngModelAttr) {
                            scope[scope.ngModelAttr] = args.data.value;
                        }
                    }
                });

                $compile(element.contents())(scope);
            }
        };
    }]);
})();

( function() {
    'use strict';
    var module = angular.module('bk.outputDisplay');
    module.directive("easyFormTextArea", ['$compile', 'bkUtils', 'bkSessionManager', 'EasyFormConstants', function($compile, bkUtils, bkSessionManager, EasyFormConstants) {
        return {
            restrict : "E",
            template : "<div id='textAreaContrainer' class='text-area-container'>" +
                    "<label id='textAreaLabel' class='text-area-label'/>" +
                    "<textarea rows='4' cols='35' id='textArea' class='text-area'/>" +
                    "</div>",
            link : function(scope, element, attrs) {
                var component = scope.component;
                scope.ngModelAttr = component.label;

                element.find('#textAreaLabel').text(component.label);
                var textArea = element.find('#textArea');
                textArea.attr('data-easyform-label', component.label)
                        .attr('data-ng-model', component.label);

                if (component.enabled && component.enabled == false) {
                    textArea.attr('disabled', 'true');
                }

                var watchedExpression = function (scope) {
                    return scope[scope.ngModelAttr];
                };
                var valueChangeHandler = function (newValue, oldValue) {
                    bkUtils.setEasyFormValue(scope.ngModelAttr, newValue, bkSessionManager.getSessionId());
                };
                scope.$watch(watchedExpression, valueChangeHandler);

                scope.$on(EasyFormConstants.Events.VALUE_SET, function(event, args) {
                    if (args && args.data) {
                        var session = args.data.session;
                        var name = args.data.name;
                        if (session && session == bkSessionManager.getSessionId()
                                && name && name == scope.ngModelAttr) {
                            scope[scope.ngModelAttr] = args.data.value;
                        }
                    }
                });

                $compile(element.contents())(scope);
            }
        };
    }]);
})();

( function() {
    'use strict';
    var module = angular.module('bk.outputDisplay');
    module.directive("easyFormCheckBox", ['$compile', 'bkUtils', 'bkSessionManager', 'EasyFormConstants', function($compile, bkUtils, bkSessionManager, EasyFormConstants) {
        return {
            restrict : "E",
            template : "<div id='checkBoxContrainer' class='check-box-container'>" +
                    "<label id='checkBoxLabel' class='check-box-label'/>" +
                    "<input type='checkbox' id='checkBox' class='check-box'/>" +
                    "</div>",
            link : function(scope, element, attrs) {
                var component = scope.component;
                scope.ngModelAttr = component.label;

                element.find('#checkBoxLabel').text(component.label);
                var checkBox = element.find('#checkBox');

                checkBox.attr('data-easyform-label', component.label)
                        .attr('data-ng-model', component.label);

                if (component.value && 'true' == component.value) {
                    checkBox.attr('checked', 'true');
                }

                if (component.enabled && component.enabled == false) {
                    checkBox.attr('disabled', 'true');
                }

                var watchedExpression = function (scope) {
                    return scope[scope.ngModelAttr];
                };
                var valueChangeHandler = function (newValue, oldValue) {
                    bkUtils.setEasyFormValue(scope.ngModelAttr, newValue, bkSessionManager.getSessionId());
                };
                scope.$watch(watchedExpression, valueChangeHandler);

                scope.$on(EasyFormConstants.Events.VALUE_SET, function(event, args) {
                    if (args && args.data) {
                        var session = args.data.session;
                        var name = args.data.name;
                        if (session && session == bkSessionManager.getSessionId()
                                && name && name == scope.ngModelAttr) {
                            scope[scope.ngModelAttr] = args.data.value;
                        }
                    }
                });

                $compile(element.contents())(scope);
            }
        };
    }]);
})();

( function() {
    'use strict';
    var module = angular.module('bk.outputDisplay');
    module.directive("easyFormComboBox", ['$compile', 'bkUtils', 'bkSessionManager', 'EasyFormConstants', function($compile, bkUtils, bkSessionManager, EasyFormConstants) {
        return {
            restrict : "E",
            template : "<div id='comboBoxContrainer' class='combo-box-container'>" +
                    "<label id='comboBoxLabel' class='combo-box-label'/>" +
                    "<select id='comboBox' class='combo-box'/>" +
                    "</div>",
            link : function(scope, element, attrs) {
                var component = scope.component;
                scope.ngModelAttr = component.label;

                element.find('#comboBoxLabel').text(component.label);
                var comboBox = element.find('#comboBox');

                comboBox.attr('data-easyform-label', component.label)
                        .attr('data-ng-model', component.label);

                if (!component.editable || 'false' == component.editable) {
                    comboBox.attr('disabled', 'true');
                }

                if (component.enabled && component.enabled == false) {
                    checkBox.attr('disabled', 'true');
                }

                if (component.values) {
                    comboBox.attr('ngOptions', 'v for v in component.values');
                }

                var watchedExpression = function (scope) {
                    return scope[scope.ngModelAttr];
                };
                var valueChangeHandler = function (newValue, oldValue) {
                    bkUtils.setEasyFormValue(scope.ngModelAttr, newValue, bkSessionManager.getSessionId());
                };
                scope.$watch(watchedExpression, valueChangeHandler);

                scope.$on(EasyFormConstants.Events.VALUE_SET, function(event, args) {
                    if (args && args.data) {
                        var session = args.data.session;
                        var name = args.data.name;
                        if (session && session == bkSessionManager.getSessionId()
                                && name && name == scope.ngModelAttr) {
                            scope[scope.ngModelAttr] = args.data.value;
                        }
                    }
                });

                $compile(element.contents())(scope);
            }
        };
    }]);
})();

( function() {
    'use strict';
    var module = angular.module('bk.outputDisplay');
    module.directive("easyFormListComponent", ['$compile', 'bkUtils', 'bkSessionManager', 'EasyFormConstants', function($compile, bkUtils, bkSessionManager, EasyFormConstants) {
        return {
            restrict : "E",
            template : "<div id='listComponentContrainer' class='list-component-container'>" +
                    "<label id='listComponentLabel' class='list-component-label'/>" +
                    "<select id='listComponent' class='list-component'/>" +
                    "</div>",
            link : function(scope, element, attrs) {
                var component = scope.component;
                scope.ngModelAttr = component.label;

                element.find('#listComponentLabel').text(component.label);
                var listComponent = element.find('#listComponent');

                listComponent.attr('data-easyform-label', component.label)
                        .attr('data-ng-model', component.label);

                if (component.multipleSelection && 'true' == component.multipleSelection) {
                    listComponent.attr('multiple', 'true');
                }

                if (component.size && component.size > 0) {
                    listComponent.attr('size', component.size);
                } else if (component.values && component.values.length > 0){
                    listComponent.attr('size', component.values.length);
                } else {
                    listComponent.attr('size', 1);
                }

                if (component.values) {
                    listComponent.attr('ngOptions', 'v for v in component.values');
                }

                if (component.enabled && component.enabled == false) {
                    listComponent.attr('disabled', 'true');
                }

                var watchedExpression = function (scope) {
                    return scope[scope.ngModelAttr];
                };
                var valueChangeHandler = function (newValue, oldValue) {
                    bkUtils.setEasyFormValue(scope.ngModelAttr, newValue, bkSessionManager.getSessionId());
                };
                scope.$watch(watchedExpression, valueChangeHandler);

                scope.$on(EasyFormConstants.Events.VALUE_SET, function(event, args) {
                    if (args && args.data) {
                        var session = args.data.session;
                        var name = args.data.name;
                        if (session && session == bkSessionManager.getSessionId()
                                && name && name == scope.ngModelAttr) {
                            scope[scope.ngModelAttr] = args.data.value;
                        }
                    }
                });

                $compile(element.contents())(scope);
            }
        };
    }]);
})();

( function() {
    'use strict';
    var module = angular.module('bk.outputDisplay');
    module.directive("easyFormRadioButtonComponent", ['$compile', 'bkUtils', 'bkSessionManager', 'EasyFormConstants', function($compile, bkUtils, bkSessionManager, EasyFormConstants) {
        return {
            restrict : "E",
            template : "<div id='radioButtonComponentContrainer' class='radio-button-container'>" +
                    "<label id='radioButtonComponentLabel' class='radio-button-label'/>" +
                    "</div>",
            link : function(scope, element, attrs) {
                var component = scope.component;
                scope.ngModelAttr = component.label;

                element.find('#radioButtonComponentLabel').text(component.label);

                if (component.values && component.values.length > 0) {
                    var container = element.find('#radioButtonComponentContrainer');

                    //todo layout horizontally
                    var horizontal = component.isHorizontal;

                    var radioButtonItemsContainer = angular.element('<div class="radio-button-items-container"></div>');

                    component.values.forEach(function(value) {
                        var outerRadioButtonLabel = angular.element('<label class="radio-button-item-label"></label>');
                        var radioButton = angular.element('<input type="radio" class="radio-button-component-item"/>')
                                .attr('data-ng-model', component.label)
                                .attr('value', value);
                        if (component.enabled && component.enabled == false) {
                            radioButton.attr('disabled', 'true');
                        }
                        outerRadioButtonLabel
                                .text(value)
                                .append(radioButton);
                        radioButtonItemsContainer.append(outerRadioButtonLabel);
                    });

                    container.append(radioButtonItemsContainer);
                }

                var watchedExpression = function (scope) {
                    return scope[scope.ngModelAttr];
                };
                var valueChangeHandler = function (newValue, oldValue) {
                    bkUtils.setEasyFormValue(scope.ngModelAttr, newValue, bkSessionManager.getSessionId());
                };
                scope.$watch(watchedExpression, valueChangeHandler);

                scope.$on(EasyFormConstants.Events.VALUE_SET, function(event, args) {
                    if (args && args.data) {
                        var session = args.data.session;
                        var name = args.data.name;
                        if (session && session == bkSessionManager.getSessionId()
                                && name && name == scope.ngModelAttr) {
                            scope[scope.ngModelAttr] = args.data.value;
                        }
                    }
                });

                $compile(element.contents())(scope);
            }
        };
    }]);
})();

( function() {
    'use strict';
    var module = angular.module('bk.outputDisplay');
    module.directive("easyFormDatePickerComponent", ['$compile', 'bkUtils', 'bkSessionManager', 'EasyFormConstants', function($compile, bkUtils, bkSessionManager, EasyFormConstants) {
        return {
            restrict : "E",
            template : "<div id='datePickerComponentContrainer' class='date-picker-container'>" +
                    "<label id='datePickerLabel' class='date-picker-label'/>" +
                    "<input type='date' id='datePicker' class='date-picker'/>" +
                    "</div>",
            link : function(scope, element, attrs) {
                var component = scope.component;
                scope.ngModelAttr = component.label;

                element.find('#datePickerLabel').text(component.label);
                var datePicker = element.find('#datePicker');
                datePicker.attr('data-easyform-label', component.label)
                          .attr('data-ng-model', component.label);

                if (component.showTime && 'true' == component.showTime) {
                    datePicker.attr('type', 'datetime');
                }

                if (component.enabled && component.enabled == false) {
                    datePicker.attr('disabled', 'true');
                }

                var watchedExpression = function (scope) {
                    return scope[scope.ngModelAttr];
                };
                var valueChangeHandler = function (newValue, oldValue) {
                    bkUtils.setEasyFormValue(scope.ngModelAttr, newValue, bkSessionManager.getSessionId());
                };
                scope.$watch(watchedExpression, valueChangeHandler);

                scope.$on(EasyFormConstants.Events.VALUE_SET, function(event, args) {
                    if (args && args.data) {
                        var session = args.data.session;
                        var name = args.data.name;
                        if (session && session == bkSessionManager.getSessionId()
                                && name && name == scope.ngModelAttr) {
                            scope[scope.ngModelAttr] = args.data.value;
                        }
                    }
                });

                $compile(element.contents())(scope);
            }
        };
    }]);
})();

( function() {
    'use strict';
    var module = angular.module('bk.outputDisplay');
    module.directive("easyFormButtonComponent", ['$compile', 'bkUtils', 'bkSessionManager', function($compile, bkUtils, bkSessionManager) {
        return {
            restrict : "E",
            template : "<div id='buttonComponentContrainer' class='button-component-container'>" +
                    "<button type='button' id='buttonComponent' class='button-component'/>" +
                    "</div>",
            link : function(scope, element, attrs) {
                var component = scope.component;

                var clickHandler = function() {
                    //todo
                    console.log('Want to execute code cell with tag: ' + component.tag)
                };

                var buttonComponent = element.find('#buttonComponent');
                buttonComponent.text(component.label);

                if (component.enabled && component.enabled == false) {
                    buttonComponent.attr('disabled', 'true');
                }

                if (component.tag) {
                    buttonComponent.attr('title', component.tag).on('click', clickHandler);
                }
            }
        };
    }]);
})();

( function() {
    'use strict';
    var retfunc = function($compile, bkUtils, bkSessionManager, EasyFormConstants) {
        return {
            template : "<div id='easyFormContainer' class='easy-form-container'></div>",
            link : function(scope, element, attrs) {

                $.cometd.subscribe("/easyform/" + bkSessionManager.getSessionId(), function(reply) {
                    scope.$broadcast(EasyFormConstants.Events.VALUE_SET, reply);
                });

                var model = scope.model.getCellModel();
                if (model.components) {
                    model.components.forEach(function(component) {
                        //depends on type, create markup for components
                        var easyFormContainer = element.find('#easyFormContainer');
                        var childScope = scope.$new();
                        childScope.component = component;
                        var easyForm = EasyFormConstants.Components;
                        if (component.type.indexOf(easyForm.TextField.type) != -1) {
                            easyFormContainer.append($compile(angular.element(easyForm.TextField.htmlTag))(childScope));
                        } else if (component.type.indexOf(easyForm.TextArea.type) != -1) {
                            easyFormContainer.append($compile(angular.element(easyForm.TextArea.type))(childScope));
                        } else if (component.type.indexOf(easyForm.CheckBox.type) != -1) {
                            easyFormContainer.append($compile(angular.element(easyForm.CheckBox.htmlTag))(childScope));
                        } else if (component.type.indexOf(easyForm.ComboBox.type) != -1) {
                            easyFormContainer.append($compile(angular.element(easyForm.ComboBox.htmlTag))(childScope));
                        } else if (component.type.indexOf(easyForm.List.type) != -1) {
                            easyFormContainer.append($compile(angular.element(easyForm.List.htmlTag))(childScope));
                        } else if (component.type.indexOf(easyForm.RadioButton.type) != -1) {
                            easyFormContainer.append($compile(angular.element(easyForm.RadioButton.htmlTag))(childScope));
                        } else if (component.type.indexOf(easyForm.DatePicker.type) != -1) {
                            easyFormContainer.append($compile(angular.element(easyForm.DatePicker.htmlTag))(childScope));
                        } else if (component.type.indexOf(easyForm.Button.type) != -1) {
                            easyFormContainer.append($compile(angular.element(easyForm.Button.htmlTag))(childScope));
                        } else {
                            //no components for type
                            console.log("There are no view for component with type: " + component.type);
                        }
                        scope.$on("$destroy", function () {
                            $.cometd.unsubscribe(bkSessionManager.getSessionId());
                            if (childScope) {
                                childScope.$destroy();
                            }
                        });
                    });
                }
            }
        };
    };
    beaker.bkoDirective("EasyForm", ['$compile', 'bkUtils', 'bkSessionManager', 'EasyFormConstants', retfunc]);
})();

( function() {
    var module = angular.module('bk.outputDisplay');
    module.constant("EasyFormConstants", {
        Events : {
            VALUE_SET : "easyformsetevent"
        },
        Components : {
            TextField : {
                type : "TextField",
                htmlTag : "<easy-form-text-field/>"
            },
            TextArea : {
                type : "TextArea",
                htmlTag : "<easy-form-text-area/>"
            },
            CheckBox : {
                type : "CheckBox",
                htmlTag : "<easy-form-check-box/>"
            },
            ComboBox : {
                type : "ComboBox",
                htmlTag : "<easy-form-combo-box/>"
            },
            List : {
                type : "ListComponent",
                htmlTag : "<easy-form-list-component/>"
            },
            RadioButton : {
                type : "RadioButtonComponent",
                htmlTag : "<easy-form-radio-button-component/>"
            },
            DatePicker : {
                type : "DatePickerComponent",
                htmlTag : "<easy-form-date-picker-component/>"
            },
            Button : {
                type : "ButtonComponent",
                htmlTag : "<easy-form-button-component/>"
            }
        }
    });
})();