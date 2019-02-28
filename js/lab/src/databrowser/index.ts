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

import {JupyterLab, JupyterLabPlugin} from "@jupyterlab/application";
import {Widget} from "@phosphor/widgets";

export const databrowserPlugin: JupyterLabPlugin<void> = {
  id: 'beakerx:databrowser:plugin',
  requires: [],
  activate: function(app: JupyterLab) {
    // TODO
    console.log('databrowser.activate');
    const { shell } = app;

    const browser: any = buildDataBrowser();
    shell.addToLeftArea(browser);
  },
  autoStart: true
};

function buildDataBrowser(): DataBrowser {
  return new DataBrowser();
}

class DataBrowser extends Widget {
  constructor() {
    super({ node: DataBrowser.createNode() });
    this.id = 'beakerx:databrowser';
    this.title.iconClass = 'jp-SideBar-tabIcon fa fa-database';
    this.title.caption = 'Data browser';

  }

  protected onAfterAttach(msg): void {
    let w = new DataBrowserList();
    Widget.attach(w, this.node.querySelector('.bx-dataBrowser-content'));
  }

  static createNode(): HTMLElement {
    let node = document.createElement('div');
    let search = document.createElement('div');
    let input = document.createElement('input');
    let content = document.createElement('div');

    node.className = 'bx-dataBrowser';
    search.className = 'bx-dataBrowser-search';
    input.placeholder = 'Search...';
    content.className = 'bx-dataBrowser-content';

    search.appendChild(input);
    node.appendChild(DataBrowser.createStyleNode()); // TODO remove
    node.appendChild(search);
    node.appendChild(content);

    return node;
  }

  static createStyleNode(): HTMLElement {
    let style = document.createElement('style');
    let css = `
.bx-dataBrowser {
  display: flex;
  
  flex-direction: column;
  background-color: #fff;
  padding: 8px;
}

.bx-dataBrowser-search {
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-direction: row;
  border: 1px solid var(--jp-border-color0); 
}

.bx-dataBrowser-search:focus-within {
  border: 1px solid var(--md-blue-500); 
  box-shadow: inset 0 0 4px var(--md-blue-300); 
}

.bx-dataBrowser-search::after {
  content: ' ';
  color: white;
  background-color: var(--jp-brand-color1);
  position: absolute;
  top: 8px;
  right: 8px;
  height: 32px;
  width: 12px;
  padding: 0px 12px;
  background-image: var(--jp-icon-search-white);
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: center;
}

.bx-dataBrowser-search input {
  padding: 1px 8px;
  width: calc(100% - 18px);
  background: transparent;
  border: none;
  float: left;
  outline: none;
  font-size: 13px;
  line-height:28px;
}

.bx-dataBrowser-content {
  display: flex;
  flex-direction: row;
  margin: 8px 0 0 0;
  max-height: 100%;
  overflow-y: auto;
}

.bx-dataBrowser-list {
  height: max-content;
  width: 100%;
}
`;
    style.appendChild(document.createTextNode(css));

    return style;
  }
}

class DataBrowserList extends Widget {
  constructor() {
    super({ node: DataBrowserList.createNode() });
  }

  static createNode(): HTMLElement {
    let content = document.createElement('div');
    content.className = 'bx-dataBrowser-list';
    content.innerHTML = `
<ol>
    <li>a</li><li>b</li>
    <li>a</li><li>b</li>
    <li>a</li><li>b</li>
    <li>a</li><li>b</li>
    <li>a</li><li>b</li>
    <li>a</li><li>b</li>
    <li>a</li><li>b</li>
    <li>a</li><li>b</li>
</ol>`;
    return content;
  }
}
