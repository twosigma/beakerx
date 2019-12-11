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

/// <reference types='jqueryui'/>

import * as d3 from 'd3';
import * as _ from 'underscore';
import PointShapeHelper from '../std/PointShapeHelper';
import LegendPosition from "./LegendPosition";
import PlotMessage from "../PlotMessage";
import PlotStyleUtils from "beakerx_shared/lib/utils/PlotStyleUtils";
import CommonUtils from "beakerx_shared/lib/utils/CommonUtils";
import PlotColorUtils from "../utils/PlotColorUtils";

const GradientLegend = require('../gradientlegend');

export default class PlotLegend {
  scope: any;
  legendPosition: LegendPosition;
  plotMessage: PlotMessage;

  constructor(scope) {
    this.scope = scope;
    this.legendPosition = new LegendPosition(scope);
    this.plotMessage = new PlotMessage(scope);
  }

  appendLegendToSvg(svg: d3.Selection<SVGElement, any, HTMLElement, any>) {
    const legend = this.scope.jqlegendcontainer.find("#plotLegend");

    if (
      this.scope.legendableItem === 0
      || this.scope.stdmodel.showLegend === false
      || !legend.length
    ) {
      return;
    }

    const legendCopy = this.scope.jqlegendcontainer.find("#plotLegend").clone();

    legendCopy.find(".plot-legendcheckbox").each((i, item) => {
      if (item.checked) {
        item.setAttribute("checked", true);
      }

      item.setAttribute("onclick", "return false");
    });

    legendCopy.css("position", "inherit");
    legendCopy.css("top", "auto");
    legendCopy.css("left", "auto");
    legendCopy.css("bottom", "auto");
    legendCopy.css("right", "auto");

    //remove base from urls
    legendCopy.find("[style*='url']").each((i, item) => {
      let style = $(item).attr('style').replace("/beaker/", "");

      $(item).attr('style', style);
    });

    const getPositive = (value) => value > 0 ? value : 0;
    const position = PlotStyleUtils.getActualCss(legend, 'position');
    const x = getPositive(position.left);
    const y = position.top != null ? getPositive(position.top) : getPositive(position.bottom);

    svg.append("foreignObject")
      .attr("width", PlotStyleUtils.getActualCss(legend, 'outerWidth', true) + 1)//add 1 because jQuery round size
      .attr("height", PlotStyleUtils.getActualCss(legend, 'outerHeight', true) + 1)
      .attr("x", x)
      .attr("y", y)
      .append("xhtml:body")
      .attr('style', 'position: relative;')
      .attr("xmlns", "http://www.w3.org/1999/xhtml")
      .html(legendCopy[0].outerHTML);

    this.adjustSvgWithLegendDimensions(svg);
  };

  private adjustSvgWithLegendDimensions(svg: d3.Selection<SVGElement, any, HTMLElement, any>) {
      let svgWithLegendWidth = this.scope.plotSize.getPlotWithLegendWidth();
      let svgWithLegendHeight = this.scope.plotSize.getPlotWithLegendHeight();

      svg.attr('width', svgWithLegendWidth + 10);
      svg.style('width', svgWithLegendWidth + 10);

      svg.attr('height', svgWithLegendHeight + 10);
      svg.style('height', svgWithLegendHeight + 10);
  }

