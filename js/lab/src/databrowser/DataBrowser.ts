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

import {NotebookPanel} from "@jupyterlab/notebook";
import {JupyterLab} from "@jupyterlab/application";
import {Widget} from "@phosphor/widgets";
import DataBrowserList from "./DataBrowserList";
import {Message, MessageLoop} from "@phosphor/messaging";
import {
  SearchMessage,
  TYPE_DATABROWSER_HIDE_SEARCH,
  TYPE_DATABROWSER_SEARCH,
  TYPE_DATABROWSER_SHOW_SEARCH
} from "./DataBrowserMessages";

export default class DataBrowser extends Widget {
  private list: DataBrowserList;
  public currentPanel: NotebookPanel = null;

  constructor(private app: JupyterLab) {
    super({ node: DataBrowser.createNode() });

    this.id = 'beakerx:databrowser';
    this.title.iconClass = 'jp-SideBar-tabIcon fa fa-database bx-dataBrowser-icon';
    this.title.caption = 'Data browser';

    this.app.shell.activeChanged.connect((sender, args) => {
      if (args.newValue === null || this.currentPanel === args.newValue || !(args.newValue instanceof NotebookPanel)) { return; }
      this.currentPanel = <NotebookPanel>args.newValue;
      this.list.update();
      this.currentPanel.disposed.connect(() => {
        this.currentPanel = null;
        this.list.update();
      })
    });

    this.bindEvents();
  }

  public getKernelName():string {
    if (this.currentPanel === null) { return ''; }
    return this.currentPanel.session.kernel.name;
  }

  protected onAfterAttach(msg): void {
    this.list = new DataBrowserList(this);
    Widget.attach(this.list, this.node.querySelector('.bx-dataBrowser-content'));
  }

  static createNode(): HTMLElement {
    let node = document.createElement('div');
    let search = document.createElement('div');
    let input = document.createElement('input');
    let content = document.createElement('div');

    node.className = 'bx-dataBrowser';
    search.className = 'bx-dataBrowser-search';
    input.placeholder = 'Search...';
    input.className = 'bx-dataBrowser-search-input';
    content.className = 'bx-dataBrowser-content';

    search.appendChild(input);

    node.appendChild(search);
    node.appendChild(content);

    return node;
  }

  private bindEvents(): void {
    let input: HTMLInputElement = this.node.querySelector('.bx-dataBrowser-search-input');

    input.addEventListener('keyup', () => {
      MessageLoop.sendMessage(this, new SearchMessage(input.value.toLowerCase()));
    });
  }

  processMessage(msg: Message): void {
    switch (msg.type) {
      case TYPE_DATABROWSER_SEARCH:
        this.doSearch((msg as SearchMessage).query);
        break;
      case TYPE_DATABROWSER_HIDE_SEARCH:
        this.node.querySelector('.bx-dataBrowser-search').classList.add('bx-hidden');
        break;
      case TYPE_DATABROWSER_SHOW_SEARCH:
        this.node.querySelector('.bx-dataBrowser-search').classList.remove('bx-hidden');
        break;
      default:
        super.processMessage(msg);
        break;
    }
  }

  doSearch(query: string): void {
    this.list.filter(query);
  }

}
