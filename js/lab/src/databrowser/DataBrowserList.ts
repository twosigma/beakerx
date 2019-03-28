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

import {Widget} from "@phosphor/widgets";
import {MessageLoop, Message} from "@phosphor/messaging";
import {NotebookActions} from "@jupyterlab/notebook";
import DataBrowser from "./DataBrowser";
import QuandlProvider from "./providers/QuandlProvider";
import {IDataBrowserProviderListItem} from "./providers/IDataBrowserProviderList";
import {TYPE_DATABROWSER_HIDE_SEARCH, TYPE_DATABROWSER_SHOW_SEARCH} from "./DataBrowserMessages";

const providers = {
  Quandl: new QuandlProvider()
};

export default class DataBrowserList extends Widget {
  private query: string;
  private readonly dataBrowser: DataBrowser;
  private isDetail: boolean = false;
  private detailName: string = null;

  constructor(dataBrowser: DataBrowser) {
    super({ node: DataBrowserList.createNode() });
    this.dataBrowser = dataBrowser;
    this.displayList();
  }

  static createNode(): HTMLElement {
    let content = document.createElement('div');
    content.className = 'bx-dataBrowser-list';
    content.innerHTML = ``;
    return content;
  }

  protected onUpdateRequest(msg: Message): void {
    if (!this.isDetail) {
      this.displayList(this.query);
      return;
    }

    this.displayElement(providers.Quandl.getDetail(this.detailName));
  }

  filter(query: string): void {
    this.displayList(query);
  }

  private displayList(query?: string) {
    this.detailName = null;
    this.isDetail = false;

    let elements = this.getSortedListElements('Quandl');

    if (undefined !== query) {
      this.query = query;
      elements = elements.filter((el) => el.name.toLowerCase().includes(query));
    }

    this.emptyList();

    for (let el of elements) {
      this.node.appendChild(this.createListElement(el));
    }
  }

  private emptyList(): void {
    while (this.node.firstChild) {
      this.node.removeChild(this.node.firstChild);
    }
  }

  private createListElement(elData: IDataBrowserProviderListItem) {
    let elWrapper = document.createElement('div');
    let elTitle = document.createElement('h4');
    let elDescription = document.createElement('p');

    elWrapper.className = 'bx-dataBrowser-listElement';
    elTitle.innerText = elData.name;
    elDescription.innerText = elData.description;

    elWrapper.appendChild(elTitle);
    elWrapper.appendChild(elDescription);

    elWrapper.addEventListener('click', () => {
      this.displayElement(elData);
    });

    return elWrapper;
  }

  private displayElement(elData: IDataBrowserProviderListItem) {
    this.isDetail = true;
    this.detailName = elData.name;

    this.emptyList();

    MessageLoop.sendMessage(this.dataBrowser, new Message(TYPE_DATABROWSER_HIDE_SEARCH));

    let el = this.createElement(elData);

    el.querySelector('h4').addEventListener('click', () => {
      MessageLoop.sendMessage(this.dataBrowser, new Message(TYPE_DATABROWSER_SHOW_SEARCH));
      this.displayList(this.query);
    });

    this.node.appendChild(el);
  }

  private createElement(elData: IDataBrowserProviderListItem): HTMLElement {
    let elDetail = document.createElement('div');
    let elTitle = document.createElement('h4');
    let content = this.createDetailContentElement(elData);

    elDetail.className = 'bx-dataBrowser-detail';
    elTitle.innerText = elData.name;

    elDetail.appendChild(elTitle);
    elDetail.appendChild(content);

    return elDetail;
  }

  private createDetailContentElement(elData: IDataBrowserProviderListItem): HTMLElement {
    let content = document.createElement('div');

    content.appendChild(document.createElement('hr'));
    content.appendChild(this.createProviderElement(elData));

    content.appendChild(document.createElement('hr'));
    content.appendChild(this.createDescriptionElement(elData));

    content.appendChild(document.createElement('hr'));
    content.appendChild(this.createSourceElement(elData));

    content.appendChild(document.createElement('hr'));
    content.appendChild(this.createCodeElement(elData));

    return content;
  }

  private createProviderElement(elData: IDataBrowserProviderListItem) {
    let elWrapper = document.createElement('div');
    let elTitle = document.createElement('strong');
    let elDescription = document.createElement('p');

    elTitle.innerText = 'PROVIDER';
    elDescription.innerHTML = `
  <img src="${providers.Quandl.icon}" />
  <button class="bx-providerBtn" style="background-color: ${providers.Quandl.color};">
<a href="${elData.outlink}" target="_blank"><i class="fa fa-external-link"></i> Open in ${providers.Quandl.providerName}</a>
</button>
`;

    elWrapper.appendChild(elTitle);
    elWrapper.appendChild(elDescription);

    return elWrapper;
  }

  private createDescriptionElement(elData: IDataBrowserProviderListItem) {
    let elWrapper = document.createElement('div');
    let elTitle = document.createElement('strong');
    let elDescription = document.createElement('p');

    elTitle.innerText = 'DESCRIPTION';
    elDescription.innerText = elData.description;

    elWrapper.appendChild(elTitle);
    elWrapper.appendChild(elDescription);

    return elWrapper;
  }

  private createSourceElement(elData: IDataBrowserProviderListItem) {
    let elWrapper = document.createElement('div');
    let elTitle = document.createElement('strong');
    let elDescription = document.createElement('p');

    elTitle.innerText = 'SOURCE';
    elDescription.innerHTML = `<a href="${elData.outlink}" target="_blank">${elData.outlink}</a>`;

    elWrapper.appendChild(elTitle);
    elWrapper.appendChild(elDescription);

    return elWrapper;
  }

  private createCodeElement(elData: IDataBrowserProviderListItem) {
    let codeSample = this.getCodeSample(elData);
    let elWrapper = document.createElement('div');
    let elTitle = document.createElement('strong');
    let elCode = document.createElement('pre');

    elTitle.innerText = 'PYTHON CODE EXAMPLE';
    elCode.innerText = codeSample;

    elCode.addEventListener('click', () => {
      let currentPanel = this.dataBrowser.currentPanel;
      NotebookActions.insertBelow(currentPanel.content);
      currentPanel.content.activeCell.editor['editor'].setValue(codeSample);
    });

    elWrapper.appendChild(elTitle);
    elWrapper.appendChild(elCode);

    return elWrapper;
  }

  private getSortedListElements(provider: string): IDataBrowserProviderListItem[] {
    return providers[provider]
      .getList()
      .items
      .sort((a, b) => {
        return a.name.trim().toUpperCase().localeCompare(b.name.trim().toUpperCase())
      });
  }

  private getCodeSample(elData: IDataBrowserProviderListItem): string {
    return providers[elData.provider].getCodeSample(elData, this.dataBrowser.getKernelName());
  }
}
