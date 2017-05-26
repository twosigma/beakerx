package com.twosigma.beaker.scala.easyform

import com.twosigma.beaker.easyform.EasyFormComponent
import com.twosigma.beaker.easyform.formitem.ButtonComponent
import com.twosigma.beaker.widgets.{DOMWidget, DisplayableWidget}

import scala.collection.JavaConverters._

class EasyForm(var caption: String) extends DisplayableWidget {

  var easyForm : com.twosigma.beaker.easyform.EasyForm = new com.twosigma.beaker.easyform.EasyForm(caption)

  def addTextField(label: String): EasyFormComponent[_ <: DOMWidget] = {
    easyForm.addTextField(label)
  }

  def addTextField(label: String, width: Integer): EasyFormComponent[_ <: DOMWidget] = {
    easyForm.addTextField(label, width)
  }

  def addTextArea(label: String): EasyFormComponent[_ <: DOMWidget] = {
    easyForm.addTextArea(label)
  }

  def addTextArea(label: String, width: Integer, height: Integer): EasyFormComponent[_ <: DOMWidget] = {
    easyForm.addTextArea(label, width, height)
  }

  def addTextArea(label: String, initialValue: String): EasyFormComponent[_ <: DOMWidget] = {
    easyForm.addTextArea(label, initialValue)
  }

  def addTextArea(label: String, initialValue: String, width: Integer, height: Integer): EasyFormComponent[_ <: DOMWidget] = {
    easyForm.addTextArea(label, initialValue, width, height)
  }

  def addCheckBox(label: String): Unit = {
    easyForm.addCheckBox(label)
  }

  def addCheckBox(label: String, value : Boolean): EasyFormComponent[_ <: DOMWidget] = {
    easyForm.addCheckBox(label, value)
  }

  def addComboBox(label: String, values: List[String]): EasyFormComponent[_ <: DOMWidget] = {
    easyForm.addComboBox(label, values.asJava, false)
  }

  def addComboBox(label: String, values: List[String], editable: Boolean): EasyFormComponent[_ <: DOMWidget] = {
    easyForm.addComboBox(label, values.asJava, editable)
  }

  def addComboBox(label: String, values: List[String], editable: Boolean, width: Integer): EasyFormComponent[_ <: DOMWidget] = {
    easyForm.addComboBox(label, values.asJava, editable, width)
  }

  def addList(label: String, values: List[String]): EasyFormComponent[_ <: DOMWidget] = {
    easyForm.addList(label, values.asJava)
  }

  def addList(label: String, values: List[String], multipleSelection: Boolean): EasyFormComponent[_ <: DOMWidget] = {
    easyForm.addList(label, values.asJava, multipleSelection)
  }

  def addList(label: String, values: List[String], size: Integer): EasyFormComponent[_ <: DOMWidget] = {
    easyForm.addList(label, values.asJava, size)
  }

  def addList(label: String, values: List[String], multipleSelection: Boolean, size: Integer): EasyFormComponent[_ <: DOMWidget] = {
    easyForm.addList(label, values.asJava, multipleSelection, size)
  }

  def addRadioButtons(label: String, values: List[String]): EasyFormComponent[_ <: DOMWidget] = {
    easyForm.addRadioButtons(label, values.asJava)
  }

  def addRadioButtons(label: String, values: List[String], orientation: Integer): EasyFormComponent[_ <: DOMWidget] = {
    easyForm.addRadioButtons(label, values.asJava, orientation)
  }

  def addCheckBoxes(label: String, values: List[String]): EasyFormComponent[_ <: DOMWidget] = {
    easyForm.addCheckBoxes(label, values.asJava)
  }

  def addCheckBoxes(label: String, values: List[String], orientation: Integer): EasyFormComponent[_ <: DOMWidget] = {
    easyForm.addCheckBoxes(label, values.asJava, orientation)
  }

  def addDatePicker(label: String): EasyFormComponent[_ <: DOMWidget] = {
    easyForm.addDatePicker(label)
  }

  def addDateTimePicker(label: String): EasyFormComponent[_ <: DOMWidget] = {
    easyForm.addDateTimePicker(label)
  }

  def addDatePicker(label: String, showTime: Boolean): EasyFormComponent[_ <: DOMWidget] = {
    easyForm.addDatePicker(label, showTime)
  }

  def addButton(label: String): ButtonComponent = {
    easyForm.addButton(label)
  }

  def addButton(label: String, actionCellTag: String): ButtonComponent = {
    easyForm.addButton(label, actionCellTag)
  }

  override def display(): Unit = easyForm.display()

}
