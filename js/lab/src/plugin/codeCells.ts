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

import { Notebook } from "@jupyterlab/notebook";
import { Kernel } from "@jupyterlab/services";
import { JSONArray } from '@phosphor/coreutils';
import { Cell, CodeCell, CodeCellModel } from '@jupyterlab/cells';

export function sendJupyterCodeCells(
  kernelInstance: Kernel.IKernelConnection,
  notebook: Notebook,
  filter: string
): void {
  const comm = kernelInstance.connectToComm('beaker.getcodecells');
  const codeCells = <JSONArray>getCodeCellsByTag(notebook, filter)
    .map((cell: CodeCell): object => ({
        cell_type: cell.model.type,
        ...cell.model.toJSON()
      })
    );

  comm.open();
  comm.send({ code_cells: codeCells });
  comm.dispose();
}

export function getCodeCellsByTag(notebook: Notebook, tag: string): Cell[] {
  let cells = notebook.widgets || [];

  return cells.filter((cell) => {
    const tags: any = cell.model.metadata.get('tags');

    return (
      cell.model instanceof CodeCellModel &&
      tags && tags.length && tags.includes(tag)
    );
  });
}
