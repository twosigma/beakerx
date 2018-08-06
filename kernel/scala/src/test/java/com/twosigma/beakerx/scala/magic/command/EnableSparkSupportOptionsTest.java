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

import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;
import com.twosigma.beakerx.message.Message;
import org.junit.Before;
import org.junit.Test;

import static com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem.Status.OK;
import static org.assertj.core.api.Assertions.assertThat;

public class EnableSparkSupportOptionsTest {
  private EnableSparkSupportOptions sut;
  private EnableSparkSupportActionMock actions;

  @Before
  public void setUp() {
    actions = new EnableSparkSupportActionMock();
    sut = new EnableSparkSupportOptions(actions);
  }

  @Test
  public void parseLongVersionOption() {
    //given
    String options = "--version 2.3.1 -s";
    //when
    runOptions(options);
    //then
    assertThat(actions.sparkLoaded).isTrue();
    assertThat(actions.versionLoaded).isEqualTo("2.3.1");
  }

  @Test
  public void parseShortVersionOption() {
    //given
    String options = "-v 2.3.1";
    //when
    runOptions(options);
    //then
    assertThat(actions.sparkLoaded).isTrue();
    assertThat(actions.versionLoaded).isEqualTo("2.3.1");
  }

  @Test
  public void unknownOption() {
    //given
    String options = "--unknownOption";
    //when
    EnableSparkSupportOptions.OptionsResult optionsResult = sut.parseOptions(args(options));
    //then
    assertThat(optionsResult.hasError()).isTrue();
  }


  private void runOptions(String options) {
    EnableSparkSupportOptions.OptionsResult optionsResult = sut.parseOptions(args(options));
    //then
    assertThat(optionsResult.hasError()).isFalse();
    optionsResult.options().forEach(x -> x.run(null));
  }

  private String[] args(String options) {
    return options.split(" ");
  }


  public static class EnableSparkSupportActionMock implements EnableSparkSupportActionOptions {
    public boolean sparkLoaded;
    public String versionLoaded;

    @Override
    public MagicCommandOutcomeItem loadSpark(Message parent, String version) {
      sparkLoaded = true;
      versionLoaded = version;
      return new MagicCommandOutput(OK);
    }
  }
}