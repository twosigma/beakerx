/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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

import java.io.IOException;
import java.util.ArrayList;
import java.io.FileOutputStream;
import java.io.BufferedOutputStream;
import java.io.ObjectOutputStream;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.twosigma.beaker.NamespaceClient;
import org.apache.http.client.ClientProtocolException;

public class CppKernel {

  private static final Logger logger = Logger.getLogger(CppKernel.class.getName());

  public native void cInit(NamespaceClient nc);
  public native boolean cLoad(String fileName);
  public native Object cLoadAndRun(String fileName, String type);

  public static NamespaceClient nc;

  public CppKernel(String sessionId){
    nc = NamespaceClient.getBeaker(sessionId);
  }

  static {
    System.load(System.getProperty("user.dir") + "/lib/libCRun.jnilib");
  }

  public static Object beakerGet(String name) {
    Object ret = null;
    try {
      ret = nc.get(name);
    } catch (ClientProtocolException ex){
      logger.log(Level.WARNING, "Client Protocol Exception");
    } catch (IOException ex){
      logger.log(Level.WARNING, "IOException!");
    }
    return ret;
  }

  public static int beakerSet(String name, Object value) {
    try {
      nc.set(name, value);
    } catch (ClientProtocolException ex){
      logger.log(Level.WARNING, "Client Protocol Exception");
      return 0;
    } catch (IOException ex){
      logger.log(Level.WARNING, "IOException!");
      return 0;
    }
    return 1;
  }

  public int execute(String mainCell, String type, ArrayList<String> otherCells){
    String tmpDir = System.getenv("beaker_tmp_dir");

    for (String cell : otherCells){
      cLoad(tmpDir + "/lib" + cell + ".so");
    }

    Object ret = cLoadAndRun(tmpDir + "/lib" + mainCell + ".so", type);

    try {
      FileOutputStream file = new FileOutputStream(tmpDir + "/" + mainCell + ".result");
      BufferedOutputStream buffer = new BufferedOutputStream(file);
      ObjectOutputStream output = new ObjectOutputStream(buffer);
      output.writeObject(ret);
      output.close();
    } catch(IOException ex){
      logger.log(Level.WARNING, "Could not load file");
      return 1;
    }

    return 0;
  }
}