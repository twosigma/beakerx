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

package com.twosigma.beaker.jvm.object;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.Assertions;
import org.junit.Test;

import java.io.IOException;
import java.io.StringWriter;

public class EvaluationResultTest {

  @Test
  public void createManagerWithParam_valueEqualsThatParam() throws Exception {
    //when
    EvaluationResult result = new EvaluationResult(new Integer(123));
    //then
    Assertions.assertThat(result.getValue()).isEqualTo(123);
  }

  @Test
  public void serializeEvaluationResult_resultJsonHasValue() throws IOException {
    //given
    ObjectMapper mapper = new ObjectMapper();
    StringWriter sw = new StringWriter();
    JsonGenerator jgen = mapper.getFactory().createGenerator(sw);
    EvaluationResult result = new EvaluationResult(Boolean.TRUE);
    //when
    jgen.writeObject(result);
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.get("value").asBoolean()).isEqualTo(true);
  }

}
