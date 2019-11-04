/*
 * Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.twosigma.beakerx.scala.chart.xychart.plotitem

import java.util

import com.twosigma.beakerx.chart.categoryplot.plotitem.BasedCategoryGraphics
import com.twosigma.beakerx.scala.JavaAdapter._
import com.twosigma.beakerx.scala.chart.categoryplot.plotitem.CategoryGraphicsProperties

import scala.collection.JavaConverters._
import scala.language.higherKinds

trait BasedCategoryGraphicsProperties extends CategoryGraphicsProperties {
  this: BasedCategoryGraphics =>

  import BasedCategoryGraphicsProperties._

  def base: Number = getBase
  def bases: Seq[Any] = getNullableList(()=> getBases)
  def base_=(base: Number): Unit = setBase(base)
  def base_=[T](s: Seq[T])(implicit basesEv: T => CategoryBasesType): Unit = {
    setBase(s.map(_.toObject).asJava)
}

}

object BasedCategoryGraphicsProperties {
  sealed trait CategoryBasesType {
    def toObject: Object
  }
  implicit class NumberViewable[T : NumberView](value: T) extends CategoryBasesType {
    override def toObject: Object = value: Number
  }
  implicit class SeqOfNumberViewable[T : NumberView, Coll[_] : HasSeq[T]#Conversion](value: Coll[T]) extends CategoryBasesType {
    override def toObject: Object = {
      val normalized: Seq[Number] = (value: Seq[T]).toNumbers
      normalized.asJava
    }
  }
}
