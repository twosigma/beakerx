/*
 *  Copyright 2016 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.shared.servlet.rules;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.lang.String.format;
import static java.util.Arrays.asList;

public class CometdProxyRule extends ProxyRuleImpl {
  private static final String PATH_REGEX = ".*?/cometd-([^/]+)/.*?";
  private static final String PATH_WITHOUT_XSRF_REGEX = "/[a-f0-9]{7}/\\w{0,10}\\.\\d+/cometd/.*?";
  private String authToken;
  private final String hash;
  private final String corePort;

  public CometdProxyRule(String authToken, String _hash, String corePort) {
    super(asList(PATH_REGEX, PATH_WITHOUT_XSRF_REGEX));
    this.authToken = authToken;
    this.hash = _hash;
    this.corePort = corePort;
  }

  @Override
  protected String replace(String url) {
    Matcher matcher = Pattern.compile("(wss?://)[^:]+:(\\d+)/(.*?)cometd-([^/]+)/(.*?)").matcher(url);
    if (matcher.matches()) {
//      String schema = matcher.group(1);
      String schema = "ws://";
      String port = matcher.group(2);
      String prefix = matcher.group(3);
      if (prefix.startsWith(this.hash)) {
        port = String.valueOf(this.corePort);
      }
      return schema + "127.0.0.1:" + port + "/cometd/" + matcher.group(5);
    }
    return url;
  }

  @Override
  public boolean satisfy(HttpServletRequest request) {
    boolean satisfy = super.satisfy(request);
    if (satisfy) {
      Matcher matcher = Pattern.compile(PATH_REGEX).matcher(request.getPathInfo());
      if (matcher.matches() && !matcher.group(1).equals(this.authToken)) {
        throw new RuntimeException(format("Invalid auth token %s", matcher.group(1)));
      }
    }
    return satisfy;
  }
}