  render() {
    // legend redraw is controlled by legendDone
    if (this.scope.legendableItem === 0) {
      return;
    }
    if (this.scope.stdmodel.showLegend === false) {
      this.scope.jqlegendcontainer.find("#plotLegend").remove();
      return;
    }
    if (this.scope.legendDone === true) {
      return;
    }

    const data = this.scope.stdmodel.data;
    const isHorizontal = this.scope.stdmodel.legendLayout === "HORIZONTAL";

    this.scope.jqlegendcontainer.find("#plotLegend").remove();
    this.scope.legendDone = true;

    let legendContainer;

    if (this.scope.model.getCellModel().type === "HeatMap") {
      legendContainer = this.createLegendContainer();
    } else {
      legendContainer = this.createLegendContainer("plot-legendscrollablecontainer", "#legendDraggableContainer");
    }

    if (this.scope.model.getCellModel().type === "HeatMap") {
      this.scope.gradientLegend = new GradientLegend(data);
      this.scope.gradientLegend.render(legendContainer, data[0].colors);
      this.legendPosition.updateLegendPosition();

      return;
    }

    const legendDraggableContainer = $("<div></div>")
      .appendTo(legendContainer)
      .attr("id", "legendDraggableContainer")
      .attr("class", "plot-legenddraggable");

    const legendUnit = "<div></div>";
    const legendLineUnit = isHorizontal
      ? "<div class='plot-legenditeminline'></div>"
      : "<div class='plot-legenditeminrow'></div>";

    const legend = $(legendUnit)
      .appendTo(legendDraggableContainer)
      .attr("id", "legends");

    this.scope.legendMergedLines = this.prepareMergedLegendData();

    this.renderCheckboxes(legendLineUnit, legend);

    this.scope.lodTypeMenuItems = {};

    for (let id in this.scope.legendMergedLines) {
      this.renderLegendMergedLine(id, legendLineUnit, legend);
    }

    this.legendPosition.updateLegendPosition();
  }

  createLegendContainer(className?: string, handle?) {
    const scope = this.scope;
    const isHorizontal = this.scope.stdmodel.legendLayout === "HORIZONTAL";
    const draggable = {
      containment: 'parent',
      start: function(event, ui) {
        $(this).css({//avoid resizing for bottom-stacked legend
          "bottom": "auto"
        });
      },
      stop: function(event, ui) {
        scope.legendPosition = {
          "left": ui.position.left,
          "top": ui.position.top
        };
      }
    };

    const layout = this.scope.layout;
    const legendContainer = $("<div></div>")
      .appendTo(this.scope.jqlegendcontainer)
      .attr("id", "plotLegend")
      .attr("class", "plot-legend")
      .draggable(draggable)
      .css(
        "max-height", PlotStyleUtils.safeHeight(this.scope.jqsvg) - layout.bottomLayoutMargin - layout.topLayoutMargin
      );

    if (className != null) {
      legendContainer.addClass(className);
    }

    if (handle != null) {
      draggable['handle'] = handle;
    } else {
      legendContainer.addClass("plot-legenddraggable");
    }

    if (isHorizontal) {
      legendContainer.css("max-width", this.scope.jqcontainer.width());
    }

    return legendContainer;
  }

  prepareMergedLegendData() {
    const data = this.scope.stdmodel.data;
    const mergedLines = {};
    const lineUniqueAttributesSet = {};

    for (let i = 0; i < data.length; i++) {
      let item = data[i];

      if (item.legend == null || item.legend === "") {
        continue;
      }

      const lineUniqueIndex = item.legend + this.getColorInfoUid(item);

      if (lineUniqueAttributesSet[lineUniqueIndex] == null) {
        this.addNewLegendLineData(
          item,
          lineUniqueIndex,
          mergedLines,
          lineUniqueAttributesSet,
          i
        );
      } else {
        this.addDataForExistingLegendLine(
          item,
          mergedLines[lineUniqueAttributesSet[lineUniqueIndex]],
          i
        )
      }
    }

    return mergedLines;
  }

  getColorInfoUid(item) {
    const color = PlotColorUtils.createColor(item.color, item.color_opacity);
    const border = PlotColorUtils.createColor(item.stroke, item.stroke_opacity);

    return color + border;
  }

  addNewLegendLineData(item, lineUniqueIndex, mergedLines, lineUniqueAttributesSet, i) {
    const line = {
      dataIds: [i],
      legend: item.legend,
      showItem: item.showItem,
      isLodItem: item.isLodItem === true,
      color: item.color,
      color_opacity: item.color_opacity,
      stroke: item.stroke,
      stroke_opacity: item.stroke_opacity,
      shape: item.type === "point" ? item.shape : 'rect',
    };

    if (item.isLodItem === true) {
      line['lodDataIds'] = [i];
    }

    const lineId = CommonUtils.randomString(32);

    mergedLines[lineId] = line;
    lineUniqueAttributesSet[lineUniqueIndex] = lineId;

    return lineId;
  }

