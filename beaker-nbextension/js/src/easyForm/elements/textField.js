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
             "<label class='easyform-label'/>" +
             "<div class='easyform-component-container'>" +
             "<input type='text' class='text-field'/>" +
             "</div>" +
             "</div>";
  }

  function init(scope, element) {
    var efc = new EasyFormComponent(scope, element);

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
      textField
        // .attr('ng-model', scope.ngModelAttr)
        .attr('size', efc.getComponent().width);
      if (fixedSize) {
        element.find('.easyform-component-container').addClass('fixed-size');
      }
    };

    efc.setElementValue = function(val) {
      efc.element.find('input.text-field').val(val);
    };

    efc.init();
  }

});