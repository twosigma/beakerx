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

package org.lappsgrid.jupyter.msg;

import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.lappsgrid.jupyter.json.Serializer;

public class HeaderTest {

  private static String srcJson =
      "{"
          + "\"version\":\"5.0\","
          + "\"msg_type\":\"execute_request\","
          + "\"msg_id\":\"9CEE9EE3351643CD83A6C2A29401A942\","
          + "\"username\":\"username\","
          + "\"session\":\"605DC3793F6F402698418908DBC7C572\""
          + "}";

  @Test
  public void serializeConfig_createConfigWithProperties() {
    //when
    Header header = Serializer.parse(srcJson, Header.class);
    //then
    Assertions.assertThat(header.getVersion()).isEqualTo("5.0");
    Assertions.assertThat(header.getType()).isEqualTo("execute_request");
    Assertions.assertThat(header.getId()).isEqualTo("9CEE9EE3351643CD83A6C2A29401A942");
    Assertions.assertThat(header.getUsername()).isEqualTo("username");
    Assertions.assertThat(header.getSession()).isEqualTo("605DC3793F6F402698418908DBC7C572");
  }
}