  addDataForExistingLegendLine(dat, line, i) {
    line.dataIds.push(i);

    if (dat.isLodItem === true) {
      line.isLodItem = true;

      if (line.lodDataIds) {
        line.lodDataIds.push(i);
      } else {
        line.lodDataIds = [i];
      }
    }

    if (line.showItem !== true) {
      line.showItem = dat.showItem
    }
  }

  renderCheckboxes(legendLineUnit, legend) {
    const scope = this.scope;

    if (
      this.scope.stdmodel.omitCheckboxes
      || Object.keys(this.scope.legendMergedLines).length <= 1
    ) {
      // skip "All" check when there is only one line
      return;
    }

    const allLegendId = CommonUtils.randomString(32);
    const unit = $(legendLineUnit)
      .appendTo(legend)
      .attr("id", "legend_all")
      .addClass("plot-legendline");

    $("<input type='checkbox' />")
      .attr("id", "legendcheck_all_" + allLegendId)
      .attr("class", "plot-legendcheckbox beforeCheckbox")
      .prop("checked", this.scope.showAllItems)
      .click(scope.plotInteraction.toggleVisibility)
      .appendTo($(unit));

    $("<span></span>")
      .attr("id", "legendbox_all")
      .attr("class", "plot-legendbox")
      .css("background-color", "none")
      .appendTo($(unit));

    $("<label></label>")
      .attr("id", "legendtext_all")
      .attr("for", "legendcheck_all_" + allLegendId)
      .attr("class", "plot-label")
      .text("All")
      .appendTo($(unit));
  }

  renderLegendMergedLine(id, legendLineUnit, legend) {
    if (!this.scope.legendMergedLines.hasOwnProperty(id)) {
      return;
    }

    const line = this.scope.legendMergedLines[id];

    if (line.legend == null || line.legend === "") {
      return;
    }

    let highlightTimeoutId;
    const self = this;

    const unit = $(legendLineUnit)
      .appendTo(legend)
      .attr("id", "legend_" + id)
      .addClass("plot-legendline")
      .mouseenter(function(e) {
        const legendLine = $(this)[0];

        highlightTimeoutId = setTimeout(() => {
          self.highlightElements(legendLine.id.split("_")[1], true);
        }, 300);
      })
      .mouseleave(function(e) {
        clearTimeout(highlightTimeoutId);
        self.highlightElements($(this)[0].id.split("_")[1], false);
      });

    this.renderCheckbox(line, unit, id);

    // color box
    $("<span></span>")
      .attr("id", "legendbox_" + id)
      .attr("class", "plot-legendbox")
      .attr("title", line.color == null ? "Element-based colored item" : "")
      .appendTo(unit)
      .append(PointShapeHelper.createLegendMarker(line));

    // legend text
    $("<label></label>").appendTo(unit)
      .attr("id", "legendtext_" + id)
      .attr("for", "legendcheck_" + id)
      .attr("class", "plot-label")
      .text(line.legend);

    this.renderLodItem(line, unit, id);
  }

  renderCheckbox(line, unit, id) {
    const scope = this.scope;

    if (this.scope.stdmodel.omitCheckboxes) {
      return;
    }

    $("<input type='checkbox'/>")
      .attr("id", "legendcheck_" + id)
      .attr("class", "plot-legendcheckbox beforeCheckbox")
      .prop("checked", line.showItem)
      .click(scope.plotInteraction.toggleVisibility)
      .appendTo(unit);
  }

  renderLodItem(line, unit, id) {
    if (line.isLodItem !== true) {
      return;
    }

    const lodTypeMenuItems = [];

    line.dataIds.forEach((dataId) => {
      const graphics = this.scope.stdmodel.data[dataId];

      graphics.lodTypes.forEach((lodType) => {
        if (!_.some(lodTypeMenuItems, (item) => item.lodType === lodType)) {
          lodTypeMenuItems.push(this.createLodTypeMenuItem(lodType, id));
        }
      });
    });

    lodTypeMenuItems.push(this.createLodTypeMenuItem('off', id));

    this.renderLodHint(lodTypeMenuItems, line, unit, id);
  }

