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
package com.twosigma.beakerx.scala.magic.command;

import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.SparkUI;
import org.junit.Before;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class SparkMagicCommandOptionsTest {

  private SparkMagicCommandOptions sut;
  private SparkMagicActionMock actions;

  @Before
  public void setUp() {
    actions = new SparkMagicActionMock();
    sut = new SparkMagicCommandOptions(actions);
  }

  @Test
  public void parseLongStartOption() {
    //given
    String options = "--start -v 2.2.1";
    //when
    runOptions(options);
    //then
    assertThat(actions.sparkConnected).isTrue();
  }

  @Test
  public void parseShortStartOption() {
    //given
    String options = "-s";
    //when
    runOptions(options);
    //then
    assertThat(actions.sparkConnected).isTrue();
  }

  @Test
  public void unknownOption() {
    //given
    String options = "--unknownOption";
    //when
    SparkMagicCommandOptions.OptionsResult optionsResult = sut.parseOptions(args(options));
    //then
    assertThat(optionsResult.hasError()).isTrue();
  }

  private void runOptions(String options) {
    SparkMagicCommandOptions.OptionsResult optionsResult = sut.parseOptions(args(options));
    //then
    assertThat(optionsResult.hasError()).isFalse();
    optionsResult.options().forEach(x -> x.run(null, null));
  }

  private String[] args(String options) {
    return options.split(" ");
  }


  class SparkMagicActionMock implements SparkMagicActionOptions {

    private boolean sparkConnected;

    @Override
    public void connectToSparkSession(SparkUI sparkUI, Message parent) {
      sparkConnected = true;
    }
  }
}