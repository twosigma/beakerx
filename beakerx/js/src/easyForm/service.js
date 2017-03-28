define([
  './consts'
], function(
  EasyFormConstants
) {

  var service = {
    easyForms: {},
    addComponent: function (formId, component) {
      if (!this.easyForms[formId]) {
        this.easyForms[formId] = {};
      }
      this.easyForms[formId][component.label] = component;
      console.log('add component', this);
    },
    setComponentValue: function (formId, evaluatorId, component, value) {
      if (!(this.easyForms[formId] && this.easyForms[formId].ready)) {
        return;
      }
      if (this.easyForms[formId][component.label]) {
        var elem = this.easyForms[formId][component.label];
        if (!(_.isEqual(elem.currentValue, value))) {
          elem.currentValue = value;
        }
      }
      // if (window.languageServiceBase && window.languageServiceBase[evaluatorId]) { //todo check
      //   var req = $.ajax({
      //     type: "POST",
      //     datatype: "json",
      //     url: window.languageServiceBase[evaluatorId] + '/easyform/set',
      //     data: {
      //       id: formId,
      //       key: component.label,
      //       value: value
      //     }
      //   });
      //   req.done(function (ret) {
      //   });
      //   req.error(function (jqXHR, textStatus) {
      //     console.error("Unable to set easyform value");
      //   });
      // }
    },
    getComponentValue: function (formId, component) {
      if (this.easyForms[formId] && this.easyForms[formId][component.label]) {
        return this.easyForms[formId][component.label].currentValue;
      }
    },
    setReady: function (formId, evaluatorId) {
      // if (window.languageServiceBase && window.languageServiceBase[evaluatorId]) { // todo check
      //   var req = $.ajax({
      //     type: "POST",
      //     datatype: "json",
      //     url: window.languageServiceBase[evaluatorId] + '/easyform/setReady/' + formId
      //   });
      //   var self = this;
      //   req.done(function (ret) {
      //     self.easyForms[formId].ready = true;
      //   });
      //   req.error(function (jqXHR, textStatus) {
      //     console.log("Unable to set easyform ready.");
      //   });
      // }
    },
    setNotReady: function(formId) {
      this.easyForms[formId].ready = false;
    },
    sendActionPerformed: function(formId, evaluatorId, label) {
      // if (window.languageServiceBase && window.languageServiceBase[evaluatorId]) { // todo check
      //   var req = $.ajax({
      //     type: "POST",
      //     datatype: "json",
      //     url: window.languageServiceBase[evaluatorId] + '/easyform/actionPerformed/' + formId,
      //     data: {
      //       label: label
      //     }
      //   });
      //   req.done(function (ret) {
      //   });
      //   req.error(function (jqXHR, textStatus) {
      //     console.log("Unable to send information about action performed.");
      //   });
      // }
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
});