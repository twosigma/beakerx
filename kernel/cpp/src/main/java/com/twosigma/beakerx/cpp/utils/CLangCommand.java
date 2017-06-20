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
package com.twosigma.beakerx.cpp.utils;

import java.util.ArrayList;
import java.util.List;

public class CLangCommand {

  public static List<String> compileCommand(TempCppFiles tempCppFiles) {
    List<String> compileCommand = new ArrayList<>();
    compileCommand.add("clang++");
    compileCommand.add("-shared");
    if (System.getProperty("os.name").toLowerCase().startsWith("mac")) {
      compileCommand.add("-undefined");
      compileCommand.add("dynamic_lookup");
    }
    compileCommand.add("-fPIC");
    compileCommand.add("-m64");
    compileCommand.add("-Wno-return-type-c-linkage");
    compileCommand.add("-I");
    compileCommand.add(tempCppFiles.getPath());
    compileCommand.add("-I");
    compileCommand.add(System.getProperty("java.home") + "/../include");
    compileCommand.add("-I");
    compileCommand.add(System.getProperty("java.home") + "/../include/linux");
    compileCommand.add("-I");
    compileCommand.add(System.getProperty("java.home") + "/../include/darwin");
    return compileCommand;
  }
}
