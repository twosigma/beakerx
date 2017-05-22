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

import com.fasterxml.jackson.databind.JsonNode;
import com.twosigma.beaker.jvm.serialization.SerializationTestHelper;
import org.assertj.core.api.Assertions;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;

public class TestContainerTest {

  private static TestContainer.Serializer serializer;
  private static SerializationTestHelper<TestContainer.Serializer, TestContainer> helper;

  @BeforeClass
  public static void setUpClass() throws IOException {
    serializer = new TestContainer.Serializer();
    helper = new SerializationTestHelper<>(serializer);
  }

  @Test
  public void serializeTestContainer_resultJsonHasType() throws IOException {
    //given
    TestContainer container = new TestContainer();
    //when
    JsonNode actualObj = helper.serializeObject(container);
    //then
    Assertions.assertThat(actualObj.get("type").asText()).isEqualTo("TestContainer");
  }

}
