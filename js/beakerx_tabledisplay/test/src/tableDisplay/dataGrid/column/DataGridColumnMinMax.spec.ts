/*
 *  Copyright 2020 TWO SIGMA OPEN SOURCE, LLC
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
import {expect} from 'chai';
import modelStateMock from "../mock/modelStateMock";
import {BeakerXDataGrid} from "../../../../../src/tableDisplay/dataGrid/BeakerXDataGrid";
import createStore from "../../../../../src/tableDisplay/dataGrid/store/BeakerXDataStore";
import tableDisplayWidgetMock from "../mock/tableDisplayMock";

describe('DataGridColumn Min and Max ', () => {
    const dataStore = createStore({
        ...modelStateMock,
        types: ['string'],
        values: [["24a"], [24522], [2563]],
        columnNames: ['integer column']
    });
    const dataGrid = new BeakerXDataGrid({}, dataStore, tableDisplayWidgetMock);
    const columnManager = dataGrid.columnManager;

    describe('for string column with integers', () => {
        it('should have min, max and longestStringValue values set', () => {
            const column = columnManager.bodyColumns[0];
            expect(column).to.have.property('minValue');
            expect(column).to.have.property('maxValue');
            expect(column).to.have.property('longestStringValue');
            expect(column.minValue).to.equal(2563);
            expect(column.maxValue).to.equal(24522);
            expect(column.longestStringValue).to.equal(24522);
        });
    });
});

describe('DataGridColumn Min and Max ', () => {
    const dataStore = createStore({
        ...modelStateMock,
        types: ['string'],
        values: [["24a"], ["24522"], ["2563"]],
        columnNames: ['integer column']
    });
    const dataGrid = new BeakerXDataGrid({}, dataStore, tableDisplayWidgetMock);
    const columnManager = dataGrid.columnManager;

    describe('for string column', () => {
        it('should have the min, max and longestStringValue values set', () => {
            const column = columnManager.bodyColumns[0];
            expect(column).to.have.property('minValue');
            expect(column).to.have.property('maxValue');
            expect(column).to.have.property('longestStringValue');
            expect(column.minValue).to.equal("2563");
            expect(column.maxValue).to.equal("24522");
            expect(column.longestStringValue).to.equal("24522");
        });
    });
});



describe('DataGridColumn Min and Max ', () => {
    const dataStore = createStore({
        ...modelStateMock,
        types: ['time'],
        values: [[0], [1591000000], [1491000000]],
        columnNames: ['time column']
    });
    const dataGrid = new BeakerXDataGrid({}, dataStore, tableDisplayWidgetMock);
    const columnManager = dataGrid.columnManager;

    describe('for time column', () => {
        it('should have the min and max values set', () => {
            const column = columnManager.bodyColumns[0];
            expect(column).to.have.property('minValue');
            expect(column).to.have.property('maxValue');
            expect(column.minValue).to.equal(0);
            expect(column.maxValue).to.equal(0);
        });
    });
});