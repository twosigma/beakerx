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
package com.twosigma.beakerx.scala.table

import java.util.concurrent.TimeUnit

import com.twosigma.beakerx.jvm.serialization.BeakerObjectConverter
import com.twosigma.beakerx.table._
import com.twosigma.beakerx.table.format.TableDisplayStringFormat
import com.twosigma.beakerx.table.highlight.TableDisplayCellHighlighter
import com.twosigma.beakerx.table.renderer.TableDisplayCellRenderer

import scala.collection.JavaConverters._


object TableDisplay {

  private def create(v: Map[_, _]) = {
    new com.twosigma.beakerx.table.TableDisplay(v.asJava)
  }

  private def create(v: Seq[Seq[_]], co: Seq[String], cl: Seq[String]) = {
    val javaList: Seq[java.util.List[_]] = v.map(entry => entry.asJava)
    val javaListOfList: java.util.List[java.util.List[_]] = javaList.asJava

    new com.twosigma.beakerx.table.TableDisplay(javaListOfList, co.asJava, cl.asJava)
  }

  private def create(v: Array[Map[String, AnyRef]]): com.twosigma.beakerx.table.TableDisplay = {
    val javaStandardized: Array[java.util.Map[String, AnyRef]] = v.map(v => v.asJava).toArray

    new com.twosigma.beakerx.table.TableDisplay(javaStandardized)
  }

  private def create(v: Seq[Map[String, AnyRef]]): com.twosigma.beakerx.table.TableDisplay = {
    val javaMaps: Seq[java.util.Map[String, AnyRef]] = v.map(entry => entry.asJava)
    val javaCollection: java.util.Collection[java.util.Map[String, AnyRef]] = javaMaps.asJavaCollection

    new com.twosigma.beakerx.table.TableDisplay(javaCollection)
  }

  private def create(v: Seq[Map[String, AnyRef]], serializer: BeakerObjectConverter): com.twosigma.beakerx.table.TableDisplay = {
    val javaMaps: Seq[java.util.Map[String, AnyRef]] = v.map(entry => entry.asJava)
    val javaCollection: java.util.Collection[java.util.Map[String, AnyRef]] = javaMaps.asJavaCollection

    new com.twosigma.beakerx.table.TableDisplay(javaCollection, serializer)
  }

}

class TableDisplay private(tableDisplay: com.twosigma.beakerx.table.TableDisplay) {
  def this(v: Map[_, _]) = {
    this(TableDisplay.create(v))
  }

  def this(v: Seq[Seq[_]], co: Seq[String], cl: Seq[String]) = {
    this(TableDisplay.create(v, co, cl))
  }

  def this(v: Array[Map[String, AnyRef]]) = {
    this(TableDisplay.create(v))
  }

  def this(v: Seq[Map[String, AnyRef]]) = {
    this(TableDisplay.create(v))
  }

  def this(v: Seq[Map[String, AnyRef]], serializer: BeakerObjectConverter) = {
    this(TableDisplay.create(v, serializer))
  }

  def display() = tableDisplay.display()


  def setStringFormatForTimes(timeUnit: TimeUnit) = tableDisplay.setStringFormatForTimes(timeUnit)

  def setAlignmentProviderForType(columnType: ColumnType, tableDisplayAlignmentProvider: TableDisplayAlignmentProvider) = tableDisplay.setAlignmentProviderForType(columnType, tableDisplayAlignmentProvider)

  def setStringFormatForColumn(column: String, format: TableDisplayStringFormat) = tableDisplay.setStringFormatForColumn(column, format)

  def setAlignmentProviderForColumn(column: String, alignmentProvider: TableDisplayAlignmentProvider) = tableDisplay.setAlignmentProviderForColumn(column, alignmentProvider)

  def setStringFormatForType(columnType: ColumnType, format: TableDisplayStringFormat) = tableDisplay.setStringFormatForType(columnType, format)

  def setRendererForType(columnType: ColumnType, renderer: TableDisplayCellRenderer) = tableDisplay.setRendererForType(columnType, renderer)

  def setRendererForColumn(column: String, renderer: TableDisplayCellRenderer) = tableDisplay.setRendererForColumn(column, renderer)

  def setColumnFrozen(column: String, frozen: Boolean) = tableDisplay.setColumnFrozen(column, frozen)

  def setColumnFrozenRight(column: String, frozen: Boolean) = tableDisplay.setColumnFrozenRight(column, frozen)

  def setColumnVisible(column: String, visible: Boolean) = tableDisplay.setColumnVisible(column, visible)

  def setColumnOrder(columnOrder: Seq[String]) = tableDisplay.setColumnOrder(columnOrder.asJava)

  def addCellHighlighter(cellHighlighter: TableDisplayCellHighlighter) = tableDisplay.addCellHighlighter(cellHighlighter)

  def addCellHighlighter(cellHighlighter: CellHighlighter) = tableDisplay.addCellHighlighter(cellHighlighter)

  def addContextMenuItem(name: String, tagName: String) = tableDisplay.addContextMenuItem(name, tagName)

  def setDoubleClickAction(tagName: String) = tableDisplay.setDoubleClickAction(tagName)

  def setDataFontSize(fontSize: Int) = tableDisplay.setDataFontSize(fontSize)

  def setHeaderFontSize(fontSize: Int) = tableDisplay.setHeaderFontSize(fontSize)

  def setHeadersVertical(vertical: Boolean) = tableDisplay.setHeadersVertical(vertical)

  def setTooltip(tooltipAction: TooltipAction) = tableDisplay.setTooltip(tooltipAction)

  def setFontColorProvider(fontColorProvider: FontColorProvider) = tableDisplay.setFontColorProvider(fontColorProvider)

  def setRowFilter(rowFilter: RowFilter) = tableDisplay.setRowFilter(rowFilter)

  def addContextMenuItem(itemName: String, contextMenuAction: ContextMenuAction) = tableDisplay.addContextMenuItem(itemName, contextMenuAction)
}
