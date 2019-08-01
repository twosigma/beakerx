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
import modelStateMock from "../mock/modelStateMock";
import highlighterStateMock from "../mock/highlighterStateMock";
import {RENDERER_TYPE} from "../../../../../src/tableDisplay/dataGrid/interface/IRenderer";
import {DataGridColumnAction} from "../../../../../src/tableDisplay/dataGrid/store/DataGridAction";
import reducer, {
  ADD_COLUMN_HIGHLIGHTER, REMOVE_COLUMN_HIGHLIGHTER,
  UPDATE_COLUMN_FROZEN,
  UPDATE_COLUMN_ORDER,
  UPDATE_COLUMN_RENDERER, UPDATE_COLUMN_VISIBLE, UPDATE_COLUMNS_VISIBLE
} from "../../../../../src/tableDisplay/dataGrid/model/reducer";
import {COLUMN_TYPES} from "../../../../../src/tableDisplay/dataGrid/column/enums";
import {HIGHLIGHTER_TYPE} from "../../../../../src/tableDisplay/dataGrid/interface/IHighlighterState";

describe('model reducer', () => {
  const state = {...modelStateMock};

  it('should be a reducer function', () => {
    expect(reducer).to.be.a('Function');
  });

  it('should update rendererForColumn', () => {
    const renderer = { type: RENDERER_TYPE.DataBars, includeText: true };
    const action = new DataGridColumnAction(UPDATE_COLUMN_RENDERER, {
      columnType: COLUMN_TYPES.body,
      columnName: 'test',
      value: { type: RENDERER_TYPE.DataBars, includeText: true }
    });

    expect(reducer(state, action))
      .to.have.nested.property('rendererForColumn.test')
      .that.deep.equal(renderer);
  });

  it('should update columnOrder', () => {
    const action = new DataGridColumnAction(UPDATE_COLUMN_ORDER, {
      columnName: 'test',
      value: { value: 1, region: 'body' }
    });

    expect(reducer(state, action))
      .to.have.property('columnOrder')
      .that.deep.equal(['column', 'test']);
  });

  it('should update columnsFrozen', () => {
    const action = new DataGridColumnAction(UPDATE_COLUMN_FROZEN, {
      columnName: 'test',
      value: true
    });

    expect(reducer(state, action))
      .to.have.property('columnsFrozen')
      .that.deep.equal({ 'test': true });

    const disableFrozenAction = new DataGridColumnAction(UPDATE_COLUMN_FROZEN, {
      columnName: 'test',
      value: false
    });

    expect(reducer(state, disableFrozenAction))
      .to.have.property('columnsFrozen')
      .that.deep.equal({ 'test': false });
  });

  it('should update columnsVisible', () => {
    const state = {...modelStateMock, columnOrder: ['test']};
    const action = new DataGridColumnAction(UPDATE_COLUMN_VISIBLE, {
      columnName: 'test',
      columnIndex: 0,
      value: false
    });

    expect(reducer(state, action)).to.have.property('columnsVisible').that.deep.equal({ 'test': false });

    const showColumnAction = new DataGridColumnAction(UPDATE_COLUMN_VISIBLE, {
      columnIndex: 0,
      columnName: 'test',
      value: true
    });

    expect(reducer(state, showColumnAction)).to.have.property('columnsVisible').that.deep.equal({ 'test': true });

    const showColumnsAction = new DataGridColumnAction(
      UPDATE_COLUMNS_VISIBLE,
      { value: { test: true, column: false } }
    );
    const newState = reducer(state, showColumnsAction);

    expect(newState).to.have.property('columnsVisible').that.deep.equal({ test: true, column: false });
    expect(newState).to.have.property('columnOrder').that.deep.equal(['test']);

    const showAllColumnsAction = new DataGridColumnAction(UPDATE_COLUMNS_VISIBLE, {
      value: { test: true, column: true }
    });
    const latestState = reducer(state, showAllColumnsAction);

    expect(latestState).to.have.property('columnsVisible').that.deep.equal({ test: true, column: true });
    expect(latestState).to.have.property('columnOrder').that.deep.equal(['test', 'column']);

  });

  it('should update cellHighlighters', () => {
    const newHighlighterState = { ...highlighterStateMock, type: HIGHLIGHTER_TYPE.uniqueEntries };
    const action = new DataGridColumnAction(ADD_COLUMN_HIGHLIGHTER, {
      columnName: 'test',
      value: newHighlighterState
    });
    const newState = reducer(state, action);

    expect(newState)
      .to.have.property('cellHighlighters')
      .that.deep.equal([highlighterStateMock, newHighlighterState]);

    // Do not allow to add multiple instances of the same highlighter
    expect(reducer(newState, action))
      .to.have.property('cellHighlighters')
      .that.deep.equal([highlighterStateMock, newHighlighterState]);

    const removeHighlighterAction = new DataGridColumnAction(REMOVE_COLUMN_HIGHLIGHTER, {
      columnName: 'test',
      value: newHighlighterState
    });

    expect(reducer(state, removeHighlighterAction))
      .to.have.property('cellHighlighters')
      .that.deep.equal([highlighterStateMock]);

  });

});
