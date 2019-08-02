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

import { Panel } from "@phosphor/widgets";
import { Message } from "@phosphor/messaging";

import BeakerXApi from "beakerx_shared/lib/api/BeakerXApi";
import BannerWidget from "./Widgets/BannerWidget";
import { Messages } from "./Messages";
import ITreeWidgetOptions from "./Types/ITreeWidgetOptions";
import TreeWidgetModel from "./Models/TreeWidgetModel";
import SyncIndicatorWidget from "./Widgets/SyncIndicatorWidget";
import OptionsWidget from "./Widgets/OptionsWidget";

import "./../shared/style/tree.scss";

export default class TreeWidget extends Panel {

  private _model: TreeWidgetModel;

  constructor(private options: ITreeWidgetOptions) {
    super();

    let api = new BeakerXApi(this.options.baseUrl);

    this.id = 'beakerx-tree-widget';

    if (this.options.isLab) {
      this.addClass('isLab');
    } else {
      require("./../shared/style/tree-notebook.css");
    }

    this.title.label = 'BeakerX';
    this.title.closable = true;

    let bannerWidget = new BannerWidget(api);
    let optionsWidget = new OptionsWidget(this.options.isLab);
    let syncIndicatorWidget = new SyncIndicatorWidget();

    this._model = new TreeWidgetModel(
      api,
      optionsWidget.jvmOptionsModel,
      optionsWidget.uiOptionsModel,
      syncIndicatorWidget
    );

    this.addWidget(bannerWidget);
    this.addWidget(optionsWidget);
    this.addWidget(syncIndicatorWidget);
  }

  public processMessage(msg: Message): void {
    switch (msg.type) {
      case 'show-result':
        this._model.clearErrors();
        this._model.showResult();
        break;
      case 'hide-result':
        this._model.clearErrors();
        this._model.hideResult();
        break;
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

  protected onBeforeAttach(msg: Message): void {
    this._model.load();
  }

}
