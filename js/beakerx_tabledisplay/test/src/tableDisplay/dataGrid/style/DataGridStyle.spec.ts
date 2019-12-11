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

import { expect } from 'chai';
import { DataGrid } from '@phosphor/datagrid';
import BeakerXThemeHelper from "beakerx_shared/lib/utils/BeakerXThemeHelper";

describe('dataGridStyle', () => {
  it('should be an object', () => {
    expect(BeakerXThemeHelper.getStyle()).to.be.an('object');
  });

  it('should have same properties as DataGrid.defaultStyle', () => {
    expect(BeakerXThemeHelper.getStyle()).to.have.any.keys(Object.keys(DataGrid.defaultStyle));
  });

  it('should have the voidColor set to #ffffff', () => {
    expect(BeakerXThemeHelper.getStyle().voidColor).to.equal('#ffffff');
  });

  it('should have the rowBackgroundColor method', () => {
    expect(BeakerXThemeHelper.getStyle().rowBackgroundColor).to.be.a('function');
  });
});
