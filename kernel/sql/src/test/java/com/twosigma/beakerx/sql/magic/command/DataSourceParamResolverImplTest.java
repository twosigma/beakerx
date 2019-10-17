
/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.sql.magic.command;

import com.twosigma.beakerx.evaluator.EvaluatorTest;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class DataSourceParamResolverImplTest {


  private DataSourceParamResolverImpl sut;

  @Before
  public void setUp() throws Exception {
    EvaluatorTest.BeakexClientTestImpl client = new EvaluatorTest.BeakexClientTestImpl();
    client.set("dbuser", "user1");
    client.set("dbpassword", "user1password");
    this.sut = new DataSourceParamResolverImpl(client);
  }

  @After
  public void tearDown() throws Exception {

  }

  @Test
  public void test() {
    //given
    String jdbcTemplate = "jdbc:postgresql://localhost:5432/postgres?user={$beakerx.dbuser}&password={$beakerx.dbpassword}";
    //when
    String resolved = sut.resolve(jdbcTemplate);
    //then
    assertThat(resolved).isEqualTo("jdbc:postgresql://localhost:5432/postgres?user=user1&password=user1password");
  }

}