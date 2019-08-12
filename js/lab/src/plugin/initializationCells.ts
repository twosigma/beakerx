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

import { NotebookPanel } from "@jupyterlab/notebook";
import { Cell, CodeCell } from '@jupyterlab/cells';
import { showDialog, Dialog } from '@jupyterlab/apputils';
import { ToolbarButton } from '@jupyterlab/apputils'

export interface IInitCellsOptions {
  run_on_kernel_ready: boolean,
  run_untrusted?: boolean
}

const modName = 'init_cell';
const logPrefix = `[${modName}]`;

export function enableInitializationCellsFeature(panel: NotebookPanel): void {
  const modOptions = panel.model.metadata[modName];
  const options = { run_on_kernel_ready: true, ...modOptions };

  registerNotebookInitCellsAction(panel, options);

  panel.session.kernel.ready.then(() => runInitCells(panel, options));
}

export function runInitCells(panel: NotebookPanel, options: IInitCellsOptions): void {
    const cells: CodeCell[] = getInitCells(panel);
  
    handleUntrustedKernelInitCells(cells, options);
  
    if (!canExecuteInitCells(panel, options, cells)) {
      return;
    }
  
    console.log(logPrefix, 'running all initialization cells');
    cells.forEach((cell: CodeCell) => CodeCell.execute(cell, panel.session));
    console.log(logPrefix, `finished running ${cells.length} initialization cell${(cells.length !== 1 ? 's' : '')}`);
}

export function getInitCells(panel: NotebookPanel): CodeCell[] {
  const cells = panel.content.widgets || [];

  return <CodeCell[]>cells.filter(
    (cell: Cell) => ((cell instanceof CodeCell) && cell.model.metadata.get('init_cell'))
  );
}

function canExecuteInitCells (panel: NotebookPanel, options: IInitCellsOptions, cells: CodeCell[]) {
  const trusted = cells.length && cells[0].model.trusted;

  return (
    options.run_on_kernel_ready &&
    (trusted || options.run_untrusted) &&
    panel.session.kernel &&
    panel.session.kernel.info.status === 'ok'
  );
}

function handleUntrustedKernelInitCells(cells: CodeCell[], options: IInitCellsOptions) {
  if (cells.length && !cells[0].model.trusted && !options.run_untrusted) {
    showDialog({
      title: 'Initialization cells in untrusted notebook',
      body : 'This notebook is not trusted, so initialization cells will not be automatically run on kernel load. You can still run them manually, though.',
      buttons: [ Dialog.okButton({ label: 'OK' }) ]
    });
  }
}

export function registerNotebookInitCellsAction(
  panel: NotebookPanel,
  options: IInitCellsOptions
): void {
  const action = {
    iconClassName: 'bx-RunInitializationCellsIcon fa fa-calculator',
    tooltip: 'Run all initialization cells',
    onClick: () => runInitCells(panel,{ ...options, run_untrusted: true })
  };

  panel.toolbar.insertItem(9,'run-initialization-cells', new ToolbarButton(action));
}
