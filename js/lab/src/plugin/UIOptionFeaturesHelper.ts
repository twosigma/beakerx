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

import * as GistPublish from "./gistPublish/index";
import { ISettingRegistry, PageConfig } from "@jupyterlab/coreutils";
import { ServerConnection } from "@jupyterlab/services";
import { NotebookPanel } from "@jupyterlab/notebook";
import { CodeCell } from "@jupyterlab/cells";
import {ILabShell, JupyterFrontEnd} from "@jupyterlab/application";

export default class UIOptionFeaturesHelper {

  private showPublicationFeature: ShowPublicationFeature;
  private autoCloseBracketsFeature: AutoCloseBracketsFeature;
  private autoSaveFeature: AutoSaveFeature;
  private improveFontsFeature: ImproveFontsFeature;

  constructor(
    private app: JupyterFrontEnd,
    private settings: ISettingRegistry,
    private panel: NotebookPanel,
    private labShell: ILabShell
  ) {
  }

  public registerFeatures(): void {

    this.showPublicationFeature = new ShowPublicationFeature(this.panel);
    this.autoCloseBracketsFeature = new AutoCloseBracketsFeature(this.panel);
    this.autoSaveFeature = new AutoSaveFeature(this.settings, this.app.commands);
    this.improveFontsFeature = new ImproveFontsFeature();

    this.labShell.activeChanged.connect((sender, args) => {
      if (args.newValue !== this.panel) {
        return;
      }
      document.body.dataset.notebookPath = this.panel.context.path;
      this.onActiveChanged();
    });

    this
      .loadSettings()
      .then((data) => {
        this.initFeatures(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  private onActiveChanged(): void {
    this.loadSettings()
      .then((data) => {
        this.updateFeatures(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  private initFeatures(data): void {
    this.showPublicationFeature.init(data.beakerx.ui_options.show_publication);
    this.autoCloseBracketsFeature.init(data.beakerx.ui_options.auto_close)
    this.autoSaveFeature.init(data.beakerx.ui_options.auto_save);
    this.improveFontsFeature.init(data.beakerx.ui_options.improve_fonts);
  }

  private updateFeatures(data): void {
    this.showPublicationFeature.update(data.beakerx.ui_options.show_publication);
    this.autoCloseBracketsFeature.update(data.beakerx.ui_options.auto_close)
    this.autoSaveFeature.update(data.beakerx.ui_options.auto_save);
    this.improveFontsFeature.update(data.beakerx.ui_options.improve_fonts);
  }

  private loadSettings(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let serverSettings = ServerConnection.makeSettings();
      let settingsUrl = `${PageConfig.getBaseUrl()}beakerx/settings`;
      ServerConnection.makeRequest(
        settingsUrl,
        { method: 'GET' },
        serverSettings
      )
        .then(response => resolve(response.json()))
        .catch(reason => { reject(reason); console.log(reason); });
    });
  }
}

interface IUIOptionsFeature {
  init(isEnabled: boolean): void;
  update(isEnabled: boolean): void;
}

class ShowPublicationFeature implements IUIOptionsFeature {

  constructor(private panel: NotebookPanel) {}

  public init(isEnabled: boolean) {
    GistPublish.registerFeature(this.panel, isEnabled);
  }

  public update(isEnabled: boolean): void {
    GistPublish.registerFeature(this.panel, isEnabled);
  }
}

class AutoCloseBracketsFeature implements IUIOptionsFeature {

  constructor(private panel: NotebookPanel) {}

  public init(isEnabled: boolean): void {
    this.setOptionForNewAndExistingCells(isEnabled);
  }

  public update(isEnabled: boolean) {
    this.setOptionForNewAndExistingCells(isEnabled);
  }

  private setOptionForNewAndExistingCells(autoClosingBrackets: boolean) {
    this.panel.content.editorConfig.code.autoClosingBrackets = autoClosingBrackets;

    for (let cell of this.getCodeCells()) {
      cell.editor.setOption('autoClosingBrackets', autoClosingBrackets);
    }
  }

  private getCodeCells(): CodeCell[] {
    const cells = this.panel.content.widgets || [];
    return <CodeCell[]>cells.filter((cell) => {
      return (cell instanceof CodeCell);
    });
  }
}

class AutoSaveFeature implements IUIOptionsFeature {

  private pluginId: string = '@jupyterlab/docmanager-extension:plugin';
  private commandId: string = 'docmanager:toggle-autosave';

  constructor(private settings: ISettingRegistry, private commands) {
  }

  public init(isEnabled: boolean): void {
    this.runToggleAutoSaveCommandIfNeeded(isEnabled);
  }

  public update(isEnabled: boolean): void {
    this.runToggleAutoSaveCommandIfNeeded(isEnabled);
  }

  private runToggleAutoSaveCommandIfNeeded(isEnabled: boolean): void {
    this.settings
      .get(this.pluginId, 'autosave')
      .then((val) => {
        if (val.composite !== isEnabled) {
          this.commands.execute(this.commandId);
        }
      });
  }
}

class ImproveFontsFeature implements IUIOptionsFeature {

  public init(isEnabled: boolean): void {
    if (isEnabled) {
      document.body.classList.add('improveFonts');
    }
  }

  public update(isEnabled: boolean): void {
    if (isEnabled) {
      document.body.classList.add('improveFonts');
    } else {
      document.body.classList.remove('improveFonts');
    }
  }

}
