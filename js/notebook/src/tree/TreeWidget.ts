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

import * as $ from "jquery";

import { Panel, Widget } from "@phosphor/widgets";
import { Message } from "@phosphor/messaging";

import BeakerXApi from "./Utils/BeakerXApi";
import BannerWidget from "./Widgets/BannerWidget";
import { Messages } from "./Messages";
import ITreeWidgetOptions from "./Types/ITreeWidgetOptions";
import TreeWidgetModel from "./Models/TreeWidgetModel";
import SyncIndicatorWidget from "./Widgets/SyncIndicatorWidget";
import JVMOptionsWidget from "./Widgets/JVMOptionsWidget";
import {UIOptionsWidget} from "./Widgets/UIOptions/UIOptionsWidget";
import UIOptionsModel from "./Models/UIOptionsModel";

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
    let jvmOptionsWidget = new JVMOptionsWidget();
    let uiOptionsWidget;
    let uiOptionsModel;
    if (false === this.options.isLab) {
      uiOptionsWidget = new UIOptionsWidget();
      uiOptionsModel = new UIOptionsModel(uiOptionsWidget);
    }

    this._model = new TreeWidgetModel(
      api,
      jvmOptionsWidget.model,
      uiOptionsModel,
      syncIndicatorWidget
    );

    this.addWidget(new BannerWidget(api));
    this.addWidget(new Widget({ node: document.createElement('br') }));

    if (false === this.options.isLab) {
      this.addWidget(uiOptionsWidget);
    }

    this.addWidget(jvmOptionsWidget);
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
