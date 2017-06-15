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
import com.twosigma.beakerx.jvm.serialization.BasicObjectSerializer;
import com.twosigma.beakerx.jvm.serialization.SerializationTestHelper;
import org.assertj.core.api.Assertions;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;

public class EvaluationResultTest {

  private static EvaluationResult.Serializer serializer;
  private static SerializationTestHelper<EvaluationResult.Serializer, EvaluationResult> helper;

  @BeforeClass
  public static void setUpClass() throws IOException {
    serializer = new EvaluationResult.Serializer(() -> { return new BasicObjectSerializer(); } );
    helper = new SerializationTestHelper<>(serializer);
  }

  @Test
  public void createEvaluationResultWithParam_valueEqualsThatParam() throws Exception {
    //when
    EvaluationResult result = new EvaluationResult(new Integer(123));
    //then
    Assertions.assertThat(result.getValue()).isEqualTo(123);
  }

  @Test
  public void serializeEvaluationResult_resultJsonHasValue() throws IOException {
    //given
    EvaluationResult result = new EvaluationResult(Boolean.TRUE);
    //when
    JsonNode actualObj = helper.serializeObject(result);
    //then
    Assertions.assertThat(actualObj.asBoolean()).isEqualTo(true);
  }

}
