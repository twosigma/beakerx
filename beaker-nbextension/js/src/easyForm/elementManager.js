define([
  './elements/textField',
  './elements/textArea',
  './elements/checkbox',
], function(
  TextField,
  TextArea,
  Checkbox
) {

  return {
    'TextField': TextField,
    'TextArea': TextArea,
    'CheckBox': Checkbox,
  }

});