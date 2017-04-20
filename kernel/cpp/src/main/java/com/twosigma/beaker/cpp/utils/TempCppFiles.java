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
package com.twosigma.beaker.cpp.utils;

import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;

public class TempCppFiles {

  public static final String BEAKER_HPP = "beaker.hpp";
  public static final String CPP = "cpp";
  public static final String CPP_BAT = "cpp.bat";
  public static final String CPP_KERNEL_H = "CppKernel.h";
  public static final String LIB_CRUN_JNILIB = "libCRun.jnilib";

  public static final String BEAKERX = "beakerx_";
  private Path tempDirectory;

  public TempCppFiles(String prefix) {
    tempDirectory = getTempDirectory(BEAKERX + prefix);
    copyFile(BEAKER_HPP);
    copyFile(CPP);
    copyFile(CPP_BAT);
    copyFile(CPP_KERNEL_H);
    copyFile(LIB_CRUN_JNILIB);
    addShutdownHookToDeleteTempDirectory();
  }

  public synchronized void close() {
    try {
      if (tempDirectory != null) {
        FileUtils.deleteDirectory(tempDirectory.toFile());
        tempDirectory = null;
      }
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  private void addShutdownHookToDeleteTempDirectory() {
    Runtime.getRuntime().addShutdownHook(new Thread() {
      @Override
      public void run() {
        super.run();
        close();
      }
    });
  }

  private void copyFile(String fileName) {
    InputStream is = this.getClass().getClassLoader().getResourceAsStream(fileName);

    OutputStream os = null;
    try {
      os = new FileOutputStream(tempDirectory.toString() + "/" + fileName);
      byte[] buffer = new byte[4096];
      int length;
      while ((length = is.read(buffer)) > 0) {
        os.write(buffer, 0, length);
      }
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      try {
        os.close();
        is.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    File file = new File(tempDirectory.toString() + "/" + fileName);
    file.setExecutable(true);
  }

  private Path getTempDirectory(String prefix) {
    try {
      return Files.createTempDirectory(prefix);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  public String getPath() {
    return tempDirectory.toString();
  }
}
