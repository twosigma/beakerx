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

package com.twosigma.beakerx.jvm.object;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beakerx.jvm.ObserverObjectTest;
import com.twosigma.beakerx.jvm.serialization.BasicObjectSerializer;
import com.twosigma.beakerx.jvm.serialization.SerializationTestHelper;
import org.assertj.core.api.Assertions;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;

public class UpdatableEvaluationResultTest {

  private static UpdatableEvaluationResult.Serializer serializer;
  private static SerializationTestHelper<UpdatableEvaluationResult.Serializer, UpdatableEvaluationResult> helper;

  @BeforeClass
  public static void setUpClass() throws IOException {
    serializer = new UpdatableEvaluationResult.Serializer();
    helper = new SerializationTestHelper<>(serializer);
  }

  @Test
  public void setValue_shouldNotifyObserver() throws Exception {
    //given
    UpdatableEvaluationResult result = new UpdatableEvaluationResult("test");
    ObserverObjectTest observer = new ObserverObjectTest();
    result.addObserver(observer);
    //when
    result.setValue("test");
    //then
    Assertions.assertThat(observer.getObjectList().get(0)).isEqualTo(result);
  }

  @Test
  public void serializeUpdatableEvaluationResult_resultJsonHasType() throws IOException {
    //given
    UpdatableEvaluationResult result = new UpdatableEvaluationResult("test");
    //when
    JsonNode actualObj = helper.serializeObject(result);
    //then
    Assertions.assertThat(actualObj.get("type").asText()).isEqualTo("UpdatableEvaluationResult");
  }

  @Test
  public void deserialize_resultObjectHasPayload() throws Exception {
    //given
    boolean payload = true;
    ObjectMapper mapper = new ObjectMapper();
    JsonNode actualObj = mapper.readTree(
        "{\"type\":\"UpdatableEvaluationResult\",\"payload\":\"" + payload + "\"}");
    UpdatableEvaluationResult.DeSerializer deserializer =
        new UpdatableEvaluationResult.DeSerializer(new BasicObjectSerializer());
    //when
    UpdatableEvaluationResult result =
        (UpdatableEvaluationResult) deserializer.deserialize(actualObj, mapper);
    //then
    Assertions.assertThat(result.getValue()).isEqualTo(payload);
  }

}
