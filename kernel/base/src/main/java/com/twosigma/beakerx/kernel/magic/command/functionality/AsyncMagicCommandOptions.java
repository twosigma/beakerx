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
package com.twosigma.beakerx.kernel.magic.command.functionality;

import com.twosigma.beakerx.BeakerXClientManager;
import com.twosigma.beakerx.kernel.magic.command.AsyncOptions;
import org.apache.commons.cli.BasicParser;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.ParseException;

import java.util.ArrayList;
import java.util.List;

public class AsyncMagicCommandOptions {

  private AsyncOptions asyncOptions;

  public AsyncMagicCommandOptions() {
    this.asyncOptions = new AsyncOptions();
  }

  public OptionsResult parseOptions(String[] args) {
    CommandLineParser parser = new BasicParser();
    List<AsyncMagicCommand.AsyncOptionCommand> commands = new ArrayList<>();
    try {
      CommandLine cmd = parser.parse(asyncOptions.getOptions(), args);
      if (cmd.hasOption(AsyncOptions.THEN)) {
        commands.add(() -> BeakerXClientManager.get().runByTag(cmd.getOptionValue(AsyncOptions.THEN)));
      }
    } catch (ParseException e) {
      return new ErrorOptionsResult(e.getMessage());
    }
    return new AsyncOptionsResult(commands);
  }

  public interface OptionsResult {
    boolean hasError();

    String errorMsg();

    List<AsyncMagicCommand.AsyncOptionCommand> options();
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
    public List<AsyncMagicCommand.AsyncOptionCommand> options() {
      return new ArrayList<>();
    }
  }

  private class AsyncOptionsResult implements OptionsResult {
    private List<AsyncMagicCommand.AsyncOptionCommand> sparkOptions;

    public AsyncOptionsResult(List<AsyncMagicCommand.AsyncOptionCommand> sparkOptions) {
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
    public List<AsyncMagicCommand.AsyncOptionCommand> options() {
      return sparkOptions;
    }
  }
}

