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
package com.twosigma.beakerx.scala.fileloader

import java.util

import scala.collection.JavaConversions.mapAsScalaMap
import scala.collection.JavaConverters._
import scala.collection.immutable.ListMap


class CSV extends com.twosigma.beakerx.fileloader.CSV {

  def readFile(fileName: String): List[Map[String, AnyRef]] = {
    val javaOutput: util.List[util.Map[String, AnyRef]] = super.read(fileName)

    val maps = javaOutput.asScala.map(x => createListMap(x))
    maps.toList
  }

  private def createListMap(x: util.Map[String, AnyRef]) = {
    var mapWithOrder = new ListMap[String, AnyRef]()
    for ((key,value) <- x.asScala) {
      mapWithOrder = mapWithOrder ++ ListMap( key -> value)
    }
    mapWithOrder
  }

  def readFileStream(fileName: String): Stream[Map[String, AnyRef]] = {
    val javaIterator = new CSVIterator(fileName)

    javaIterator.asScala.map(_.asScala.toMap).toStream
  }
}
