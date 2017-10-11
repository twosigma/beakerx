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
package com.twosigma.beakerx;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

public class DisplayerDataMapperTest {

  @Test
  public void shouldConvertData() throws Exception {
    //given
    ObjectMapper mapper = new ObjectMapper();
    DisplayerDataMapper.Converter converter = data -> {
      String json = mapper.writeValueAsString(data);
      return mapper.readValue(json, Object.class);
    };
    DisplayerDataMapper.register(converter);
    //when
    Object convert = DisplayerDataMapper.convert(new Person("XXX", 22));
    //then
    Map personAsMap = (Map) convert;
    assertThat(personAsMap.get("name")).isEqualTo("XXX");
    assertThat(personAsMap.get("age")).isEqualTo(22);
  }

  @Test
  public void shouldReturnOriginalDataWhenProblemOccursDuringConverting() throws Exception {
    //given
    Person person = new Person("XXX", 22);
    DisplayerDataMapper.Converter converter = data -> {
      throw new RuntimeException("Error");
    };
    DisplayerDataMapper.register(converter);
    //when
    Object convert = DisplayerDataMapper.convert(person);
    //then
    assertThat(convert).isEqualTo(person);
  }

  public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
      this.name = name;
      this.age = age;
    }

    public String getName() {
      return name;
    }

    public int getAge() {
      return age;
    }
  }
}