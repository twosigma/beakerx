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
  s.innerText = `.container { width:100% !important; }`;

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
