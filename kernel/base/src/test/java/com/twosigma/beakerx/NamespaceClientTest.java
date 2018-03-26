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

package com.twosigma.beakerx;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beakerx.kernel.KernelManager;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;

public class NamespaceClientTest {

  private static String SESSION_ID = "sessionId";
  private NamespaceClient namespaceClient;
  private KernelTest kernel;

  @Before
  public void setUp() {
    namespaceClient = NamespaceClient.getBeaker(SESSION_ID);
    kernel = new KernelTest();
    KernelManager.register(kernel);
  }

  @After
  public void tearDown() throws Exception {
    kernel.exit();
    KernelManager.register(null);
  }

  @Test
  public void getNamespaceClientBySessionId_returnNamespaceClient() {
    //when
    NamespaceClient curNamespaceClient = NamespaceClient.getBeaker(SESSION_ID);
    //then
    assertThat(namespaceClient).isNotNull();
    assertThat(curNamespaceClient).isEqualTo(namespaceClient);
  }

  @Test
  public void getNamespaceClientByCurrentSessionId_returnNamespaceClient() {
    //when
    NamespaceClient curNamespaceClient = NamespaceClient.getBeaker();
    //then
    assertThat(curNamespaceClient).isNotNull();
    assertThat(curNamespaceClient).isEqualTo(namespaceClient);
  }

  @Test
  public void deleteNamespaceClientBySessionId_deleteNamespaceClient() {
    //when
    NamespaceClient.delBeaker(SESSION_ID);
    NamespaceClient curNamespaceClient = NamespaceClient.getBeaker();
    //then
    assertThat(curNamespaceClient).isNull();
  }

  @Test
  public void setData_returnValue() throws Exception {
    //given
    NamespaceClient curNamespaceClient = NamespaceClient.getBeaker(randomize("returnValue"));
    //when
    Object value = curNamespaceClient.set("x", new Integer(10));
    //then
    assertThat(value).isNotNull();
    assertThat(value).isEqualTo(new Integer(10));
  }

  @Test
  public void setData_setAutotranslationData() throws Exception {
    //given
    NamespaceClient curNamespaceClient = NamespaceClient.getBeaker(randomize("setAutotranslationData"));
    //when
    curNamespaceClient.set("x", new Integer(10));
    //then
    assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Map data = (Map) kernel.getPublishedMessages().get(1).getContent().get("data");
    Map state = (Map) data.get("state");
    assertThat(state.get("name")).isEqualTo("x");
    assertThat(state.get("value")).isEqualTo("10");
    assertThat(state.get("sync")).isEqualTo(Boolean.TRUE);
  }

  @Test
  public void setBigInt() throws Exception {
    //given
    long millis = new Date().getTime();
    long nanos = millis * 1000 * 1000L;

    List<Map<String, String>> table = asList(
            new HashMap<String, String>() {{
              put("time", (nanos + 7 * 1) + "");
              put("next_time", ((nanos + 77) * 1) + "");
              put("temp", 14.6 + "");
            }},
            new HashMap<String, String>() {{
              put("time", (nanos + 7 * 1) + "");
              put("next_time", ((nanos + 88) * 2) + "");
              put("temp", 18.1 + "");
            }},
            new HashMap<String, String>() {{
              put("time", (nanos + 7 * 1) + "");
              put("next_time", ((nanos + 99) * 3) + "");
              put("temp", 23.6 + "");
            }}
    );

    NamespaceClient curNamespaceClient = NamespaceClient.getBeaker(randomize("setBigInt"));
    //when
    curNamespaceClient.set("table_with_longs", table);
    //then
    assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Map data = (Map) kernel.getPublishedMessages().get(2).getContent().get("data");
    Map state = (Map) data.get("state");
    assertThat(state.get("name")).isEqualTo("table_with_longs");
    assertThat(isJSONValid(state.get("value"))).isTrue();
  }

  private String randomize(String text) {
    return text + UUID.randomUUID();
  }

  @Test
  public void setData_sendCommMessage() throws Exception {
    //given
    NamespaceClient curNamespaceClient = NamespaceClient.getBeaker(randomize("sendCommMessage"));
    //when
    curNamespaceClient.set("x", new Integer(10));
    //then
    assertThat(kernel.getPublishedMessages()).isNotEmpty();
  }

  public static boolean isJSONValid(Object jsonInString) {
    try {
      final ObjectMapper mapper = new ObjectMapper();
      mapper.readTree((String) jsonInString);
      return true;
    } catch (IOException e) {
      return false;
    }
  }
}
