package com.twosigma.beaker.scala.chart.xychart

import java.util.SimpleTimeZone

/**
  * Created by bb8 on 01/06/2017.
  */
class TimePlot extends com.twosigma.beaker.chart.xychart.TimePlot {

  def this(simpleTimeZone: SimpleTimeZone) {
    this()
    super.setTimeZone(simpleTimeZone)
  }
}
