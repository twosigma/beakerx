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

import { Widget } from '@phosphor/widgets';
import { DisposableDelegate } from '@phosphor/disposable';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { INotebookModel, NotebookPanel } from '@jupyterlab/notebook';
import { registerCommTargets } from './comm';
import { registerCommentOutCmd } from './codeEditor';

declare global {
  interface Window {
    beakerx: any,
    require: Function
  }
}

function displayHTML(widget: Widget, html: string): void {
  if (!widget.node || !html) {
    return;
  }

  const childElement = document.createElement('pre');

  childElement.classList.add('jp-RenderedHTML');
  childElement.innerHTML = html;
  widget.node.appendChild(childElement);
}

function registerGlobal(): void {
  window.beakerx = window.beakerx || {};
  window.beakerx.displayHTML = displayHTML;
}

class BeakerxExtension implements DocumentRegistry.WidgetExtension {
  createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>) {
    registerGlobal();

    Promise.all([panel.ready, context.ready]).then(function() {
      registerCommentOutCmd(panel);
      registerCommTargets(panel, context);
    });

    return new DisposableDelegate(() => { });
  }
}

export default BeakerxExtension;
