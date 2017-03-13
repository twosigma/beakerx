define([
  './../easyFormComponent'
], function(
  EasyFormComponent
) {

  return {
    getTemplate: getTemplate,
    init: init
  };

  // --------------

  function getTemplate() {
      return "<div class='easyform-container'>" +
             "<div class='easyform-component-container'>" +
             "<input type='checkbox' class='check-box'/>" +
             "<label class='easyform-label'/>" +
             "</div>" +
             "</div>";
  }

  function init(scope, element) {
    var efc = new EasyFormComponent(scope, element);

    efc.buildUI = function() {
      element.find('.easyform-label').text(efc.getComponent().label).attr('for', scope.id);
      var checkBox = element.find('.check-box');
      // checkBox.attr('ng-model', scope.ngModelAttr);
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
            var newValue = component.value === 'true' ? true : false;
            efc.setModelValue(newValue, {
              componentStatus: component.enabled,
              externalChange: true
            });
          }
        });
      });
    };

    efc.setElementValue = function(val) {
      var checkBox = efc.element.find('input.check-box');
      var checked = val === 'true';
      checkBox.attr('checked', checked);
    };

    efc.init();
  }

});