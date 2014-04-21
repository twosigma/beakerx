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

import com.google.inject.Inject;
import com.google.inject.Singleton;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.List;
import java.util.concurrent.LinkedBlockingDeque;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.map.ObjectMapper;
import org.cometd.annotation.Listener;
import org.cometd.annotation.Service;
import org.cometd.bayeux.server.BayeuxServer;
import org.cometd.bayeux.server.LocalSession;
import org.cometd.bayeux.server.ServerChannel;
import org.cometd.bayeux.server.ServerMessage;
import org.cometd.bayeux.server.ServerSession;

/**
 * The OutputLogService is the central manager for aggregating stdout and stderr from all
 * evaluators.
 */
@Service
@Singleton
public class OutputLogService {

  private BayeuxServer bayeux;
  private LocalSession localSession;
  private volatile Deque<OutputLine> log = new LinkedBlockingDeque<>();
  private ObjectMapper mapper = new ObjectMapper();

  @Inject
  public OutputLogService(BayeuxServer bayeuxServer) {
    this.bayeux = bayeuxServer;
    this.localSession = bayeuxServer.newLocalSession(getClass().getCanonicalName());
    this.localSession.handshake();
  }

  @Listener("/service/outputlog/get")
  public void ProcessGet(ServerSession session, ServerMessage msg) {
    // dump the whole log & subscribe to further updates?  unclear
    // how to avoid race conditions - maybe have clients complete
    // subscription before requesting the history, then removing
    // dups
  }

  public void serverPut(OutputLine line) {
    this.log.add(line);
    ServerChannel channel = this.bayeux.getChannel("/outputlog");
    if (channel != null) {
      channel.publish(this.localSession, line, null);
    }
  }

  @Listener("/service/outputlog/put")
  public void processPut(ServerSession session, ServerMessage msg)
          throws IOException {
    String line = String.valueOf(msg.getData());
    OutputLine outputLine = this.mapper.readValue(line, OutputLine.class);
    serverPut(outputLine);
  }

  public List<OutputLine> getLog() {
    return new ArrayList<>(this.log);
  }

  public void clear() {
    this.log = new LinkedBlockingDeque<>();
  }

  // Would be nice to record a timestamp too.
  @JsonAutoDetect
  public static class OutputLine {

    private String evaluator;
    private String type; // stdout, or stderr
    private String line; // the business

    public String getEvaluator() {
      return this.evaluator;
    }

    public String getType() {
      return this.type;
    }

    public String getLine() {
      return this.line;
    }

    public void setEvaluator(String s) {
      this.evaluator = s;
    }

    public void setType(String s) {
      this.type = s;
    }

    public void setLine(String s) {
      this.line = s;
    }

    public OutputLine() {
    }

    public OutputLine(String evaluator, String type, String line) {
      this.evaluator = evaluator;
      this.type = type;
      this.line = line;
    }
  }
}
