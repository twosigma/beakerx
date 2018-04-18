/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

import Highlighter from "./Highlighter";
import IHihglighterState from "../interface/IHighlighterState";
import DataGridColumn from "../column/DataGridColumn";
import { reduce, each } from "@phosphor/algorithm";
import { CellRenderer } from "@phosphor/datagrid";
import {DEFAULT_CELL_BACKGROUND} from "../style/dataGridStyle";

const MAX_HUE_VALUE = 360;
const DEFAULT_HSL_COMPONENT_STEPS_COUNT = 50;
const MIN_SATURATION_VALUE = 25;
const MIN_LIGHTNESS_VALUE = 35;

export default class UniqueEntriesHighlighter extends Highlighter {
  uniqueValues: any[] = [];
  uniqueColors = {};

  constructor(column: DataGridColumn, state: IHihglighterState) {
    super(column, state);

    this.generateUniqueValues();
    this.generateUniqueColors();
  }

  getBackgroundColor(config: CellRenderer.ICellConfig) {
    return this.uniqueColors[this.getValueToHighlight(config)] || DEFAULT_CELL_BACKGROUND;
  }

  generateUniqueValues() {
    reduce(
      this.model.getColumnValuesIterator(this.column),
      (acc, value) => {
        acc.indexOf(value) === -1 && acc.push(value);

        return acc
      },
      this.uniqueValues
    );
  }

  generateUniqueColors() {
    const valueResolver = this.column.getValueResolver();
    const colorsCount = this.uniqueValues.length;
    const palette = this.generatColorPalette(colorsCount);

    each(this.uniqueValues, (value, index) => {
      this.uniqueColors[valueResolver(value)] = palette.splice(
        Math.floor(palette.length * Math.random()), 1
      )[0];
    });
  }

  getHslPaletteConfig(colorsCount: number) {
    const saturationStepsCount = Math.ceil(colorsCount / MAX_HUE_VALUE);
    const saturationSteps = saturationStepsCount > DEFAULT_HSL_COMPONENT_STEPS_COUNT ? DEFAULT_HSL_COMPONENT_STEPS_COUNT : saturationStepsCount;
    const lightnessStepsCount = Math.ceil(colorsCount / saturationSteps / MAX_HUE_VALUE);
    const lightnessSteps = lightnessStepsCount > DEFAULT_HSL_COMPONENT_STEPS_COUNT ? DEFAULT_HSL_COMPONENT_STEPS_COUNT : lightnessStepsCount;

    return {
      lightnessSteps,
      saturationSteps,
    };
  }

  generatColorPalette(colorsCount: number) {
    const paletteConfig = this.getHslPaletteConfig(colorsCount);
    const palette = [];
    const maxHue = colorsCount > MAX_HUE_VALUE ? MAX_HUE_VALUE : colorsCount;

    for (let i = 0; i <= maxHue; i += 1) {
      let hue = i * (MAX_HUE_VALUE / maxHue);

      for (let j = 1; j <= paletteConfig.saturationSteps; j += 1) {
        let saturation = MIN_SATURATION_VALUE + j * (DEFAULT_HSL_COMPONENT_STEPS_COUNT / paletteConfig.saturationSteps);

        for (let k = 1; k <= paletteConfig.lightnessSteps; k += 1) {
          let lightness = MIN_LIGHTNESS_VALUE + k * (DEFAULT_HSL_COMPONENT_STEPS_COUNT / paletteConfig.lightnessSteps);

          palette.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
        }
      }
    }

    return palette;
  }
}
