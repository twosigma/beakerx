/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

import {
  DOMWidgetView,
  DOMWidgetModel,
  LayoutModel,
  LayoutView,
  StyleModel,
  StyleView,
  WidgetModel,
  WidgetView,
  unpack_models,
} from "@jupyter-widgets/base";

import {
  HTMLModel,
  HTMLView,
  BoxModel,
  BoxView,
  StringModel,
  DescriptionView,
  DescriptionModel,
  VBoxModel,
  VBoxView,
  TabModel,
  TabView,
  CheckboxModel,
  CheckboxView,
  SelectView,
  SelectModel,
  LabeledDOMWidgetView,
  PasswordView,
  PasswordModel,
  SelectMultipleView,
  SelectMultipleModel,
  TextareaView,
  TextareaModel,
  TextView,
  TextModel
} from "@jupyter-widgets/controls";

export declare const widgets: {
  DOMWidgetView: typeof DOMWidgetView,
  DOMWidgetModel: typeof DOMWidgetModel,
  LayoutModel: typeof LayoutModel,
  LayoutView: typeof LayoutView,
  StyleModel: typeof StyleModel,
  StyleView: typeof StyleView,
  WidgetModel: typeof WidgetModel,
  WidgetView: typeof WidgetView,
  unpack_models: typeof unpack_models,

  HTMLModel: typeof HTMLModel,
  HTMLView: typeof HTMLView,
  BoxModel: typeof BoxModel,
  BoxView: typeof BoxView
  StringModel: typeof StringModel,
  DescriptionView: typeof DescriptionView,
  DescriptionModel: typeof DescriptionModel,
  VBoxModel: typeof VBoxModel,
  VBoxView: typeof VBoxView,
  TabModel: typeof TabModel,
  TabView: typeof TabView,
  CheckboxModel: typeof CheckboxModel,
  CheckboxView: typeof CheckboxView,
  SelectModel: typeof SelectModel,
  SelectView: typeof SelectView,
  LabeledDOMWidgetView: typeof LabeledDOMWidgetView,
  PasswordModel: typeof PasswordModel,
  PasswordView: typeof PasswordView,
  SelectMultipleModel: typeof SelectMultipleModel,
  SelectMultipleView: typeof SelectMultipleView,
  TextareaModel: typeof TextareaModel,
  TextareaView: typeof TextareaView,
  TextModel: typeof TextModel,
  TextView: typeof TextView,
};

export default widgets;
