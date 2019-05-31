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
import { reduce } from "@phosphor/algorithm";
import { CellRenderer } from "@phosphor/datagrid";
import {selectColumnNames} from "../model/selectors/column";
import BeakerXThemeHelper from "beakerx_shared/lib/utils/BeakerXThemeHelper";

const MAX_HUE_VALUE = 360;
const DEFAULT_HSL_COMPONENT_STEPS_COUNT = 50;

export default class UniqueEntriesHighlighter extends Highlighter {
  uniqueValues: any[] = [];
  uniqueColors = {};

  constructor(column: DataGridColumn, state: IHihglighterState) {
    super(column, state);

    this.generateUniqueValues();
  }

  getBackgroundColor(config: CellRenderer.ICellConfig) {
    return this.uniqueColors[this.getValueToHighlight(config)] || BeakerXThemeHelper.DEFAULT_CELL_BACKGROUND;
  }

  generateUniqueValues() {
    const valueResolver = this.column.getValueResolver();
    const generateColor = this.getColorGenerationFn(1, 1);

    reduce(
      this.model.getColumnValuesIterator(this.column),
      (acc, value) => {
        if (acc.indexOf(value) === -1) {
          acc.push(value);
          this.uniqueColors[valueResolver(value)] = generateColor();
        }

        return acc
      },
      this.uniqueValues
    );
  }

  getColorGenerationFn(initialSaturationRatio = 1, initialLightnessRatio = 1) {
    const goldenRatioConjugate = 0.618033988749895;
    let hueRatio = this.column.index / selectColumnNames(this.column.store.state).length;
    let saturationRatio = initialSaturationRatio;
    let lightnessRatio = initialLightnessRatio;
    let saturationStepCount = 0;
    let lightnessStepCount = 0;
    let hueValues = [];

    return () => {
      hueRatio += goldenRatioConjugate;
      hueRatio %= 1;

      let hue = Math.round(hueRatio * MAX_HUE_VALUE);
      let repeated = hueValues.indexOf(hue) !== -1;

      if (!repeated) {
        hueValues.push(hue);
      }

      if (repeated && saturationStepCount < DEFAULT_HSL_COMPONENT_STEPS_COUNT) {
        saturationRatio += goldenRatioConjugate;
        saturationRatio %= 1;
        saturationStepCount += 1;
      }

      if ((
          repeated && saturationStepCount > DEFAULT_HSL_COMPONENT_STEPS_COUNT
          || saturationStepCount > DEFAULT_HSL_COMPONENT_STEPS_COUNT
        ) && lightnessStepCount < DEFAULT_HSL_COMPONENT_STEPS_COUNT
      ) {
        lightnessRatio += goldenRatioConjugate;
        lightnessRatio %= 1;
        lightnessStepCount += 1;
      }

      let saturation = BeakerXThemeHelper.MIN_SATURATION_VALUE + saturationRatio * DEFAULT_HSL_COMPONENT_STEPS_COUNT;
      let lightness = BeakerXThemeHelper.MIN_LIGHTNESS_VALUE + lightnessRatio * DEFAULT_HSL_COMPONENT_STEPS_COUNT;

      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
  }
}
