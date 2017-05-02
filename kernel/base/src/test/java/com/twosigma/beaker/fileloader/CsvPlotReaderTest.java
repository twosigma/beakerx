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
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

public class CsvPlotReaderTest {

  private static final boolean IS_WINDOWS = System.getProperty("os.name").contains("indow");

  @Test
  public void shouldReturnDataForPlot() throws Exception {
    //given
    CsvPlotReader reader = new CsvPlotReader();
    //when
    Table values = reader.read(getOsAppropriatePath("tableRowsTest.csv"));
    //then
    assertThat(reader.convert(values).get(2).get("m3")).isEqualTo(8.0f);
    assertThat(reader.convert(values).get(2).get("time"))
        .isEqualTo(new SimpleDateFormat("yyyy-MM-dd").parse("1990-03-31").getTime());
  }

  @Test
  public void shouldReturnDataAsListForPlot() throws Exception {
    //when
    List<Map<?, ?>> values =
        new CsvPlotReader().readAsList(getOsAppropriatePath("tableRowsTest.csv"));
    //then
    assertThat(values.get(2).get("m3")).isEqualTo(8.0f);
    assertThat(values.get(2).get("time"))
        .isEqualTo(new SimpleDateFormat("yyyy-MM-dd").parse("1990-03-31").getTime());
  }

  private String getOsAppropriatePath(String fileName) throws Exception {
    URI uriToFile = getClass().getClassLoader().getResource(fileName).toURI();
    return IS_WINDOWS
        ? uriToFile.getSchemeSpecificPart().substring(1)
        : uriToFile.getSchemeSpecificPart();
  }
}
