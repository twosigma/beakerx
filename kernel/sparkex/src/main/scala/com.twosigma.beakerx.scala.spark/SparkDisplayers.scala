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
package com.twosigma.beakerx.scala.spark

import java.util

import com.twosigma.beakerx.mimetype.MIMEContainer
import jupyter.{Displayer, Displayers}
import java.util.{HashMap, Map}

import com.twosigma.beakerx.widget.PreviewTableDisplay
import com.twosigma.beakerx.widget.PreviewTableDisplay.PreviewAllRows

object SparkDisplayers {

  def register() {
    Displayers.register(classOf[org.apache.spark.sql.Dataset[_]], new Displayer[org.apache.spark.sql.Dataset[_]]() {
      override def display(ds: org.apache.spark.sql.Dataset[_]): Map[String, String] = new HashMap[String, String]() {
        displayPreview(ds)
        put(MIMEContainer.MIME.HIDDEN, "")
      }
    })
  }

  def displayPreview(ds: org.apache.spark.sql.Dataset[_]): Unit = {
    val preview = com.twosigma.beakerx.scala.table.TableDisplay.toJavaCollection(Seq(ds.schema.fields.map { col => col.name -> col.dataType.typeName }.toMap))
    val previewWidget = new PreviewTableDisplay(preview, new PreviewAllRows {
      override def get(rows: Int): Array[util.Map[String, AnyRef]] = com.twosigma.beakerx.scala.table.TableDisplay.toJavaMap(takeRows(ds, rows))
    })
    previewWidget.display()
  }

  def displayDataset(ds: org.apache.spark.sql.Dataset[_], rows: Int = 20): Unit = {
    val t: com.twosigma.beakerx.table.TableDisplay = tableDisplay(ds, rows)
    t.display()
  }

  private def tableDisplay(ds: org.apache.spark.sql.Dataset[_], rows: Int) = {
    import com.twosigma.beakerx.scala.table.TableDisplay
    val maps = takeRows(ds, rows)
    val t = TableDisplay.create(maps)
    t
  }

  private def takeRows(ds: org.apache.spark.sql.Dataset[_], rows: Int) = {
    val columns = ds.columns
    val rowVals = ds.toDF.take(rows)
    val maps = rowVals map (row => (columns zip row.toSeq).toMap)
    maps
  }
}
