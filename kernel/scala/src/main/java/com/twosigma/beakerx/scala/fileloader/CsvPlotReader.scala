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
import scala.collection.JavaConverters._


class CsvPlotReader extends com.twosigma.beakerx.fileloader.CsvPlotReader {

  def readFile(fileName: String): List[Map[_, _]] = {
    val javaOutput : util.List[util.Map[_, _]] = super.readAsList(fileName)
    val refactoredOutput : List[util.Map[_,_]] = asScalaBuffer(javaOutput).toList

    refactoredOutput.map(ro => mapAsScalaMap(ro).toMap)
  }
}
