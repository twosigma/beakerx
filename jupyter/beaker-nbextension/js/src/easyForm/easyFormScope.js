define([
  './constants',
  './service'
], function(
  EasyFormConstants,
  EasyFormService
) {

  console.log('EasyFormConstants', EasyFormConstants);debugger



  function EasyFormScope(wrapperId) {
    this.wrapperId = wrapperId;
    this.scope = {};
    this.evaluatorExist = null;
    this.model = {
      model: {},
      getCellModel: function() {
        return this.model;
      }
    };
  }

  EasyFormScope.prototype.buildTemplate = function() {
    return "<div class='easy-form-container' skipfortag='TEXTAREA'></div>";
  };

  EasyFormScope.prototype.setModelData = function(model) {
    this.model.model = model;
    this.evaluatorExist = this.model.getEvaluatorId && this.model.getEvaluatorId();
  };

  EasyFormScope.prototype.setElement = function(element) {
    this.element = element;
  };

  EasyFormScope.prototype.init = function() {
    this.fetchFromCellModel(this.getState(), this.element);
    $(window).resize(this.alignComponents);
  };

  // -------------

  EasyFormScope.prototype.clickRunButton = function () {
    var self = this;

    if (event && event.target) {
      var el = $(event.target);
      var components = self.model.getCellModel().components;
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

  EasyFormScope.prototype.getUpdateService = function () {
    var self = this;

    if (window !== undefined && window.languageUpdateService !== undefined
        && bkEvaluatorManager.getEvaluator(self.model.getEvaluatorId()) !== undefined)
      return window.languageUpdateService[self.model.getEvaluatorId()];
    return undefined;
  };

  EasyFormScope.prototype.ingestUpdate = function (model) {
    var self = this;

    self.update_id = model.update_id;
    var srv = self.getUpdateService();

    if (self.subscribedId && self.subscribedId !== self.update_id) {
      if (srv !== undefined)
        srv.unsubscribe(self.subscribedId);
      self.subscribedId = null;
    }

    if (!self.subscribedId && self.update_id && srv !== undefined) {
      var onUpdate = function (update) {
        self.ingestUpdate(update);
        // self.$broadcast(EasyFormConstants.Events.UPDATED, update); // todo check event
      };
      srv.subscribe(self.update_id, onUpdate);
      self.subscribedId = self.update_id;
    }

  };

  EasyFormScope.prototype.fetchFromCellModel = function (model, element) {
    var self = this;

    if (self.evaluatorExist) {
      self.ingestUpdate(model);
    }
    var easyFormContainer = element.find('.easy-form-container');

    if (model.caption) {
      var fieldsetElement = $('<fieldset></fieldset>');
      var legendElement = $('<legend></legend>').text(model.caption);
      easyFormContainer.append(fieldsetElement.append(legendElement));
      easyFormContainer = fieldsetElement;
    }

    if (model.components) {
      model.components.forEach(function (component) {
        component.enabled = !_.isEmpty(model.update_id);

        // var childScope = $scope.$new(); //todo create new scope
        var childScope = new EasyFormScope();

        childScope.component = component;
        childScope.formId = self.update_id;
        childScope.evaluatorExist = self.evaluatorExist;
        if (self.evaluatorExist) {
          childScope.evaluatorId = self.model.getEvaluatorId();
        }

        var elementCreator = EasyFormConstants.Components[component.type].creator;

        // var newElement
        //   = $(EasyFormConstants.Components[component.type].htmlTag);
        // newElement.attr(EasyFormConstants.Attributes.EasyFormComponentID,
        //   component.label);

        var newItemTmpl = elementCreator.getTemplate();
        var newItemBody = $(newItemTmpl);
        // console.log('new', newElement);


        childScope.component.enabled = childScope.component.enabled ? true : false;

        easyFormContainer.append(newItemBody);

        elementCreator.init(childScope, newItemBody);

        // easyFormContainer.append($compile(newElement)(childScope));

        if ((component.type.indexOf(
            EasyFormConstants.Components.SaveValuesButton.type) == -1
             || component.type.indexOf(
            EasyFormConstants.Components.LoadValuesButton.type) == -1)) {
          EasyFormService.addComponent(self.update_id, component);
        }

      });
    }

    self.alignComponents();

    if (self.evaluatorExist) {
      EasyFormService.setReady(self.update_id, self.model.getEvaluatorId());
    }
  };

  EasyFormScope.prototype.alignComponents = function() {
    var self = this;

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

  EasyFormScope.prototype.getState = function () {
    return this.model.getCellModel();
  };

  // scope.$watch(function () { // todo handle visible change
  //   return element.is(':visible')
  // }, scope.alignComponents);


  // $scope.$on('$destroy', function () {
  //   $(window).off('resize', $scope.alignComponents);
  //   if ($scope.evaluatorExist && $scope.subscribedId) {
  //     var srv = $scope.getUpdateService();
  //     if (srv !== undefined) {
  //       srv.unsubscribe($scope.subscribedId);
  //     }
  //   }
  // });

  // -------------

  return EasyFormScope;

});