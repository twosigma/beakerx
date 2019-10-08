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
package com.twosigma.beakerx.sql;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import com.twosigma.beakerx.util.BeakerXSystem;
import com.twosigma.beakerx.util.BeakerXSystemImpl;

public class QueryParser {

  private static BeakerXSystem beakerXSystem = BeakerXSystemImpl.getINSTANCE();
  private static String rd = beakerXSystem.getenv("REMOVE_DASH_LINECOMMENT");
  private static boolean REMOVE_DASH_LINECOMMENT = (rd==null) || (rd.equals("true"));

  private static final List<ParsingState> PARSING_STATES = Arrays.asList(
      new ParsingState("'", "'", false), // string literal
      new ParsingState("/*", "*/", true),
      new LineCommentParsingState("--"),
      new LineCommentParsingState("%%")
  );


  public static List<String> split(String script) {

    StringBuilder sb = new StringBuilder(script);

    ParsingState currentState = null;
    int stateStart = -1;
    for(int i = 0; i < sb.length();) {
      if (currentState != null) {
        if (currentState.isEnd(sb, i)) {
          if (currentState.mustBeDeleted()) {
            int stateEnd = currentState.skipEnd(i);
            sb = new StringBuilder().append(sb.substring(0, stateStart)).append(sb.substring(stateEnd));
            i = stateStart;
          } else {
            i = currentState.skipEnd(i);
          }
          currentState = null;
        } else {
          i++;
        }
      } else {
        ParsingState state = getSuitableState(sb, i);
        if (state != null) {
          currentState = state;
          stateStart = i;
          i = state.skipStart(i);
        } else {
          i++;
        }
      }
    }

    //ToDo replace to custom splitter - need for ignore 'xx;yy' etc.
    String[] splittedQueries = sb.toString().split(";");
    List<String> listOfQueries = new ArrayList<>();

    for (int i = 0; i < splittedQueries.length; i++) {
      if (!splittedQueries[i].trim().equals("") && !splittedQueries[i].trim().equals("\t")) {
        listOfQueries.add(splittedQueries[i].trim());
      }
    }
    return listOfQueries;
  }

  private static ParsingState getSuitableState(StringBuilder line, int index) {
    for (ParsingState eachState : PARSING_STATES) {
      if (eachState.isStart(line, index)) {
        return eachState;
      }
    }
    return null;
  }

  private static class LineCommentParsingState extends ParsingState {

    public LineCommentParsingState(String start) {
      super(start, "\n", REMOVE_DASH_LINECOMMENT);
    }
  }

  private static class ParsingState {
    private String start;
    private String end;
    private boolean mustBeDeleted;

    public ParsingState(String start, String end, boolean mustBeDeleted) {
      this.start = start;
      this.end = end;
      this.mustBeDeleted = mustBeDeleted;
    }

    public boolean isStart(StringBuilder line, int index) {
      return isAtPosition(line, index, start);
    }

    public int skipStart(int index) {
      return index + start.length();
    }

    public boolean isEnd(StringBuilder line, int index) {
      return isAtPosition(line, index, end);
    }

    public int skipEnd(int index) {
      return index + end.length();
    }

    private boolean isAtPosition(StringBuilder line, int index, String element) {
      int endIndex = index + element.length();
      return line.length() >= endIndex &&
          line.substring(index, endIndex).equals(element);
    }

    public boolean mustBeDeleted() {
      return mustBeDeleted;
    }
  }
}
