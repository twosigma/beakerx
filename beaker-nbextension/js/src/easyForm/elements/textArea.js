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
             "<textarea class='text-area'/>" +
             "</div>" +
             "</div>";
  }

  function init(scope, element) {
    var efc = new EasyFormComponent(scope, element);

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
        // .attr('ng-model', scope.ngModelAttr)
        .attr('rows', efc.getComponent().height);
      if (fixedSize) {
        element.find('.easyform-component-container').addClass('fixed-size');
        textArea.css('width', parseInt(efc.getComponent().width) + 1.5 + 'ch');
      }
    };

    efc.setElementValue = function(val) {
      efc.element.find('textarea.text-area').val(val);
    };

    efc.init();
  }

});