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

import BeakerXApi from "beakerx_shared/lib/api/BeakerXApi";
import JVMOptionsModel from "./JVMOptionsModel";
import UIOptionsModel from "./UIOptionsModel";
import DefaultOptionsModel from "./DefaultOptionsModel";
import SyncIndicatorWidget from "../Widgets/SyncIndicatorWidget";
import IApiSettingsResponse from "beakerx_shared/lib/api/IApiSettingsResponse";
import IUIOptions from "beakerx_shared/lib/api/IUIOptions";
import IJVMOptions from "beakerx_shared/lib/api/IJVMOptions";

export default class TreeWidgetModel {

  private _options: IApiSettingsResponse;

  constructor(
    private api: BeakerXApi,
    private jvmOptionsModel: JVMOptionsModel,
    private uiOptionsModel: UIOptionsModel,
    private syncWidget: SyncIndicatorWidget
  ) {
  }

  public load() {
    this.syncStart();
    this.api
      .loadSettings()
      .then((data: IApiSettingsResponse) => {

        this._options = data;

        this.jvmOptionsModel
          .update(data.jvm_options);
        if (!!this.uiOptionsModel) {
          this.uiOptionsModel
            .update(data.ui_options);
        }

        this.setResult(data.jvm_options);

        setTimeout(() => {
          this.syncEnd()
        },1000);
      });

  }

  public save() {
    this.syncStart();

    let payload: IApiSettingsResponse = this.api.mergeWithDefaults(this._options);

    this.setResult(payload.jvm_options);

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

  public setUIOptions(options: IUIOptions) {
    this._options.ui_options = options;
  }

  public setJVMOptions(options: IJVMOptions) {
    this._options.jvm_options = options;
  }

  public showResult() {
    if (this._options) {
      this.jvmOptionsModel
        .update(this._options.jvm_options);
    }

    this.syncWidget.show();
  }

  public hideResult() {
    this.syncWidget.hide();
  }

  private syncStart(): void {
    this.syncWidget.onSyncStart();
  }

  private syncEnd(): void {
    this.syncWidget.onSyncEnd();
  }

  private setResult(options: IJVMOptions) {
    this.syncWidget.setResult(this.buildResult(options));
  }

  private buildResult(options: IJVMOptions): string {
    let result: string = '';
    if (options.heap_GB !== null) {
      result += `-Xmx${ DefaultOptionsModel.normaliseHeapSize(options.heap_GB) } `;
    }

    for (let other of options.other) {
      result += `${other} `
    }

    for (let property in options.properties) {
      result += `-D${options.properties[property].name}=${options.properties[property].value} `;
    }

    return result;
  };
}
