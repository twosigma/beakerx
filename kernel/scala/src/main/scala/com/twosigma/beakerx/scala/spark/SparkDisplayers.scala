package com.twosigma.beakerx.scala.spark

import java.util.{HashMap, Map}

import com.twosigma.beakerx.mimetype.MIMEContainer
import jupyter.{Displayer, Displayers}

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
