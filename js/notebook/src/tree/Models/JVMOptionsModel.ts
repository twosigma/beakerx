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

import DefaultOptionsModel from "./DefaultOptionsModel";
import PropertiesModel from "./PropertiesModel";
import DefaultOptionsWidgetInterface from "../Widgets/JVMOptions/DefaultOptionsWidgetInterface";
import PropertiesWidgetInterface from "../Widgets/JVMOptions/PropertiesWidgetInterface";
import OtherOptionsWidgetInterface from "../Widgets/JVMOptions/OtherOptionsWidgetInterface";
import OtherOptionsModel from "./OtherOptionsModel";
import IJVMOptions, {
  IDefaultJVMOptions,
  IOtherJVMOptions,
  IPropertiesJVMOptions
} from "beakerx_shared/lib/api/IJVMOptions";

export default class JVMOptionsModel {

  private _options: IJVMOptions;

  private defaultOptionsModel: DefaultOptionsModel;
  private propertiesModel: PropertiesModel;
  private otherOptionsModel: OtherOptionsModel;

  constructor(
    defaultOptionsWidget: DefaultOptionsWidgetInterface,
    propertiesWidget: PropertiesWidgetInterface,
    otherOptionsWidget: OtherOptionsWidgetInterface
  ) {
    this.defaultOptionsModel = new DefaultOptionsModel(defaultOptionsWidget);
    this.propertiesModel = new PropertiesModel(propertiesWidget);
    this.otherOptionsModel = new OtherOptionsModel(otherOptionsWidget);
  }

  public get options(): IJVMOptions {
    return this._options;
  }

  public update(options: IJVMOptions) {
    this._options = options;

    this.defaultOptionsModel
      .update({ heap_GB: options.heap_GB });
    this.propertiesModel
      .update(options.properties);
    this.otherOptionsModel
      .update(options.other);
  }

  public setDefaultOptions(values: IDefaultJVMOptions) {
    this._options.heap_GB = values.heap_GB;
  }

  public setOtherOptions(options: IOtherJVMOptions) {
    this._options.other = options;
  }

  public setPropertiesOptions(properties: IPropertiesJVMOptions) {
    this._options.properties = properties;
  }
}
