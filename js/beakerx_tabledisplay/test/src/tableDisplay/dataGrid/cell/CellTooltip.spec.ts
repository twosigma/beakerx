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

import { expect } from 'chai';
import CellTooltip from "../../../../../src/tableDisplay/dataGrid/cell/CellTooltip";

describe('CellTooltip', () => {
  const tooltip = new CellTooltip('test', document.body);

  it('should return true', () => {
    expect(tooltip).to.be.an.instanceof(CellTooltip);
  });

  it('should implement show method', () => {
    tooltip.show(1,2);

    expect(tooltip.node.style.left).to.equal('1px');
    expect(tooltip.node.style.top).to.equal('2px');

    tooltip.show(3,4);

    expect(tooltip.node.style.left).to.equal('1px');
    expect(tooltip.node.style.top).to.equal('2px');
  });

  it('should implement hide method', () => {
    tooltip.hide();

    expect(tooltip.node.classList.contains('visible')).to.be.false;
  });
});
