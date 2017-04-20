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

import com.twosigma.beaker.NamespaceClient;
import org.apache.http.client.ClientProtocolException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

public class CppKernel {

  private static final Logger logger = LoggerFactory.getLogger(CppKernel.class.getName());

  public native void cInit(NamespaceClient nc);

  public native boolean cLoad(String fileName);

  public native Object cLoadAndRun(String fileName, String type);

  public static NamespaceClient nc;

  public CppKernel(final String sessionId, final String tempDirectory) {
    nc = NamespaceClient.getBeaker(sessionId);
    System.load(tempDirectory + "/libCRun.jnilib");
  }

  public static Object beakerGet(String name) {
    Object ret = nc.get(name);
    return ret;
  }

  public static int beakerSet(String name, Object value) {
    try {
      nc.set(name, value);
    } catch (ClientProtocolException ex) {
      logger.warn("Client Protocol Exception");
      return 0;
    } catch (IOException ex) {
      logger.warn("IOException!");
      return 0;
    }
    return 1;
  }

  public int execute(String mainCell, String type) {
    String tmpDir = System.getenv("beaker_tmp_dir");

    Object ret = cLoadAndRun(tmpDir + "/lib" + mainCell + ".so", type);

    try {
      FileOutputStream file = new FileOutputStream(tmpDir + "/" + mainCell + ".result");
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
}