define([
  './constants',
  './service',
  './../shared/bkUtils'
], function(
  constants,
  service,
  utils
) {


  console.log('???', constants, service, utils);

  function EasyFormComponent(scope, element) {
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
      // scope.ngModelAttr = utils.getValidNgModelString(component.label);

      this.buildUI();

      this.initValue(component);

      if (scope.evaluatorExist) {
        // scope.$watch(this.watchedExpression,
        //   this.valueChangeHandler,
        //   this.isWatchByObjectEquality());
      }
      this.addUpdatedListener();
      this.addValueLoadedListener();
    };

    this.addListener = function(event, handler) {
      // scope.$on(event, handler);
    };

    this.addUpdatedListener = function() {
      var self = this;
      this.addListener(constants.Events.UPDATED, function(event, args) {
        args.components.forEach(function(component) {
          if (component.label === scope.componentId) {
            var newValue = component.value;
            self.setModelValue(newValue, {
              componentStatus: component.enabled,
              externalChange: true
            });
          }
        });
      });
    };

    this.addValueLoadedListener = function() {
      var self = this;
      this.addListener(constants.Events.VALUE_LOADED, function(event, args) {
        var newValue = service.getComponentValue(scope.formId, component);
        self.setModelValue(newValue, {
          externalChange: true
        });
      });
    };
  }

  EasyFormComponent.prototype.setModelValue = function(newValue, opts) {
    opts = opts || {};

    var self = this,
      applyValue = !_.isEqual(this.scope[this.scope.ngModelAttr], newValue);

    if (applyValue) {
      if (opts.externalChange) {
        // this.scope.$apply(function() {
        //   self._setModelValue(newValue, opts);
        // });
      } else {
        self._setModelValue(newValue, opts);
      }
    }
  };

  EasyFormComponent.prototype._setModelValue = function(newValue, opts) {
    this.scope[this.scope.ngModelAttr] = newValue;
    if (opts.componentStatus !== undefined) {
      this.scope.component.enabled = opts.componentStatus;
    }
  };

  return EasyFormComponent;
});