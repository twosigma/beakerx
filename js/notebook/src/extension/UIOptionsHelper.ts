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

import './../global.env';

import BeakerXApi from "../tree/Utils/BeakerXApi";
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
    return cell.cell_type = 'code';
  });

  const patch = {
    CodeCell: {
      cm_config: {
        autoCloseBrackets: autoCloseBrackets
      }
    }
  };

  for (let cell of code_cells) {
    cell.config.update(patch);
  }

}

function setupWideCells(wideCells: boolean): void {
  if (!wideCells) {
    return;
  }

  let s = document.createElement('style');
  s.innerText = `#notebook_panel .container { width:auto; margin: 15px; }`;

  document.body.appendChild(s);
}

function setupImproveFonts(improveFonts: boolean) {
  // TODO;
  console.log('handle improve fonts', improveFonts);
}

function setupShowPublication(showPublication: boolean) {
  if (!showPublication) {
    return;
  }
  GistPublish.registerFeature();
}
