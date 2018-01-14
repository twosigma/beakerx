package com.twosigma.beakerx.scala.chart.xychart

import java.util.{Date, SimpleTimeZone}

/**
  * Created by bb8 on 01/06/2017.
  */
class TimePlot extends com.twosigma.beakerx.chart.xychart.TimePlot with TimePlotProperties {

  def this(simpleTimeZone: SimpleTimeZone) {
    this()
    super.setTimeZone(simpleTimeZone)
  }
}

trait TimePlotProperties extends XYChartProperties {
  this: com.twosigma.beakerx.chart.xychart.TimePlot =>

  def xBound_=(ds: (Date, Date), dummy: Int = 0): Unit = setXBound(ds._1, ds._2)
}