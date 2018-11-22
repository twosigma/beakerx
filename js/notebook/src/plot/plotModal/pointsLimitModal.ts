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

export default class PointsLimitModal {
  scope: any;

  constructor(scope: any) {
    this.scope = scope;
  }

  init() {
    const plotModel = this.scope.model.model;

    if (!plotModel.totalNumberOfPoints) {
      return;
    }

    const compiled = _.template(require('./pointsLimitModal.html'))({
      scopeId: this.scope.id,
      outputPointsLimit: plotModel.rowsLimitItems.toLocaleString('en'),
      outputPointsPreviewNumber: plotModel.numberOfPointsToDisplay.toLocaleString('en'),
      numberOfPoints: plotModel.totalNumberOfPoints.toLocaleString('en')
    });
    const $modal = $(compiled);

    $modal.on('click', '.btn-primary', () => { $modal.hide(); });

    this.scope.element.prepend($modal);

    if (plotModel.tooManyRows) {
      $modal.show();
    }
  };
};
