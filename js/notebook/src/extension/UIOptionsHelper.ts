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

import BeakerXApi from "beakerx_shared/lib/api/BeakerXApi";
import * as GistPublish from "./gistPublish/index";

export function registerFeature(baseUrl: string): void {
  if (!!Jupyter.NotebookList) {
    return;
  }

  const api = new BeakerXApi(baseUrl);
  api.loadSettings()
    .then((data) => {

      setupAutoCloseBrackets(data.ui_options.auto_close);
      setupWideCells(data.ui_options.wide_cells);
      setupImproveFonts(data.ui_options.improve_fonts);
      setupShowPublication(data.ui_options.show_publication);
      setupShowCatalog(data.ui_options.show_catalog);
      setupAutoSave(data.ui_options.auto_save);

    })
    .catch((e) => {
      console.log(e);
    });
}

function setupAutoCloseBrackets(autoCloseBrackets: boolean): void {
  // new cells
  Jupyter.CodeCell.options_default.cm_config.autoCloseBrackets = autoCloseBrackets;

  // existing
  const code_cells = Jupyter.notebook.get_cells().filter((cell) => {
    return cell.cell_type === 'code';
  });

  for (let cell of code_cells) {
    let cm = cell.code_mirror;
    if (cm.getOption('autoCloseBrackets') !== autoCloseBrackets) {
      cm.setOption('autoCloseBrackets', autoCloseBrackets);
    }
  }

}

function setupWideCells(wideCells: boolean): void {
  if (!wideCells) {
    return;
  }

  let s = document.createElement('style');
  s.innerText = `#notebook_panel .container { width:auto; margin: 0 16px; }`;

  document.body.appendChild(s);
}

function setupImproveFonts(improveFonts: boolean) {
  if (!improveFonts) {
    return;
  }

  document.body.classList.add('improveFonts');
}

function setupShowPublication(showPublication: boolean) {
  if (!showPublication) {
    return;
  }
  GistPublish.registerFeature();
}

function setupShowCatalog(showCatalog: boolean) {
  if (!showCatalog) {
    return;
  }
}

function setupAutoSave(autoSave: boolean) {
  if (autoSave) {
    return;
  }

  Jupyter.notebook.set_autosave_interval(0);
}
