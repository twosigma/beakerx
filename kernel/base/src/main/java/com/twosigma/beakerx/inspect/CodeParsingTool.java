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
package com.twosigma.beakerx.inspect;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class CodeParsingTool {

    private CodeParsingTool(){}

    public static int getCaretPositionInLine(String code, int caretPosition) {
        int begOfLine = code.substring(0, caretPosition).lastIndexOf(System.lineSeparator());
        return caretPosition - begOfLine - 1;
    }

    public static String getLineWithCursor(String code, int caretPosition) {
        int begOfLine = lastIndexOrZero(code.substring(0, caretPosition), System.lineSeparator());
        int endOfLine = firstIndexOrLength(code.substring(caretPosition), System.lineSeparator());
        return code.substring(begOfLine, endOfLine + caretPosition).trim();
    }

    private static int lastIndexOrZero(String string, String pattern) {
        return string.lastIndexOf(pattern) == -1 ? 0 : string.lastIndexOf(pattern);
    }

    private static int firstIndexOrLength(String string, String pattern) {
        return string.indexOf(pattern) == -1 ? string.length() : string.indexOf(pattern);
    }

    public static String getSelectedMethodName(String code, int caretPosition) {
        int pos = getCaretPositionInLine(code, caretPosition);
        String line = getLineWithCursor(code, caretPosition);
        int begOfMethod = lastIndexOrZero(line.substring(0, pos), ".");
        int bracketStart = firstIndexOrLength(line.substring(begOfMethod), "(");
        if (begOfMethod == 0) {
            return null;
        } else {
            return line.substring(begOfMethod + 1, begOfMethod + bracketStart);
        }
    }

    public static String getClassName(String code, int caretPosition, String methodName) {
        String inspectObject = getInspectObject(code, caretPosition, methodName);
        return getClassOfInspectObject(code, inspectObject);
    }

    public static String getInspectObject(String code, int caretPosition, String methodName) {
        String line = getLineWithCursor(code, caretPosition);
        if (methodName == null || line.indexOf(methodName) < 1) {
            return getClassInspectObject(code, caretPosition).trim();
        } else {
            return getMethodInspectObject(methodName, line).trim();
        }
    }

    private static String getMethodInspectObject(String methodName, String line) {
        String lineToMethodName = line.substring(0, line.indexOf(methodName)- 1);
        String lineToClassName = removeLastBracket(lineToMethodName);
        return lineToClassName
                .substring(lastIndexOrZero(lineToClassName, " "))
                .split("\\.")[0].trim();
    }


    private static String getClassInspectObject(String code, int caretPosition) {
        int caretPos = getCaretPositionInLine(code, caretPosition);
        String line = getLineWithCursor(code, caretPosition);
        int begOfClass = lastIndexOrZero(line.substring(0, caretPos), " ");
        int endOfClass = line.length();
        for (char endChar : Arrays.asList(' ', '(', '.')) {
            int index = line.substring(caretPos).indexOf(endChar);
            if (index != -1 && index + caretPos < endOfClass) {
                endOfClass = index + caretPos;
            }
        }
        return line.substring(begOfClass, endOfClass);
    }

    public static String getClassOfInspectObject(String code, String inspectObject) {
        Optional<String> inspect = getLinesWithPattern(code, inspectObject).stream()
                .filter(line -> line.indexOf("=") != -1)
                .map(line -> line.substring(line.indexOf(inspectObject)))
                .filter(line -> line.indexOf("new ") != -1 && line.indexOf("(") != -1)
                .map(line -> line.substring(line.indexOf("new ")+ 4, line.indexOf("(")))
                .findFirst();
        return inspect.orElse(inspectObject);
    }

    private static String removeLastBracket(String lineToMethodName) {
        int lastBracketPos = lineToMethodName.length();
        int i = lastBracketPos - 1;
        if (lineToMethodName.charAt(i) == ')') {
            for (int counter = 0; i>0; i--) {
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
        }
        return lineToMethodName.substring(0, lastBracketPos);
    }

    private static List<String> getLinesWithPattern(String code, String pattern) {
        return Arrays.stream(code.split(System.lineSeparator()))
                .filter(line -> line.trim().contains(pattern))
                .collect(Collectors.toList());
    }
}
