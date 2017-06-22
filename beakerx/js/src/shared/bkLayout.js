module.exports = {
  setFontForCodeMirror: setFontForCodeMirror
};

function setFontForCodeMirror(fontFamily) {
  var elem = document.getElementsByClassName('CodeMirror-line')[0];
  var computedStyle = window.getComputedStyle(elem);
  var currentFontFamily = computedStyle.getPropertyValue('font-family');
  var fontIsDefault = currentFontFamily === 'monospace';

  if (fontIsDefault) {
    fontFamily = fontFamily || 'Roboto Mono';

    var styleString = '.CodeMirror pre  { font-family: '+fontFamily+' }';
    var styleElem = document.createElement('style');

    styleElem.type='text/css';
    styleElem.appendChild(document.createTextNode(styleString));

    document.getElementsByTagName('head')[0].appendChild(styleElem);
  }
}