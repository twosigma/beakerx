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
package com.twosigma.beaker.core.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class BeakerPorts {

  private static final Logger logger = LoggerFactory.getLogger(BeakerPorts.class.getName());
  private static final String SEPARATOR = " ";

  private int portSearchStart;
  private Iterator<Integer> portFromEnv;
  private boolean usedEnvar;

  public BeakerPorts(final Integer portSearchStart) {
    this.portSearchStart = portSearchStart;
    this.usedEnvar = false;
    portFromEnv = initPortFromEnv();
  }

  public int getNextAvailablePort() {
    while (portFromEnv.hasNext()) {
      Integer nextPort = portFromEnv.next();
      if (isPortAvailable(nextPort)) {
        return nextPort;
      }
    }
    int port = getNextGeneratedAvailablePort(this.portSearchStart);
    this.portSearchStart = port + 1;
    if (usedEnvar) {
      logger.warn("ran out of ports in beaker_ports, dynamically allocated " + port);
    }
    return port;
  }

  private static int getNextGeneratedAvailablePort(int start) {
    final int SEARCH_LIMIT = 100;
    for (int p = start; p < start + SEARCH_LIMIT; ++p) {
      if (isPortAvailable(p)) {
        return p;
      }
    }
    throw new RuntimeException("out of ports error");
  }

  private static boolean isPortAvailable(int port) {
    ServerSocket ss = null;
    try {
      InetAddress address = InetAddress.getByName("127.0.0.1");
      ss = new ServerSocket(port, 1, address);
      // ss = new ServerSocket(port);
      ss.setReuseAddress(true);
      return true;
    } catch (IOException e) {
    } finally {
      if (ss != null) {
        try {
          ss.close();
        } catch (IOException e) {
          /* should not be thrown */
        }
      }
    }
    return false;
  }

  private Iterator<Integer> initPortFromEnv() {
    String beaker_ports = System.getenv("beaker_ports");
    List<Integer> ports = new ArrayList<>();
    usedEnvar = false;
    if (beaker_ports != null) {
      usedEnvar = true;
      for (String portStr : beaker_ports.split(SEPARATOR)) {
        try {
          int port = Integer.parseInt(portStr);
          ports.add(port);
        } catch (Exception ex) {
          logger.warn("warning: " + ex.toString());
        }
      }
    }
    return ports.iterator();
  }

}