  createLodTypeMenuItem(lodType, lineId) {
    return {
      lodType: lodType,
      lineId: lineId,
      name: this.getLodLabel(lodType),
      action: () => this.applyLodType(lodType, lineId)
    };
  };

  applyLodType(lodType, legendLineId) {
    const dataIds = this.scope.legendMergedLines[legendLineId].dataIds;

    if (lodType === 'off') {
      this.renderLodOffType(dataIds, legendLineId);

      return;
    }

    let hasChanged = false;

    dataIds.forEach((dataId) => {
      const loadLoader = this.scope.stdmodel.data[dataId];

      if (!loadLoader.lodType || loadLoader.lodType === lodType) {
        return;
      }

      loadLoader.clear(this.scope);
      loadLoader.applyLodType(lodType);
      loadLoader.zoomLevelChanged(this.scope);
      hasChanged = true;
    });

    if (hasChanged) {
      this.scope.update();
      this.scope.setMergedLodHint(dataIds, legendLineId);
    }
  }

  renderLodOffType(dataIds, legendLineId) {
    if (this.scope.getMergedLodInfo(dataIds).lodType === "off") {
      return;
    }

    this.scope.removePipe.push("msg_lodoff");
    this.plotMessage.render(
      "LOD is being turned off. Are you sure?",
      [
        "You are trying to turning off LOD. Loading full resolution data is " +
        "going to take time and may potentially crash the browser.",
        "PROCEED (left click) / CANCEL (right click)"
      ],
      "msg_lodoff",
      () => {
        dataIds.forEach((dataId) => {
          const loadLoader = this.scope.stdmodel.data[dataId];

          loadLoader.toggleLod && loadLoader.toggleLod(this.scope);
        });

        this.scope.update();
        this.scope.setMergedLodHint(dataIds, legendLineId);
      },
      null
    );
  }

  renderLodHint(lodTypeMenuItems, line, unit, id) {
    const lodhint = $(
      `<div style="width: auto;">
        <div class="dropdown dropdown-promoted lod-dropdown-menu">
          <a class="dropdown-toggle plot-legendlodtype"></a>
          <ul class="dropdown-menu"></ul>
        </div>
      </div>`
    );

    const dropdownMenuElement = lodhint.find('ul.dropdown-menu');

    lodTypeMenuItems.forEach((item) => {
      const liElem = $(`<li class=""><a>${item.name}</a></li>`);

      liElem.children('a').on('click', (e) => {
        item.action();
        $(e.target).parents('.lod-dropdown-menu').removeClass('open');
      });

      dropdownMenuElement.append(liElem);
    });

    lodhint.find('a.dropdown-toggle').on('click', (e) => {
      const parent: any = $(e.target).parent();

      $('.lod-dropdown-menu').not(parent).removeClass('open');
      parent.toggleClass('open');
    });

    this.scope.lodTypeMenuItems[id] = lodTypeMenuItems;

    unit.append(lodhint);
    lodhint.attr("id", "hint_" + id).attr("class", "plot-legendlod");

    this.scope.setMergedLodHint(line.lodDataIds, id);
  }

  getLodLabel(lodType) {
    switch(lodType){
      case 'box':
        return 'group into boxes';
      case 'river':
        return 'group into river';
      case 'off':
        return 'no grouping';
      default:
        return lodType;
    }
  }

  highlightElements(legendId, highlight) {
    if (!legendId) {
      return;
    }

    const elementsIds = this.scope.legendMergedLines[legendId].dataIds;

    for (let i = 0; i < elementsIds.length; i++) {
      let id = elementsIds[i];
      let data = this.scope.stdmodel.data[id];

      data.setHighlighted(this.scope, highlight);
    }
  }

  drawLegendPointer(d) {
    if (this.scope.gradientLegend) {
      this.scope.gradientLegend.drawPointer(d.ele.value);
    }
  };

  removeLegendPointer() {
    if (this.scope.gradientLegend) {
      this.scope.gradientLegend.removePointer();
    }
  };
}
