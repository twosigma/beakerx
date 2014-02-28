/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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
package com.twosigma.beaker.cometd;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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
 *
 * @author spot
 */
@Service
@Singleton
public class OutputLogService {

  private BayeuxServer _bayeux;
  private LocalSession _localSession;
  // not used? XXX
  private Set<ServerSession> _sessions =
          Collections.synchronizedSet(new HashSet<ServerSession>());
  // Synchronized? XXX
  public List<OutputLine> log = new ArrayList<OutputLine>();
  private ObjectMapper _mapper = new ObjectMapper();

  @Inject
  public OutputLogService(BayeuxServer bayeuxServer) {
    _bayeux = bayeuxServer;
    _localSession = bayeuxServer.newLocalSession(getClass().getCanonicalName());
    _localSession.handshake();
  }

  @Listener("/service/outputlog/get")
  public void ProcessGet(ServerSession session, ServerMessage msg) {
    // dump the whole log & subscribe to further updates?  unclear
    // how to avoid race conditions - maybe have clients complete
    // subscription before requesting the history, then removing
    // dups
  }

  public void serverPut(OutputLine line) {
    log.add(line);
    ServerChannel channel = _bayeux.getChannel("/outputlog");
    if (channel != null) {
      channel.publish(_localSession, line, null);
    }
  }

  @Listener("/service/outputlog/put")
  public void processPut(ServerSession session, ServerMessage msg)
          throws IOException {
    String line = String.valueOf(msg.getData());
    OutputLine outputLine = _mapper.readValue(line, OutputLine.class);
    serverPut(outputLine);
  }

  // Would be nice to record a timestamp too.
  @JsonAutoDetect
  public static class OutputLine {

    private String _evaluator;
    private String _type; // stdout, or stderr
    private String _line; // the business

    public String getEvaluator() {
      return _evaluator;
    }

    public String getType() {
      return _type;
    }

    public String getLine() {
      return _line;
    }

    public void setEvaluator(String s) {
      _evaluator = s;
    }

    public void setType(String s) {
      _type = s;
    }

    public void setLine(String s) {
      _line = s;
    }

    public OutputLine() {
    }

    public OutputLine(String evaluator, String type, String line) {
      _evaluator = evaluator;
      _type = type;
      _line = line;
    }
  }
}
