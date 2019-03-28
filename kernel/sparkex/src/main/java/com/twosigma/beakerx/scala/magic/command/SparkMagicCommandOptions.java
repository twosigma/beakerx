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
import org.apache.commons.cli.BasicParser;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.ParseException;

import java.util.ArrayList;
import java.util.List;

import static com.twosigma.beakerx.scala.magic.command.SparkOptions.NO_UI;
import static com.twosigma.beakerx.scala.magic.command.SparkOptions.START;

public class SparkMagicCommandOptions {

  private SparkOptions sparkOptions;
  private SparkMagicActionOptions sparkMagicCommand;

  public SparkMagicCommandOptions(SparkMagicActionOptions sparkMagicCommand) {
    this.sparkMagicCommand = sparkMagicCommand;
    this.sparkOptions = new SparkOptions();
  }

  public OptionsResult parseOptions(String[] args) {
    CommandLineParser parser = new BasicParser();
    List<SparkOptionCommand> commands = new ArrayList<>();
    try {
      CommandLine cmd = parser.parse(sparkOptions.getOptions(), args);
      if (cmd.hasOption(START)) {
        commands.add(new SparkOptionCommand() {
          @Override
          public void run(SparkUI sparkUI, Message parent) {
            sparkMagicCommand.connectToSparkSession(sparkUI, parent);
          }

          @Override
          public String getName() {
            return START;
          }
        });
      }
      if (cmd.hasOption(NO_UI)) {
        commands.add(new SparkOptionCommand() {
          @Override
          public void run(SparkUI sparkUI, Message parent) {

          }

          @Override
          public String getName() {
            return NO_UI;
          }
        });
      }
    } catch (ParseException e) {
      return new ErrorOptionsResult(e.getMessage());
    }
    return new SparkOptionsResult(commands);
  }

  public interface OptionsResult {
    boolean hasError();

    String errorMsg();

    List<SparkOptionCommand> options();
  }

  private class ErrorOptionsResult implements OptionsResult {
    private String error;

    public ErrorOptionsResult(String error) {
      this.error = error;
    }

    @Override
    public boolean hasError() {
      return true;
    }

    @Override
    public String errorMsg() {
      return error;
    }

    @Override
    public List<SparkOptionCommand> options() {
      return new ArrayList<>();
    }
  }

  private class SparkOptionsResult implements OptionsResult {
    private List<SparkOptionCommand> sparkOptions;

    public SparkOptionsResult(List<SparkOptionCommand> sparkOptions) {
      this.sparkOptions = sparkOptions;
    }

    @Override
    public boolean hasError() {
      return false;
    }

    @Override
    public String errorMsg() {
      return "";
    }

    @Override
    public List<SparkOptionCommand> options() {
      return sparkOptions;
    }
  }

  interface SparkOptionCommand {
    void run(SparkUI sparkUI, Message parent);

    String getName();
  }
}

