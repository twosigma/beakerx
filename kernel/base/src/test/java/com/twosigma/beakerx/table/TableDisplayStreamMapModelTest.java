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

package com.twosigma.beakerx.table;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.KernelManager;
import org.jetbrains.annotations.NotNull;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.function.Supplier;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;

public class TableDisplayStreamMapModelTest {

  protected KernelTest kernel;
  private TableDisplay tableDisplay;

  @Before
  public void setUp() throws Exception {
    kernel = new KernelTest();
    KernelManager.register(kernel);
    tableDisplay = new TableDisplay(generateInfiniteStream());
    TableDisplay.setLoadingMode(TableDisplayLoadingMode.ENDLESS);
    tableDisplay.display();
    kernel.clearMessages();
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
    TableDisplay.setLoadingMode(TableDisplayLoadingMode.ALL);
  }

  @Test
  public void init() throws Exception {
    //given
    //when
    List<List<?>> lists = tableDisplay.getValues();
    //then
    assertThat(lists.size()).isEqualTo(tableDisplay.PAGE_SIZE);
    assertThat(lists.get(0).get(0)).isEqualTo(0);
  }

  @Test
  public void takeNextPage() throws Exception {
    //given
    //when
    List<List<?>> lists = tableDisplay.takeNextPage();
    //then
    assertThat(lists.size()).isEqualTo(tableDisplay.PAGE_SIZE);
    assertThat(lists.get(0).get(0)).isEqualTo(1000);
  }

  @NotNull
  private Stream<Map<String, Object>> generateInfiniteStream() {
    return Stream.generate(new Supplier<Map<String, Object>>() {
      Random random = new Random();
      int index = 0;
      @Override
      public Map<String, Object> get() {
        return new LinkedHashMap<String, Object>() {
          {
            put("str1", index++);
            put("str2", random.nextFloat());
            put("str3", random.nextInt());
          }
        };
      }
    });
  }


}
