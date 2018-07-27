/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import * as d3 from 'd3';
import * as _ from 'underscore';
import plotTip from '../plotTip';

const plotUtils = require('../plotUtils');

namespace SaveAsContextMenu {
  export function saveAsSvg(scope) {
    const svgToSave = getSvgToSave(scope);

    plotUtils.addInlineFonts(svgToSave);

    const html = plotUtils.convertToXHTML(svgToSave.outerHTML);
    const fileName = _.isEmpty(scope.stdmodel.title) ? 'plot' : scope.stdmodel.title;

    plotUtils.download(
      `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(html)))}`,
      `${fileName}.svg`
    );
  }

  export function saveAsPng(scale, scope) {
    const svg: SVGElement = getSvgToSave(scope);

    plotUtils.addInlineFonts(svg);
    scale = scale === undefined ? 1 : scale;

    scope.canvas.width = Number(svg.getAttribute("width")) * scale;
    scope.canvas.height = Number(svg.getAttribute("height")) * scale;

    const html = plotUtils.convertToXHTML(svg.outerHTML);
    const imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(html)));
    const fileName = _.isEmpty(scope.stdmodel.title) ? 'plot' : scope.stdmodel.title;

    plotUtils.drawPng(scope.canvas, imgsrc, fileName + ".png");
  }

  export function getSvgToSave(scope) {
    const svg = scope.svg.node().cloneNode(true);
    
    setAttributes(svg);

    const plotTitle = scope.jqplottitle;
    const titleOuterHeight = plotUtils.getActualCss(plotTitle, 'outerHeight', true);

    addLegend(scope, svg, plotTitle, titleOuterHeight);
    addTooltips(scope, svg, plotTitle, titleOuterHeight);

    return addCustomStyles(scope, svg);
  }

  function setAttributes(svg) {
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    if (document.body.classList.contains('improveFonts')) {
      svg.setAttribute('class', 'svg-export improveFonts');
    } else {
      svg.setAttribute('class', 'svg-export');
    }
  }

  function addLegend(scope, svg, plotTitle, titleOuterHeight) {
    adjustSvgPositionWithLegend(scope, svg, titleOuterHeight);
    scope.plotLegend.appendLegendToSvg(d3.select(svg));
  }

  function addTooltips(scope, svg, plotTitle, titleOuterHeight) {
    plotTip.appendTooltipsToSvg(scope, d3.select(svg));
    plotUtils.translateChildren(svg, 0, titleOuterHeight);
    plotUtils.addTitleToSvg(svg, plotTitle, {
      width: plotTitle.width(),
      height: plotUtils.getActualCss(plotTitle, 'outerHeight')
    });
  }

  function addCustomStyles(scope, svg) {
    let cellModel = scope.getCellModel();
    let extraStyles = [];
    let styleString = '';

    if (cellModel.element_styles) {
      for (let style in cellModel.element_styles) {
        styleString = cellModel.element_styles[style];

        if (style === '.plot-title') {
          styleString = plotUtils.adjustStyleForSvg(styleString);
        }

        extraStyles.push(style + ' {' + styleString + '}');
      }
    }

    if (cellModel.custom_styles) {
      extraStyles = extraStyles.concat(cellModel.custom_styles);
    }

    plotUtils.addInlineStyles(svg, extraStyles);

    return svgReplaceNbspCharacters(svg);
  }

  function adjustSvgPositionWithLegend(scope, svg, titleOuterHeight) {
    let W = plotUtils.outerWidth(scope.jqlegendcontainer);
    let H = plotUtils.outerHeight(scope.jqlegendcontainer);

    H += titleOuterHeight;

    svg.setAttribute("width", W);
    svg.setAttribute("height", H);
    $(svg).css("width", W);
    $(svg).css("height", H);
  }

  function svgReplaceNbspCharacters(svg: SVGElement) {
    svg.innerHTML = svg.innerHTML.replace(/\&nbsp;/g, ' ');

    return svg;
  }
}

export default SaveAsContextMenu;
