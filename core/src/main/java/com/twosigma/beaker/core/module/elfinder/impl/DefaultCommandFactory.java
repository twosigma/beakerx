/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.core.module.elfinder.impl;

import com.twosigma.beaker.core.module.elfinder.service.Command;
import com.twosigma.beaker.core.module.elfinder.service.CommandFactory;

import java.util.HashMap;
import java.util.Map;

public class DefaultCommandFactory implements CommandFactory {
  private String               classNamePattern;
  private Map<String, Command> map;
  private Command              fallbackCommand;

  public DefaultCommandFactory() {map = new HashMap<>();}

  @Override
  public Command get(String commandName) {
    if (map.containsKey(commandName))
      return map.get(commandName);

    try {
      String className = String.format(classNamePattern,
                                       commandName.substring(0, 1).toUpperCase() + commandName.substring(1));
      return (Command) Class.forName(className).newInstance();
    } catch (Exception e) {
      // not found
      return fallbackCommand;
    }
  }

  public String getClassNamePattern() {
    return classNamePattern;
  }

  public Map<String, Command> getMap() {
    return map;
  }

  public Command getFallbackCommand() {
    return fallbackCommand;
  }

  public void setClassNamePattern(String classNamePattern) {
    this.classNamePattern = classNamePattern;
  }

  public void setMap(Map<String, Command> map) {
    this.map = map;
  }

  public void setFallbackCommand(Command fallbackCommand) {
    this.fallbackCommand = fallbackCommand;
  }
}
