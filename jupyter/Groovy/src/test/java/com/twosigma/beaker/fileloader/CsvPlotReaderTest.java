/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.fileloader;

import com.github.lwhite1.tablesaw.api.Table;
import org.junit.Test;

import java.net.URI;
import java.text.SimpleDateFormat;

import static org.assertj.core.api.Assertions.assertThat;

public class CsvPlotReaderTest {

  private static final boolean IS_WINDOWS = System.getProperty("os.name").contains("indow");

  @Test
  public void shouldReturnDataForPlot() throws Exception {
    //given
    URI uriToTableRowTest = getClass().getClassLoader().getResource("tableRowsTest.csv").toURI();
    String osAppropriatePath = IS_WINDOWS ?
            uriToTableRowTest.getSchemeSpecificPart().substring(1) : uriToTableRowTest.getSchemeSpecificPart();
    //when
    CsvPlotReader reader = new CsvPlotReader();
    Table values = reader.read(osAppropriatePath);
    //then
    assertThat(reader.convert(values).get(2).get("m3")).isEqualTo(8.0f);
    assertThat(reader.convert(values).get(2).get("time")).isEqualTo(new SimpleDateFormat("yyyy-MM-dd").parse("1990-03-31").getTime());
  }
}