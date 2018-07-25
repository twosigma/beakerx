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

export interface modelData {
  plotId?: string,
  type?: string,
  title?: string,
  customStyles?: string,
  elementStyles?: string
  margin: {},
  showLegend: boolean,
  legendPosition: { position: string },
  legendLayout: string,
  useToolTip: boolean,
  plotSize: {
    width: number,
    height: number
  },
}

export interface StandardModelData extends modelData {
  orientation: "VERTICAL"|"HORIZONTAL",
  omitCheckboxes: boolean,
  xAxis: any,
  yAxis: any,
  yAxisR: any,
  userFocus: any,
  timezone: string,
  categoryNames: string[],
  showXGridlines: boolean,
  categoryMargin: number,
  categoryNamesLabelAngle: any,
  cumulative: any,
  binCount: number,
  normed: boolean,
  rangeMin: number,
  rangeMax: number,
  displayMode: string,
  rightClose: any,
  tips: any,
  tooltips: any,
  itemLabels: any,
  xCursor: any,
  yCursor: any,
  range: any,
  nanoOffset: any
}

export interface TreeMapModelData extends modelData {
  mode: string,
  ratio: any,
  sticky: any,
  round: any,
  valueAccessor: any
}
