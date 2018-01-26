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

package com.twosigma.beakerx.groovy.inspect;

import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.groovy.autocomplete.*;
import com.twosigma.beakerx.inspect.InspectResult;
import com.twosigma.beakerx.kernel.Imports;
import groovy.lang.GroovyClassLoader;
import org.apache.commons.io.IOUtils;

import java.io.*;
import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static com.twosigma.beakerx.autocomplete.AutocompleteCandidate.EMPTY_NODE;

public class GroovyInspect extends GroovyAutocomplete {

    public GroovyInspect(GroovyClasspathScanner _cps) {
        super(_cps);
    }

    public InspectResult doInspect(String code, int caretPosition, GroovyClassLoader groovyClassLoader, Imports imports) {
        String row = getLineWithCursor(code, caretPosition);
        if (row.contains(".")) {
            AutocompleteResult methodMatch = this.doAutocomplete(code, caretPosition, groovyClassLoader, imports);
            if (methodMatch.getMatches().size() == 1) {
                String methodName = methodMatch.getMatches().get(0);
                String[] elements = splitByDot(row.trim());
                String objectInit = getLineWithPatttern(code, elements[0]);
                int lastindex = objectInit.lastIndexOf("(");
                String objectInit2 = objectInit.substring(0, lastindex);

                String className = objectInit2.substring(objectInit2.lastIndexOf("new") + 3).trim();

                ClassLoader classLoader = getClass().getClassLoader();

                try (InputStream inputStream = classLoader.getResourceAsStream("beakerx_inspect.json")) {
                    String everything = IOUtils.toString(inputStream);
                    SerializeInspect serializeInspect = new SerializeInspect();

                    return getInspectResult(caretPosition, methodName, className, everything, serializeInspect);

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        return new InspectResult();
    }

    private InspectResult getInspectResult(int caretPosition, String methodName, String className, String everything, SerializeInspect serializeInspect) {
        HashMap<String, ClassInspect> stringClassInspectHashMap = serializeInspect.fromJson(everything);
        List<MethodInspect> methodInspectsList = null;
        if (stringClassInspectHashMap.containsKey(className)) {
            methodInspectsList = stringClassInspectHashMap.get(className).getMethods();
        } else {
            for (ClassInspect classInspect : stringClassInspectHashMap.values()) {
                if (classInspect.getClassName().equals(className)) {
                    methodInspectsList = classInspect.getMethods();
                    break;
                }
            }
        }
        if (methodInspectsList == null) {
            return new InspectResult();
        }
        for (MethodInspect methodInspect : methodInspectsList) {
            if (methodInspect.getMethodName().equals(methodName)) {
                return new InspectResult(methodInspect.getSignature(), caretPosition);
            }
        }
        return new InspectResult();
    }


    private String getLineWithCursor(String code, int caretPosition) {
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

    private String getLineWithPatttern(String code, String pattern) {
        String[] lines = code.split(System.lineSeparator());
        for (String line : lines) {
            if (line.trim().contains(pattern)) {
                return line.trim();
            }
        }
        return "";
    }

    private String[] splitByDot(String t) {
        String[] txtv;
        if (t.endsWith(".")) {
            txtv = (t + "X").split("\\.");
            txtv[txtv.length - 1] = EMPTY_NODE;
        } else {
            txtv = (t).split("\\.");
        }
        return txtv;
    }
}
