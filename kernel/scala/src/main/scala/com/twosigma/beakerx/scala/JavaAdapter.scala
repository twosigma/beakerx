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

package com.twosigma.beakerx.scala

import scala.annotation.implicitNotFound
import scala.language.higherKinds

/**
  * Typeclasses and support for matching Scala types to Java types used by Beakerx
  */

object JavaAdapter {
  // Substitute for kind-projector (type lambdas)
  // Has[To]#Conversion is like ? => To, suitable for making context bounds that are like (deprecated) view bounds
  // See https://groups.google.com/d/msg/scala-internals/hNow9MvAi6Q/qqkQfsqapIcJ
  type Has[To] = {type Conversion[From] = From => To}
  type HasSeq[Element] = {type Conversion[From[_]] = From[Element] => Seq[Element]}

  // Types that have an implicit conversion to Number (that is, Scala numeric types)
  type NumberView[T] = T => Number

  @implicitNotFound("Type ${T} must be either com.twosigma.beakerx.chart.Color or java.awt.Color")
  sealed trait BeakerColor[T]
  object BeakerColor {
    implicit object color extends BeakerColor[com.twosigma.beakerx.chart.Color]
    implicit object awtColor extends BeakerColor[java.awt.Color]
  }

  @implicitNotFound("X values must be of numeric type or one of Date, LocalDate, LocalDateTime, or Instant (found ${T})")
  sealed trait BeakerXAxis[T]
  object BeakerXAxis {
    implicit def numberView[T : NumberView]: BeakerXAxis[T] = new BeakerXAxis[T] {}
    implicit object date extends BeakerXAxis[java.util.Date]
    implicit object localDate extends BeakerXAxis[java.time.LocalDate]
    implicit object localDateTime extends BeakerXAxis[java.time.LocalDateTime]
    implicit object instant extends BeakerXAxis[java.time.Instant]
  }

  def getNullableList[T](getter: () => java.util.List[T]) = {
    import scala.collection.JavaConverters._

    Option(getter()).toSeq.flatMap(_.asScala)
  }

  // In Scala 2.11, the implicit conversions from boxed Java types to Scala types are not null-safe.
  // This helper can be used to safely convert (for example) a nullable Integer to an Option[Int].
  // See https://github.com/scala/scala/commit/37eacec819e38cc29357a31ee99b592f31e0702f
  def safeOption[T <: AnyRef, U <: AnyVal](value: T)(implicit ev: T => U): Option[U] = Option(value).map(ev)
}
