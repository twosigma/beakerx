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

import com.twosigma.beakerx.groovy.autocomplete.GroovyAutocomplete;
import com.twosigma.beakerx.groovy.autocomplete.GroovyClasspathScanner;
import com.twosigma.beakerx.inspect.InspectResult;
import com.twosigma.beakerx.kernel.Imports;
import com.twosigma.beakerx.widgets.BeakerxWidget;
import groovy.lang.GroovyClassLoader;
import org.apache.commons.io.IOUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;

public class GroovyInspect extends GroovyAutocomplete {

    public static final String INSPECT_DATA_FILENAME = "beakerx_inspect.json";

    public GroovyInspect(GroovyClasspathScanner _cps) {
        super(_cps);
    }

    public InspectResult doInspect(String code, int caretPosition, GroovyClassLoader groovyClassLoader, Imports imports) {
        InspectResult inspectResult = new InspectResult();
        String row = CodeParsingTool.getLineWithCursor(code, caretPosition);
        String methodName = CodeParsingTool.getSelectedMethodName(code, caretPosition);
        String className = CodeParsingTool.getClassName(row, code, caretPosition, methodName);
        try (InputStream inputStream = new FileInputStream(getInspectFile())) {
            String inspectData = IOUtils.toString(inputStream, "UTF-8");
            inspectResult = getInspectResult(caretPosition, methodName, className, inspectData);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return inspectResult;
    }

    private File getInspectFile(){
        Path workingDirectory = null;
        try {
            workingDirectory= Paths.get(
                    BeakerxWidget.class.getProtectionDomain().getCodeSource().getLocation().toURI().getPath()
            ).getParent().getParent().getParent();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        return new File(workingDirectory.toFile(), INSPECT_DATA_FILENAME);
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
            inspectResult = new InspectResult(classInspect.fullName + "\n" + classInspect.getJavadoc(), caretPosition);
        } else {
            List<MethodInspect> methodInspectsList = classInspect == null ? null : classInspect.getMethods();
            if (methodInspectsList == null) {
                return new InspectResult();
            }
            for (MethodInspect methodInspect : methodInspectsList) {
                if (methodInspect.getMethodName().equals(methodName)) {
                    return new InspectResult(methodInspect.getSignature() + "\n" + methodInspect.getJavadoc(), caretPosition);
                }
            }
        }
        return inspectResult;
    }
}
