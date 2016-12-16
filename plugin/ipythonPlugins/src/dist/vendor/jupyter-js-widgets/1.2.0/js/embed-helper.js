// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
define('jupyter_js_widgets_embed_helper_v1_2_0', [], function () {
  

function generateEmbedScript(widgetState, imageDataUrl) {
  return [
      '<img src=' + imageDataUrl + ' class="jupyter-widget">',
      '<script type="application/vnd.jupyter-embedded-widgets">' + JSON.stringify(widgetState) + '</script>'
  ].join('\n');
}

//module.exports = {
//  generateEmbedScript: generateEmbedScript,
//};

return {
    generateEmbedScript: generateEmbedScript,
  };

});