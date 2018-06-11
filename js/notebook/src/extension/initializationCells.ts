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

/// <reference path='../types/index.d.ts'/>

export interface IInitCellsOptions {
  run_on_kernel_ready: boolean,
  run_untrusted?: boolean
}

const CellToolbar = require('notebook/js/celltoolbar').CellToolbar;
const CodeCell = require('notebook/js/codecell').CodeCell;
const dialog = require('base/js/dialog');
const events = require('base/js/events');
const modName = 'init_cell';
const logPrefix = `[${modName}]`;

export const TOOLBAR_PRESET_NAME = 'Initialization Cell';

export const initCellUiCallback = CellToolbar.utils.checkbox_ui_generator(
  TOOLBAR_PRESET_NAME,
  (cell, value) => {
    if (value) {
      cell.metadata.init_cell = true;
    } else {
      delete cell.metadata.init_cell;
    }
  },
  (cell) => cell.metadata.init_cell // if init_cell is undefined, it'll be interpreted as false anyway
);

export function registerCelltoolbarPreset(): void {
  if (CellToolbar.list_presets().indexOf(TOOLBAR_PRESET_NAME) > -1) {
    return;
  }

  CellToolbar.register_callback('init_cell.is_init_cell', initCellUiCallback, 'code');
  CellToolbar.register_preset(TOOLBAR_PRESET_NAME, ['init_cell.is_init_cell'], Jupyter.notebook);
}

export function enableInitializationCellsFeature(options: IInitCellsOptions) {
  const modOptions = Jupyter.notebook.metadata[modName];

  if (modOptions !== undefined) {
    console.log(logPrefix, 'updating options from notebook metadata:', modOptions);
    options = { ...options, ...modOptions };
  }

  registerCelltoolbarPreset();
  registerNotebookInitCellsAction(options);
  runInitCells(options);

  events.on('kernel_ready.Kernel', () => runInitCells(options));
}

export function runInitCells(options: IInitCellsOptions): void {
  let cells = getInitCells();

  handleUntrustedKernelInitCells(cells, options);

  if (!canExecuteInitCells(options)) {
    return;
  }

  console.log(logPrefix, 'running all initialization cells');

  let num = 0;

  for (let i = 0; i < cells.length; i++) {
    cells[i].execute();
    num++;
  }

  console.log(logPrefix, `finished running ${num} initialization cell${(num !== 1 ? 's' : '')}`);
}

export function getInitCells(): any[] {
  return Jupyter.notebook
    .get_cells()
    .filter((cell) => (cell instanceof CodeCell) && cell.metadata.init_cell === true);
}

function canExecuteInitCells (options: IInitCellsOptions) {
  return (
    options.run_on_kernel_ready &&
    Jupyter.notebook &&
    (Jupyter.notebook.trusted || options.run_untrusted) &&
    Jupyter.notebook.kernel &&
    Jupyter.notebook.kernel.info_reply.status === 'ok'
  );
}

function handleUntrustedKernelInitCells(cells, options) {
  if (!Jupyter.notebook.trusted && !options.run_untrusted && cells.length) {
    dialog.modal({
      title : 'Initialization cells in untrusted notebook',
      body : 'This notebook is not trusted, so initialization cells will not be automatically run on kernel load. You can still run them manually, though.',
      buttons: {'OK': {'class' : 'btn-primary'}},
      notebook: Jupyter.notebook,
      keyboard_manager: Jupyter.keyboard_manager,
    });
  }
}

export function registerNotebookInitCellsAction(options): void {
  const prefix = 'auto';
  const action_name = 'run-initialization-cells';
  const action = {
    icon: 'fa-calculator',
    help: 'Run all initialization cells',
    help_index : 'zz',
    handler : () => runInitCells({ ...options, run_untrusted: true })
  };
  const action_full_name = Jupyter.notebook.keyboard_manager.actions.register(
    action,
    action_name,
    prefix
  );

  // add toolbar button
  Jupyter.toolbar.add_buttons_group([action_full_name]);
}
