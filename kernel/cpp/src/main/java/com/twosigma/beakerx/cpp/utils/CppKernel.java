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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.List;

public class CppKernel {

  private static final Logger logger = LoggerFactory.getLogger(CppKernel.class.getName());

  public native boolean cLoad(String fileName);

  public native Object cLoadAndRun(String fileName, String type);

  public CppKernel(final String tempDirectory) {
    System.load(tempDirectory + "/" + TempCppFiles.LIB_CRUN_JNILIB);
  }

  public int execute(final String mainCell, final String type, final String tempDirectory, List<String> otherCells) {

    // look at an issue https://github.com/twosigma/beakerx/issues/5228
    //loadSharedObjects(tempDirectory, otherCells);

    Object ret = cLoadAndRun(tempDirectory + "/lib" + mainCell + ".so", type);

    try {
      FileOutputStream file = new FileOutputStream(tempDirectory + "/" + mainCell + ".result");
      BufferedOutputStream buffer = new BufferedOutputStream(file);
      ObjectOutputStream output = new ObjectOutputStream(buffer);
      output.writeObject(ret);
      output.close();
    } catch (IOException ex) {
      logger.warn("Could not load file");
      return 1;
    }
    return 0;
  }

  private void loadSharedObjects(String tempDirectory, List<String> otherCells) {
    for (String cell : otherCells) {
      cLoad(tempDirectory + "/lib" + cell + ".so");
    }
  }
}