/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *import static org.assertj.core.api.Assertions.assertThat;
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.twosigma.beakerx.groovy.inspect;

import java.util.ArrayList;
import java.util.List;

public class CodeParsingTool {

    private CodeParsingTool(){}

    public static int getCaretPositionInLine(String code, int caretPosition) {
        String leftPart = code.substring(0, caretPosition);
        int begOfLine = leftPart.lastIndexOf(System.lineSeparator());
        return caretPosition - begOfLine - 1;
    }

    public static String getLineWithCursor(String code, int caretPosition) {
        String[] lines = code.split(System.lineSeparator());
        int charSum = 0;
        String row = "";
        for (String line : lines) {
            charSum += line.length() + System.lineSeparator().length();
            if (charSum > caretPosition) {
                row = line;
                break;
            }
        }
        return row;
    }

    public static String getSelectedMethodName(String code, int caretPosition) {
        String methodName = null;
        int pos = getCaretPositionInLine(code, caretPosition);
        String line = getLineWithCursor(code, caretPosition);
        String leftLine = line.substring(0, pos);
        String rightLine = line.substring(pos);
        int begOfMethod = leftLine.lastIndexOf(".");
        if (begOfMethod != -1) {
            String leftMethod = leftLine.substring(begOfMethod + 1);
            int begOfBracket = leftMethod.indexOf("(");
            if (begOfBracket != -1) {
                methodName = leftMethod.substring(0, begOfBracket);
            } else {
                begOfBracket = rightLine.indexOf("(");
                if (begOfBracket == -1) {
                    methodName = leftMethod + rightLine;
                } else {
                    methodName = leftMethod + rightLine.substring(0, begOfBracket);
                }
            }
        }
        return methodName;
    }

    public static String getClassName(String row, String code, int caretPosition, String methodName) {
        String inspectObject = getInspectObject(code, caretPosition, methodName);
        return getClassOfInspectObject(code, inspectObject);
    }

    public static String getInspectObject(String code, int caretPosition, String methodName) {
        String inspectObjectName;
        String line = getLineWithCursor(code, caretPosition);
        String lineToMethodName =
                methodName == null || line.indexOf(methodName) < 1 ?
                        line : line.substring(0, line.indexOf(methodName)- 1);
        String lineToClassName;
        if (lineToMethodName.charAt(lineToMethodName.length() - 1) == ')') {
            lineToClassName = removeLastBracket(lineToMethodName);
        } else {
            lineToClassName = lineToMethodName;
        }
        int lastSpacePos = lineToClassName.lastIndexOf(" ");
        if (lastSpacePos == -1) {
            inspectObjectName = lineToClassName;
        } else {
            inspectObjectName = lineToClassName.substring(lastSpacePos, lineToClassName.length());
        }
        if (inspectObjectName.contains(".")) {
            inspectObjectName = inspectObjectName.split("\\.")[0].trim();
        }
        return inspectObjectName.trim();
    }

    public static String getClassOfInspectObject(String code, String inspectObject) {
        String className = inspectObject;
        List<String> lines = getLinesWithPattern(code, inspectObject);
        for (String line : lines) {
            int posOfEq = line.indexOf("=");
            if (posOfEq != -1) {
                String lineBefEq = line.substring(0, posOfEq).trim();
                int begOfInspectObj = lineBefEq.lastIndexOf(" ") == -1 ? 0 : lineBefEq.lastIndexOf(" ");
                if (lineBefEq.substring(begOfInspectObj, lineBefEq.length()).equals(inspectObject)) {
                    String lineAftEq = line.substring(posOfEq).trim();
                    className = lineAftEq.substring(lineAftEq.indexOf("new") + 3, lineAftEq.indexOf("("));
                    break;
                }
            }

        }
        return className.trim();
    }

    private static String removeLastBracket(String lineToMethodName) {
        int i = lineToMethodName.length() - 1;
        int counter = 0;
        int lastBracketPos = 0;
        for (; i>0; i--) {
            char character = lineToMethodName.charAt(i);
            if (character == ')') {
                counter++;
            } else if (character == '(') {
                counter--;
            }
            if (counter == 0) {
                lastBracketPos = i;
                break;
            }
        }
        return lineToMethodName.substring(0, lastBracketPos);
    }

    private static List<String> getLinesWithPattern(String code, String pattern) {
        String[] lines = code.split(System.lineSeparator());
        List<String> linesWithPattern = new ArrayList<>();
        for (String line : lines) {
            if (line.trim().contains(pattern)) {
                linesWithPattern.add(line);
            }
        }
        return linesWithPattern;
    }
}
