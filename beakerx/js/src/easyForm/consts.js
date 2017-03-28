define(function() {
  return {
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
        // htmlTag: "<easy-form-text-field/>",
        MIN_WIDTH: 1
      },
      TextArea: {
        type: "TextArea",
        // htmlTag: "<easy-form-text-area/>",
        MIN_WIDTH: 1,
        MIN_HEIGHT: 3
      },
      CheckBox: {
        type: "CheckBox",
        // htmlTag: "<easy-form-check-box/>"
      },
      CheckBoxGroup: {
        type: "CheckBoxGroup",
        // htmlTag: "<easy-form-check-box-group/>"
      },
      ComboBox: {
        type: "ComboBox",
        // htmlTag: "<easy-form-combo-box/>",
        MIN_WIDTH: 1
      },
      ListComponent: {
        type: "ListComponent"
        // htmlTag: "<easy-form-list-component/>"
      },
      RadioButtonComponent: {
        type: "RadioButtonComponent"
        // htmlTag: "<easy-form-radio-button-component/>"
      },
      DatePickerComponent: {
        type: "DatePickerComponent",
        // htmlTag: "<easy-form-date-picker-component/>",
        dateFormat: "Ymd",
        dateTimeFormat: "Ymd H:i",
        inputLength: 9
      },
      ButtonComponent: {
        type: "ButtonComponent",
        // htmlTag: "<easy-form-button-component/>"
      },
      SaveValuesButton: {
        type: "SaveValuesButton",
        // htmlTag: "<easy-form-button-component/>"
      },
      LoadValuesButton: {
        type: "LoadValuesButton",
        // htmlTag: "<easy-form-button-component/>"
      }
    }
  };
});