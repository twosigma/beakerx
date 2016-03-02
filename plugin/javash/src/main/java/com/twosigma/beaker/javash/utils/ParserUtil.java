/*
 * Copyright (C) 2007-2010 Júlio Vilmar Gesser.
 * Copyright (C) 2011, 2013-2015 The JavaParser Team.
 *
 * This file is part of JavaParser.
 * 
 * JavaParser can be used either under the terms of
 * a) the GNU Lesser General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 * b) the terms of the Apache License 
 *
 * You should have received a copy of both licenses in LICENCE.LGPL and
 * LICENCE.APACHE. Please refer to those files for details.
 *
 * JavaParser is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 */

package com.twosigma.beaker.javash.utils;


import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.text.translate.*;

import java.util.Deque;
import java.util.LinkedList;

/**
 * Idea from https://github.com/javaparser/javaparser
 */
public class ParserUtil {

  public static final CharSequenceTranslator UNICODE_UNESCAPER = new AggregateTranslator(new UnicodeUnescaper());

  private enum State {
    CODE,
    CAN_BE_COMMENT_START,
    IN_LINE_COMMENT,
    IN_BLOCK_COMMENT,
    IN_STRING,
    IN_CHAR
  }


  /**
   * Track the internal state of the parser, remembering the last characters observed.
   */
  static class ParserState {
    private Deque prevTwoChars = new LinkedList<Character>();

    /**
     * Is the last character the one expected?
     */
    boolean isLastChar(char expectedChar) {
      return prevTwoChars.size() >= 1 && prevTwoChars.peekLast().equals(expectedChar);
    }

    /**
     * Is the character before the last one the same as expectedChar?
     */
    public boolean isSecondToLastChar(char expectedChar) {
      return prevTwoChars.size() >= 1 && prevTwoChars.peekFirst().equals(expectedChar);
    }

    /**
     * Record a new character. It will be the last one. The character that was the last one will
     * become the second to last one.
     */
    public void update(char c) {
      if (prevTwoChars.size() == 2) {
        prevTwoChars.remove();
      }
      prevTwoChars.add(c);
    }

    /**
     * Remove all the characters observed.
     */
    public void reset() {
      while (!prevTwoChars.isEmpty()) {
        prevTwoChars.removeFirst();
      }
    }
  }

  public static String removeComments(String javaCode) {
    ParserState parserState = new ParserState();
    State state = State.CODE;
    StringBuffer inBlock = null;
    StringBuilder builder = new StringBuilder();

    for (int i = 0; i < javaCode.length(); i++) {
      char c = javaCode.charAt(i);
      switch (state) {
        case CODE:
          if (!parserState.isLastChar('/') && c == '/') {
            state = State.CAN_BE_COMMENT_START;
          } else if (c == '"') {
            state = State.IN_STRING;
            builder.append(c);
          } else if (c == '\'') {
            state = State.IN_CHAR;
            builder.append(c);
          } else {
            builder.append(c);
          }
          break;
        case CAN_BE_COMMENT_START:
          if (parserState.isLastChar('/') && c == '/') {
            state = State.IN_LINE_COMMENT;
          } else if (parserState.isLastChar('/') && c == '*') {
            state = State.IN_BLOCK_COMMENT;
            inBlock = new StringBuffer();
          }
          break;
        case IN_LINE_COMMENT:
          if (c == '\n' || c == '\r') {
            state = State.CODE;
          }
          break;
        case IN_BLOCK_COMMENT:
          // '/*/' is not a valid block comment: it starts the block comment but it does not close it
          // However this sequence can be contained inside a comment and in that case it close the comment
          // For example:
          // /* blah blah /*/
          // At the previous line we had a valid block comment
          assert inBlock != null;
          if (parserState.isLastChar('*') && c == '/' && (!parserState.isSecondToLastChar('/')
            || inBlock.length() > 0)) {
            state = State.CODE;
          } else {
            inBlock.append(c == '\r' ? '\n' : c);
          }
          break;
        case IN_STRING:
          if (!parserState.isLastChar('\\') && c == '"') {
            state = State.CODE;
          }
          builder.append(c);
          break;
        case IN_CHAR:
          if (!parserState.isLastChar('\\') && c == '\'') {
            state = State.CODE;
          }
          builder.append(c);
          break;
        default:
          throw new RuntimeException("Unexpected");
      }


      // ok we have two slashes in a row inside a string
      // we want to replace them with... anything else, to not confuse
      // the parser
      if (state == State.IN_STRING && parserState.isLastChar('\\') && c == '\\') {
        parserState.reset();
      } else {
        parserState.update(c);
      }
    }


    return builder.toString();
  }

  /*
     * This function does:
     * 1) remove comments
     * 2) ensure we have a cr after each ';' (if not inside double quotes or single quotes)
     * 3) remove empty lines
     */
  public static String normalizeCode(String code) {
    String c1 = ParserUtil.removeComments(UNICODE_UNESCAPER.translate(code));
    StringBuilder c2 = new StringBuilder();
    boolean indq = false;
    boolean insq = false;
    for (int i = 0; i < c1.length(); i++) {
      char c = c1.charAt(i);
      switch (c) {
        case '"':
          if (!insq && i > 0 && c1.charAt(i - 1) != '\\')
            indq = !indq;
          break;
        case '\'':
          if (!indq && i > 0 && c1.charAt(i - 1) != '\\')
            insq = !insq;
          break;
        case ';':
          if (!indq && !insq) {
            c2.append(c);
            c = '\n';
          }
          break;
      }
      c2.append(c);
    }

    return c2.toString().replaceAll("\n\n+", "\n").trim();
  }

}