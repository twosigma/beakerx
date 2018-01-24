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
package com.twosigma.beakerx.fileloader;

import org.junit.Test;

import java.math.BigInteger;
import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

public class CSVTest {

  private static final boolean IS_WINDOWS = System.getProperty("os.name").contains("indow");
  public static final String TABLE_ROWS_TEST_CSV = "tableRowsTest.csv";
  public static final String INT_ROWS_TEST_CSV = "intTableTest.csv";
  public static final String BIG_INT_ROWS_TEST_CSV = "bigIntTableTest.csv";
  public static final String FLOAT_ROWS_TEST_CSV = "floatTableTest.csv";

  @Test
  public void shouldReturnDataAsListForPlot() throws Exception {
    //when
    List<Map<String, Object>> values =
            new CSV().read(getOsAppropriatePath(getClass().getClassLoader(), TABLE_ROWS_TEST_CSV));
    //then
    assertThat(values.get(2).get("m3")).isEqualTo(8);
    assertThat(values.get(2).get("time"))
            .isEqualTo(new SimpleDateFormat("yyyy-MM-dd").parse("1990-03-31"));
  }

  public static String getOsAppropriatePath(ClassLoader classLoader, String fileName) throws Exception {
    URI uriToFile = classLoader.getResource(fileName).toURI();
    return IS_WINDOWS
            ? uriToFile.getSchemeSpecificPart().substring(1)
            : uriToFile.getSchemeSpecificPart();
  }

  @Test
  public void shouldReturnInt() throws Exception {
    //when
    List<Map<String, Object>> values =
            new CSV().read(getOsAppropriatePath(getClass().getClassLoader(), INT_ROWS_TEST_CSV));
    //then
    assertThat(values.get(0).get("a")).isEqualTo(1);
  }

  @Test
  public void shouldReturnBigInt() throws Exception {
    //when
    List<Map<String, Object>> values =
            new CSV().read(getOsAppropriatePath(getClass().getClassLoader(), BIG_INT_ROWS_TEST_CSV));
    //then
    assertThat(values.get(0).get("a")).isEqualTo(new BigInteger("123456789123456789"));
  }

  @Test
  public void shouldReturnFloat() throws Exception {
    //when
    List<Map<String, Object>> values =
            new CSV().read(getOsAppropriatePath(getClass().getClassLoader(), FLOAT_ROWS_TEST_CSV));
    //then
    assertThat(values.get(0).get("a")).isEqualTo(1.1f);
  }

}
