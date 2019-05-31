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
import {DataGridHelpers} from "../../../../src/tableDisplay/dataGrid/dataGridHelpers";

describe('DataGridHelpers', () => {
  it('should export escapeHTML helper function', () => {
    expect(DataGridHelpers.escapeHTML).to.be.a('function');
  });

  it('should escape html characters', () => {
    const testObject = {};

    expect(DataGridHelpers.escapeHTML('&test<>"Works"Ok/<>'))
      .to.equal('&amp;test&lt;&gt;"Works"Ok&#47;&lt;&gt;');
    expect(DataGridHelpers.escapeHTML(testObject)).to.equal(testObject);
  });

  it('should export truncateString helper function', () => {
    expect(DataGridHelpers.truncateString).to.be.a('function');
  });

  it('should truncate string', () => {
    const testObject = {};

    expect(DataGridHelpers.truncateString('testString')).to.equal('testString');
    expect(DataGridHelpers.truncateString('testString', 2)).to.equal('te...');
    expect(DataGridHelpers.truncateString('testString', 0)).to.equal('...');
    expect(DataGridHelpers.truncateString(testObject)).to.equal(testObject);
  });

  it('should implement isUrl method', () => {
    expect(DataGridHelpers.isUrl('testString')).to.be.false;
    expect(DataGridHelpers.isUrl('a/b')).to.be.false;
    expect(DataGridHelpers.isUrl('/a/b')).to.be.false;
    expect(DataGridHelpers.isUrl('//a/b')).to.be.false;
    expect(DataGridHelpers.isUrl('www.a.b')).to.be.false;
    expect(DataGridHelpers.isUrl('http://a/b')).to.be.true;
    expect(DataGridHelpers.isUrl('ftp://a/b')).to.be.true;
  });

});
