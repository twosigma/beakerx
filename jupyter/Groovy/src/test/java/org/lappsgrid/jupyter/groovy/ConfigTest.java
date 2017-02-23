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

package org.lappsgrid.jupyter.groovy;

import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.lappsgrid.jupyter.groovy.json.Serializer;

public class ConfigTest {

  private static String srcJson =
      "{\n"
          + "  \"stdin_port\": 54100, \n"
          + "  \"ip\": \"127.0.0.1\", \n"
          + "  \"control_port\": 54101, \n"
          + "  \"hb_port\": 54102, \n"
          + "  \"signature_scheme\": \"hmac-sha256\", \n"
          + "  \"key\": \"7ce00df6-f1de-4425-ab4b-8c209a54a4ad\", \n"
          + "  \"kernel_name\": \"groovy\", \n"
          + "  \"shell_port\": 54103, \n"
          + "  \"transport\": \"tcp\", \n"
          + "  \"iopub_port\": 54104\n"
          + "}";

  @Test
  public void serializeConfig_createConfigWithProperties() {
    //when
    Config configuration = Serializer.parse(srcJson, Config.class);
    //then
    Assertions.assertThat(configuration.getStdin()).isEqualTo(54100);
    Assertions.assertThat(configuration.getHost()).isEqualTo("127.0.0.1");
    Assertions.assertThat(configuration.getControl()).isEqualTo(54101);
    Assertions.assertThat(configuration.getHeartbeat()).isEqualTo(54102);
    Assertions.assertThat(configuration.getScheme()).isEqualTo("hmac-sha256");
    Assertions.assertThat(configuration.getKey()).isEqualTo("7ce00df6-f1de-4425-ab4b-8c209a54a4ad");
    Assertions.assertThat(configuration.getName()).isEqualTo("groovy");
    Assertions.assertThat(configuration.getShell()).isEqualTo(54103);
    Assertions.assertThat(configuration.getTransport()).isEqualTo("tcp");
    Assertions.assertThat(configuration.getIopub()).isEqualTo(54104);
  }
}
