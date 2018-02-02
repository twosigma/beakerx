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
import { Panel } from "@phosphor/widgets";
import { Message } from "@phosphor/messaging";
import { DefaultOptionsModel, DefaultOptionsWidget } from "./JVMOptions/DefaultOptionsWidget";
import { OtherOptionsModel, OtherOptionsWidget } from "./JVMOptions/OtherOptionsWidget";
import { PropertiesModel, PropertiesWidget } from "./JVMOptions/PropertiesWidget";
import { SyncIndicatorWidget } from "./JVMOptions/SyncIndicatorWidget";
import BeakerXApi, {
  IApiSettingsResponse, IDefaultJVMOptions, IJVMOptions, IOtherJVMOptions,
  IPropertiesJVMOptions
} from "./BeakerXApi";
import { Messages } from "./JVMOptions/Messages";

export default class JVMOptionsWidget extends Panel {
  public readonly HTML_ELEMENT_TEMPLATE = `
<style>
  #beakerx-tree label { 
    font-weight: normal; 
  }
  .beakerx_container {
    margin: 0 16px;
  }
</style>
`;

  constructor(api: BeakerXApi) {
    super();

    this.addClass('beakerx_container');

    let defaultOptionsWidget  = new DefaultOptionsWidget();
    let syncIndicatorWidget = new SyncIndicatorWidget();
    let otherOptionsWidget = new OtherOptionsWidget();
    let propertiesWidget = new PropertiesWidget();

    this._model = new JvmOptionsModel(
      api,
      new DefaultOptionsModel(defaultOptionsWidget),
      new PropertiesModel(propertiesWidget),
      new OtherOptionsModel(otherOptionsWidget),
      syncIndicatorWidget
    );

    this.addWidget(defaultOptionsWidget);
    this.addWidget(propertiesWidget);
    this.addWidget(otherOptionsWidget);

    this.addWidget(syncIndicatorWidget);
  }

  public get model(): JvmOptionsModel {
    return this._model;
  }

  public onBeforeAttach(msg: Message): void {
    this.createWidgetStylesElement();
    this.model.load();
  }

  public processMessage(msg: Message): void {
    switch (msg.type) {
      case Messages.TYPE_DEFAULT_JVM_OPTIONS_CHANGED:
        this.model.clearErrors();
        this.model.setDefaultOptions((msg as Messages.DefaultOptionsChangedMessage).values);
        this.model.save();
        break;
      case Messages.TYPE_OTHER_JVM_OPTIONS_CHANGED:
        this.model.clearErrors();
        this.model.setOtherOptions((msg as Messages.OtherOptionsChangedMessage).options);
        this.model.save();
        break;
      case Messages.TYPE_PROPERTIES_JVM_OPTIONS_CHANGED:
        this.model.clearErrors();
        this.model.setPropertiesOptions((msg as Messages.PropertiesOptionsChangedMessage).properties);
        this.model.save();
        break;
      case Messages.TYPE_JVM_OPTIONS_ERROR:
        this.model.showError((msg as Messages.JVMOptionsErrorMessage).error);
        break;
      default:
        super.processMessage(msg);
        break;
    }
  }

  private _model: JvmOptionsModel;

  private createWidgetStylesElement(): void {
    $(this.HTML_ELEMENT_TEMPLATE).insertBefore(this.node);
  }

}

class JvmOptionsModel {

  constructor(
    private api: BeakerXApi,
    private defaultOptionsModel: DefaultOptionsModel,
    private propertiesOptionsModel: PropertiesModel,
    private otherOptionsModel: OtherOptionsModel,
    private syncWidget: SyncIndicatorWidget,
  ) {
  }

  private _options: IApiSettingsResponse;

  public setDefaultOptions(options: IDefaultJVMOptions): void {
    this._options.jvm_options.heap_GB = options.heap_GB;
  }
  public setOtherOptions(options: IOtherJVMOptions): void {
    this._options.jvm_options.other = options;
  }
  public setPropertiesOptions(options: IPropertiesJVMOptions): void {
    this._options.jvm_options.properties = options;
  }

  public load() {
    this.syncWidget.onSyncStart();

    this.api.loadSettings()
      .then((data: IApiSettingsResponse) => {
        this._options = data;

        this.defaultOptionsModel
          .update({ heap_GB: data.jvm_options.heap_GB });
        this.propertiesOptionsModel
          .update(data.jvm_options.properties);
        this.otherOptionsModel
          .update(data.jvm_options.other);

        this.syncWidget.showResult(this.buildResult(data.jvm_options));

        setTimeout(() => {
          this.syncWidget.onSyncEnd()
        },1000);
      });
  }

  public save() {
    this.syncWidget.onSyncStart();

    let payload = {
      "jvm_options": {
        "heap_GB": null,
        "other": [],
        "properties": []
      },
      "version": 2
    };

    payload.jvm_options.heap_GB = this._options.jvm_options.heap_GB;
    payload.jvm_options.other = this._options.jvm_options.other;
    payload.jvm_options.properties = this._options.jvm_options.properties;

    this.syncWidget.showResult(this.buildResult(payload.jvm_options));

    this.api.saveSettings({ beakerx:  payload })
      .then(() => {

        setTimeout(() => {
          this.syncWidget.onSyncEnd()
        },1000);

      });
  }

  public showError(error: Error) {
    this.syncWidget.onError(error);
  }

  public clearErrors() {
    this.syncWidget.clearErrors();
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

}
