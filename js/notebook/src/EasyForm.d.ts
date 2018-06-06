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
  SelectMultipleModel as DefaultSelectMultipleModel,
  SelectMultipleView as DefaultSelectMultipleView,
  StringModel, LabeledDOMWidgetView, SelectModel, SelectView,
  TextModel as DefaultTextModel,
  TextView as DefaultTextView,
  PasswordModel as DefaultPasswordModel,
  PasswordView as DefaultPasswordView,
  TextareaModel as DefaultTextareaModel,
  TextareaView as DefaultTextareaView,
  CheckboxModel as DefaultCheckboxModel,
  CheckboxView as DefaultCheckboxView,
} from "@jupyter-widgets/controls/lib/index";

declare class SelectMultipleModel extends DefaultSelectMultipleModel {}
declare class SelectMultipleView extends DefaultSelectMultipleView {}
declare class DatePickerModel extends StringModel {}
declare class DatePickerView extends LabeledDOMWidgetView {}
declare class SelectMultipleSingleModel extends SelectModel {}
declare class SelectMultipleSingleView extends SelectView {}
declare class ComboBoxModel extends SelectModel {}
declare class ComboBoxView extends SelectView {}
declare class TextModel extends DefaultTextModel {}
declare class TextView extends DefaultTextView {}
declare class PasswordModel extends DefaultPasswordModel {}
declare class PasswordView extends DefaultPasswordView {}
declare class TextareaModel extends DefaultTextareaModel {}
declare class TextareaView extends DefaultTextareaView {}
declare class CheckboxModel extends DefaultCheckboxModel {}
declare class CheckboxView extends DefaultCheckboxView {}

export {
  SelectMultipleModel,
  SelectMultipleView,
  SelectMultipleSingleModel,
  SelectMultipleSingleView,
  DatePickerModel,
  DatePickerView,
  ComboBoxModel,
  ComboBoxView,
  TextareaModel,
  TextareaView,
  TextModel,
  TextView,
  PasswordModel,
  PasswordView,
  CheckboxModel,
  CheckboxView
}
