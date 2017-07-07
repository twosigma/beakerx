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

package com.twosigma.beakerx.scala.easyform

import com.twosigma.beakerx.easyform.EasyFormComponent
import com.twosigma.beakerx.easyform.formitem.widgets.ButtonComponentWidget
import com.twosigma.beakerx.widgets.{DOMWidget, DisplayableWidget}

import scala.collection.JavaConverters._

class EasyForm(var caption: String) extends com.twosigma.beakerx.easyform.EasyForm(caption) {

  def addComboBox(label: String, values: List[String]): EasyFormComponent[_ <: DOMWidget] = {
    super.addComboBox(label, values.asJava, false)
  }

  def addComboBox(label: String, values: List[String], editable: Boolean): EasyFormComponent[_ <: DOMWidget] = {
    super.addComboBox(label, values.asJava, editable)
  }

  def addComboBox(label: String, values: List[String], editable: Boolean, width: Integer): EasyFormComponent[_ <: DOMWidget] = {
    super.addComboBox(label, values.asJava, editable, width)
  }

  def addList(label: String, values: List[String]): EasyFormComponent[_ <: DOMWidget] = {
    super.addList(label, values.asJava)
  }

  def addList(label: String, values: List[String], multipleSelection: Boolean): EasyFormComponent[_ <: DOMWidget] = {
    super.addList(label, values.asJava, multipleSelection)
  }

  def addList(label: String, values: List[String], size: Integer): EasyFormComponent[_ <: DOMWidget] = {
    super.addList(label, values.asJava, size)
  }

  def addList(label: String, values: List[String], multipleSelection: Boolean, size: Integer): EasyFormComponent[_ <: DOMWidget] = {
    super.addList(label, values.asJava, multipleSelection, size)
  }

  def addRadioButtons(label: String, values: List[String]): EasyFormComponent[_ <: DOMWidget] = {
    super.addRadioButtons(label, values.asJava)
  }

  def addRadioButtons(label: String, values: List[String], orientation: Integer): EasyFormComponent[_ <: DOMWidget] = {
    super.addRadioButtons(label, values.asJava, orientation)
  }

  def addCheckBoxes(label: String, values: List[String]): EasyFormComponent[_ <: DOMWidget] = {
    super.addCheckBoxes(label, values.asJava)
  }

  def addCheckBoxes(label: String, values: List[String], orientation: Integer): EasyFormComponent[_ <: DOMWidget] = {
    super.addCheckBoxes(label, values.asJava, orientation)
  }
}
