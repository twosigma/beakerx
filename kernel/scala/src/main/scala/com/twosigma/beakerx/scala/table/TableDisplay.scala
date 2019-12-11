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

import java.util
import java.util.{Spliterator, Spliterators}
import java.util.concurrent.TimeUnit
import java.util.stream.StreamSupport

import com.twosigma.beakerx.jvm.serialization.BeakerObjectConverter
import com.twosigma.beakerx.table._
import com.twosigma.beakerx.table.action.TableActionDetails
import com.twosigma.beakerx.table.format.TableDisplayStringFormat
import com.twosigma.beakerx.table.highlight.TableDisplayCellHighlighter
import com.twosigma.beakerx.table.renderer.TableDisplayCellRenderer
import com.twosigma.beakerx.widget.DisplayableWidget

import scala.collection.JavaConverters._
import scala.collection.immutable.ListMap

object TableDisplay {

  def create(v: Seq[Map[String, Any]]): com.twosigma.beakerx.table.TableDisplay = {
    val value: java.util.stream.Stream[util.Map[String, Object]] = stream2javaStream(v.toStream)
    new com.twosigma.beakerx.table.TableDisplay(value)
  }

  def stream2javaStream(scalaStream: Stream[Map[String, Any]]): java.util.stream.Stream[util.Map[String, Object]] = {
    val iter: Iterator[Map[String, Any]] = scalaStream.toIterator
    val newIter = new util.Iterator[util.Map[String, Object]] {
      override def hasNext: Boolean = iter.hasNext
      override def next(): util.Map[String, Object] ={
        val m: Map[String, Any] = iter.next()
        val stringToObject = new util.LinkedHashMap[String,Object]()
        m.foreach{ case (k, v) => stringToObject.put(k,v.asInstanceOf[Object])}
        stringToObject
      }
    }
    val value = Spliterators.spliteratorUnknownSize(newIter,Spliterator.NONNULL)
    StreamSupport.stream(value,false)
  }

  private def create(v: Map[_, _]) = {
    new com.twosigma.beakerx.table.TableDisplay(v.asJava)
  }

  private def create(v: Seq[Seq[_]], co: Seq[String], cl: Seq[String]) = {
    val javaList: Seq[java.util.List[_]] = v.map(entry => entry.asJava)
    val javaListOfList: java.util.List[java.util.List[_]] = javaList.asJava

    new com.twosigma.beakerx.table.TableDisplay(javaListOfList, co.asJava, cl.asJava)
  }

  def create(v: Array[Map[String, Any]]): com.twosigma.beakerx.table.TableDisplay = {
    val javaStandardized: Array[util.Map[String, Object]] = toJavaMap(v)
    new com.twosigma.beakerx.table.TableDisplay(javaStandardized)
  }

  def toJavaMap(v: Array[Map[String, Any]]): Array[util.Map[String, Object]] = {
    val javaStandardized: Array[util.Map[String, Object]] = v.map(v => v.mapValues(_.asInstanceOf[Object]).asJava)
    javaStandardized
  }

  def toJavaMap(v: Array[ListMap[String, Any]]): Array[util.Map[String, Object]] = {
    val javaStandardized: Array[util.Map[String, Object]] = v.map(v => v.mapValues(_.asInstanceOf[Object]).asJava)
    javaStandardized
  }

  def toJavaCollection(v: Seq[Map[String, Any]]): util.Collection[util.Map[String, Object]] = {
    val javaMaps: Seq[util.Map[String, Object]] = v.map(m => m.mapValues(_.asInstanceOf[Object]).asJava)
    val javaCollection: util.Collection[util.Map[String, Object]] = javaMaps.asJava
    javaCollection
  }

  def fromSeqListMapToJavaCollection(v: Seq[ListMap[String, Any]]): util.Collection[util.Map[String, Object]] = {
    val javaMaps: Seq[util.Map[String, Object]] = v.map(m => m.mapValues(_.asInstanceOf[Object]).asJava)
    val javaCollection: util.Collection[util.Map[String, Object]] = javaMaps.asJava
    javaCollection
  }

  private def create(v: Seq[Map[String, Any]], serializer: BeakerObjectConverter): com.twosigma.beakerx.table.TableDisplay = {
    val javaMaps: Seq[java.util.Map[String, Object]] = v.map(m => m.mapValues(_.asInstanceOf[Object]).asJava)
    val javaCollection: java.util.Collection[java.util.Map[String, Object]] = javaMaps.asJava

    new com.twosigma.beakerx.table.TableDisplay(javaCollection, serializer)
  }

  def setLoadingMode(m:TableDisplayLoadingMode): Unit ={
    com.twosigma.beakerx.table.TableDisplay.setLoadingMode(m)
  }

}

class TableDisplay private(tableDisplay: com.twosigma.beakerx.table.TableDisplay) extends DisplayableWidget {

  def this(v: Map[_, _]) = {
    this(TableDisplay.create(v))
  }

  def this(v: Seq[Seq[_]], co: Seq[String], cl: Seq[String]) = {
    this(TableDisplay.create(v, co, cl))
  }

  def this(v: Array[Map[String, Any]]) = {
    this(TableDisplay.create(v))
  }

  def this(v: Seq[Map[String, Any]]) = {
    this(TableDisplay.create(v))
  }

  def this(v: Seq[Map[String, Any]], serializer: BeakerObjectConverter) = {
    this(TableDisplay.create(v, serializer))
  }

  def display() = tableDisplay.display()


  def details: TableActionDetails = tableDisplay.getDetails

  def setStringFormatForTimes(timeUnit: TimeUnit) = tableDisplay.setStringFormatForTimes(timeUnit)

  def setAlignmentProviderForType(columnType: ColumnType, tableDisplayAlignmentProvider: TableDisplayAlignmentProvider) = tableDisplay.setAlignmentProviderForType(columnType, tableDisplayAlignmentProvider)

  def setStringFormatForColumn(column: String, format: TableDisplayStringFormat) = tableDisplay.setStringFormatForColumn(column, format)

  def setAlignmentProviderForColumn(column: String, alignmentProvider: TableDisplayAlignmentProvider) = tableDisplay.setAlignmentProviderForColumn(column, alignmentProvider)

  def setStringFormatForType(columnType: ColumnType, format: TableDisplayStringFormat) = tableDisplay.setStringFormatForType(columnType, format)

  def setRendererForType(columnType: ColumnType, renderer: TableDisplayCellRenderer) = tableDisplay.setRendererForType(columnType, renderer)

  def setRendererForColumn(column: String, renderer: TableDisplayCellRenderer) = tableDisplay.setRendererForColumn(column, renderer)

  def setColumnFrozen(column: String, frozen: Boolean) = tableDisplay.setColumnFrozen(column, frozen)

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

  def getValues():List[List[_]] = {
    tableDisplay.getValues.asScala.toList.map(y => y.asScala.toList)
  }

  def removeAllCellHighlighters()= tableDisplay.removeAllCellHighlighters()

  def getCellHighlighters() = tableDisplay.getCellHighlighters()

  def setRowsToShow(rows: RowsToShow) = tableDisplay.setRowsToShow(rows)

}
