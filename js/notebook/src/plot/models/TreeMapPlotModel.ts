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

import AbstractPlotModel from "./AbstractPlotModel";

const plotFactory = require('../plotFactory');

export default class TreeMapPlotModel extends AbstractPlotModel {
  format(newmodel) {
    newmodel.data = newmodel.data || [];

    const data = newmodel.data;

    for (let i = 0; i < data.length; i++) {
      plotFactory.recreatePlotItem(data[i]);
    }
  }

  createNewModel(model) {
    let newmodel = super.createNewModel(model);

    return {
      ...newmodel,
      mode: model.mode,
      ratio: model.ratio,
      sticky: model.sticky,
      round: model.round,
      valueAccessor: model.valueAccessor
    };
  }
}
