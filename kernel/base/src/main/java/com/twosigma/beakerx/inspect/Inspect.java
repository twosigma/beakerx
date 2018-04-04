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

package com.twosigma.beakerx.inspect;

import com.twosigma.beakerx.kernel.Imports;
import com.twosigma.beakerx.widget.BeakerxWidget;
import org.apache.commons.io.IOUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.net.URLClassLoader;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;


public class Inspect {

    private static final String COLOR_RED = "\u001B[31m";
    private static final String COLOR_RESET = "\033[0m";

    private static String inspectDataPath = "beakerx_inspect.json";

    public InspectResult doInspect(String code, int caretPosition, URLClassLoader classLoader, Imports imports) {
        InspectResult inspectResult = new InspectResult();
        if (code.length() >= caretPosition) {
            String methodName = CodeParsingTool.getSelectedMethodName(code, caretPosition);
            String className = CodeParsingTool.getClassName(code, caretPosition, methodName);
            try (InputStream inputStream = new FileInputStream(getInspectFile())) {
                String inspectData = IOUtils.toString(inputStream, "UTF-8");
                inspectResult = getInspectResult(caretPosition, methodName, className, inspectData);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return inspectResult;
    }

    private File getInspectFile(){
        Path workingDirectory = null;
        try {
            workingDirectory= Paths.get(
                    BeakerxWidget.class.getProtectionDomain().getCodeSource().getLocation().toURI()
            ).getParent().getParent();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        return new File(workingDirectory.toFile(), inspectDataPath);
    }

    private InspectResult getInspectResult(int caretPosition, String methodName, String className, String everything) {
        HashMap<String, ClassInspect> stringClassInspectHashMap = new SerializeInspect().fromJson(everything);
        InspectResult inspectResult = new InspectResult();
        ClassInspect classInspect = null;
        if (stringClassInspectHashMap.containsKey(className)) {
            classInspect = stringClassInspectHashMap.get(className);
        } else {
            for (ClassInspect cls : stringClassInspectHashMap.values()) {
                if (cls.getClassName().equals(className)) {
                    classInspect = cls;
                    break;
                }
            }
        }
        if (methodName == null && classInspect != null) {
            List<MethodInspect> constructors = classInspect.getConstructors();
            String classInfo = parseClassInfo(classInspect) + "\n\n" + parseMethodsInfo(constructors, "");
            inspectResult = new InspectResult(classInfo, caretPosition);
        } else {
            List<MethodInspect> methodInspectsList = classInspect == null ? null : classInspect.getMethods();
            if (methodInspectsList == null) {
                return new InspectResult();
            }
            List<MethodInspect> methods = methodInspectsList.stream()
                    .filter(m -> m.getMethodName().equals(methodName))
                    .collect(Collectors.toList());
            if (!methods.isEmpty()) {
                return new InspectResult(parseMethodsInfo(methods, className), caretPosition);
            }
        }
        return inspectResult;
    }

    private String parseClassInfo(ClassInspect classInspect) {
        return COLOR_RED + "Class: " + COLOR_RESET + classInspect.fullName + "\n"
                + COLOR_RED + "JavaDoc: " + (classInspect.getJavadoc().equals("")
                ? "<no JavaDoc>" : COLOR_RESET + classInspect.getJavadoc());
    }

    public static void setInspectFileName(String inspectDataPath) {
        Inspect.inspectDataPath = inspectDataPath;
    }

    public String parseMethodsInfo(List<MethodInspect> methods, String className) {
        if (methods == null) {
            return "";
        }
        String parsedMethods = methods.stream()
                .map(m ->
                        COLOR_RED + "Signature: " + COLOR_RESET + className + (className.equals("") ? "" : ".")
                                + m.getMethodName() + "(" + m.getSignature() + ")" + "\n" + COLOR_RED + "JavaDoc: " +
                                (m.getJavadoc().equals("") ? "<no JavaDoc>" : COLOR_RESET + m.getJavadoc()))
                .collect(Collectors.joining("\n\n"));
        return parsedMethods;
    }
}

