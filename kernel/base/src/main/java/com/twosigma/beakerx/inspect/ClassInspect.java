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

import java.util.List;

public class ClassInspect {
    String className;
    String fullName;
    String javadoc;
    List<MethodInspect> methods;
    List<MethodInspect> constructors;

    public ClassInspect(String className, String fullName, String javadoc) {
        this.className = className;
        this.fullName = fullName;
        this.javadoc = javadoc;
    }

    public String getClassName() {
        return className;
    }

    public String getFullName() {
        return fullName;
    }

    public String getJavadoc() {
        return javadoc;
    }

    public List<MethodInspect> getMethods() {
        return methods;
    }

    public void setMethods(List<MethodInspect> methods) {
        this.methods = methods;
    }

    public List<MethodInspect> getConstructors() {
        return constructors;
    }

    public void setConstructors(List<MethodInspect> constructors) {
        this.constructors = constructors;
    }
}
