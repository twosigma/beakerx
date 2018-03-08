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

import * as _ from 'underscore';
import * as $ from 'jquery';

export default function plotModal(PlotScope: any) {

  PlotScope.prototype.initPointsLimitModal = function() {
    const plotModel = this.model.model;

    if (!plotModel.numberOfPoints) {
      return;
    }

    const compiled = _.template(require('./pointsLimitModal.html'))({
      scopeId: this.id,
      outputPointsLimit: plotModel.outputPointsLimit.toLocaleString('en'),
      outputPointsPreviewNumber: plotModel.outputPointsPreviewNumber.toLocaleString('en'),
      numberOfPonts: plotModel.numberOfPoints.toLocaleString('en')
    });
    const $modal = $(compiled);

    $modal.on('click', '.btn-primary', () => { $modal.hide(); });

    this.element.prepend($modal);

    if (plotModel.numberOfPoints > plotModel.outputPointsLimit) {
      $modal.show();
    }
  };
};
