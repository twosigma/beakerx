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

import { Panel, Widget } from "@phosphor/widgets";
import BannerWidget from "./BannerWidget";
import JVMOptionsWidget, {JVMOptionsModel} from "./JVMOptionsWidget";
import * as $ from "jquery";
import {Message} from "@phosphor/messaging";
import BeakerXApi, {IApiSettingsResponse, IJVMOptions, IUIOptions} from "./BeakerXApi";
import {UIOptionsModel, UIOptionsWidget} from "./JVMOptions/UIOptionsWidget";
import {SyncIndicatorWidget} from "./JVMOptions/SyncIndicatorWidget";
import {Messages} from "./JVMOptions/Messages";
import {DefaultOptionsModel} from "./JVMOptions/DefaultOptionsWidget";

export default class TreeWidget extends Panel {

  public readonly HTML_ELEMENT_TEMPLATE = `
<style>
  #beakerx-tree { 
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
  }
</style>
`;

  private _model: TreeWidgetModel;

  constructor(private options: ITreeWidgetOptions) {
    super();

    let api = new BeakerXApi(this.options.baseUrl);

    this.id = 'beakerx-tree';
    this.title.label = 'BeakerX';
    this.title.closable = true;
    this.addClass('tab-pane');

    this.createWidgetContent(api);
  }

  private createWidgetContent(api: BeakerXApi) {

    let syncIndicatorWidget = new SyncIndicatorWidget();
    this._model = new TreeWidgetModel(api, syncIndicatorWidget);

    this.addWidget(new BannerWidget(api));
    this.addWidget(new Widget({ node: document.createElement('br') }));

    if (false === this.options.isLab) {
      this.addWidget(new UIOptionsWidget());
    }

    this.addWidget(new JVMOptionsWidget());
    this.addWidget(syncIndicatorWidget);
  }

  public processMessage(msg: Message): void {
    switch (msg.type) {
      case Messages.TYPE_UI_OPTIONS_CHANGED:
        this._model.clearErrors();
        this._model.setUIOptions((msg as Messages.UIOptionsChangedMessage).options);
        this._model.save();
        break;
      case Messages.TYPE_JVM_OPTIONS_CHANGED:
        this._model.clearErrors();
        this._model.setJVMOptions((msg as Messages.JVMOptionsChangedMessage).options);
        this._model.save();
        break;
      case Messages.TYPE_JVM_OPTIONS_ERROR:
        this._model.clearErrors();
        this._model.showError((msg as Messages.JVMOptionsErrorMessage).error);
        break;
      default:
        super.processMessage(msg);
        break;
    }
  }

  public onBeforeAttach(msg: Message): void {
    this.createWidgetStylesElement();
    this._model.load();
  }

  private createWidgetStylesElement(): void {
    $(this.HTML_ELEMENT_TEMPLATE)
      .insertBefore(this.node);
  }
}

export class TreeWidgetModel {

  private _options: IApiSettingsResponse;

  private jvmOptionsModel: JVMOptionsModel;
  private uiOptionsModel: UIOptionsModel;

  constructor(
    private api: BeakerXApi,
    private syncWidget: SyncIndicatorWidget
  ) {
  }

  public load() {
    this.syncStart();
    this.api
      .loadSettings()
      .then((data: IApiSettingsResponse) => {
        if (!data.ui_options) {
          data.ui_options = {
            auto_close: false,
            improve_fonts: true,
            wide_cells: true,
            show_publication: false,
          }
        }

        this._options = data;

        this.jvmOptionsModel
          .update(data.jvm_options);
        this.uiOptionsModel
          .update(data.ui_options);

        this.showResult(data.jvm_options);

        setTimeout(() => {
          this.syncEnd()
        },1000);
      });

  }

  public save() {
    this.syncStart();

    let payload: IApiSettingsResponse = {
      "jvm_options": {
        "heap_GB": null,
        "other": [],
        "properties": []
      },
      "ui_options": {
        "auto_close": false,
        "improve_fonts": true,
        "wide_cells": true,
        "show_publication": false,
      },
      "version": 2
    };

    payload.jvm_options.heap_GB = this._options.jvm_options.heap_GB;
    payload.jvm_options.other = this._options.jvm_options.other;
    payload.jvm_options.properties = this._options.jvm_options.properties;

    payload.ui_options.auto_close = this._options.ui_options.auto_close;
    payload.ui_options.improve_fonts = this._options.ui_options.improve_fonts;
    payload.ui_options.wide_cells = this._options.ui_options.wide_cells;
    payload.ui_options.show_publication = this._options.ui_options.show_publication;

    this.showResult(payload.jvm_options);

    this.api.saveSettings({ beakerx:  payload })
      .then(() => {
        setTimeout(() => {
          this.syncEnd()
        },1000);
      });
  }

  public clearErrors() {
    this.syncWidget.clearErrors();
  }

  public showError(error: Error) {
    this.syncWidget.onError(error);
  }

  private syncStart(): void {
    this.syncWidget.onSyncStart();
  }

  private syncEnd(): void {
    this.syncWidget.onSyncEnd();
  }

  private showResult(options: IJVMOptions) {
    this.syncWidget.showResult(this.buildResult(options));
  }

  private buildResult(options: IJVMOptions): string {
    let result: string = '';
    if (options.heap_GB !== null) {
      result += `-Xmx${ DefaultOptionsModel.normaliseHeapSize(options.heap_GB) } `;
    }

    for (let other of options.other) {
      result += `${other} `
    }

    for (let property of options.properties) {
      result += `-D${property.name}=${property.value} `;
    }
    return result;
  };

  setUIOptions(options: IUIOptions) {
    this._options.ui_options = options;
  }

  setJVMOptions(options: IJVMOptions) {
    this._options.jvm_options = options;
  }
}

export interface ITreeWidgetOptions {
  isLab: boolean;
  baseUrl: string;
  CodeCell: any;
}