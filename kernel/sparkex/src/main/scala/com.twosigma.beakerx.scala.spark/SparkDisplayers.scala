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

import com.twosigma.beakerx.mimetype.MIMEContainer
import jupyter.{Displayer, Displayers}
import java.util.{HashMap, Map}

object SparkDisplayers {

  def register() {
    Displayers.register(classOf[org.apache.spark.sql.Dataset[_]], new Displayer[org.apache.spark.sql.Dataset[_]]() {
      override def display(ds: org.apache.spark.sql.Dataset[_]): Map[String, String] = new HashMap[String, String]() {
        displayDataset(ds, 1000)
        put(MIMEContainer.MIME.HIDDEN, "")
      }
    })
  }

  def displayDataset(ds: org.apache.spark.sql.Dataset[_], rows: Int = 20): Unit = {
    import com.twosigma.beakerx.scala.table.TableDisplay
    val columns = ds.columns
    val rowVals = ds.toDF.take(rows)
    val t = new TableDisplay(rowVals map (row => (columns zip row.toSeq).toMap))
    t.display()
  }
}
