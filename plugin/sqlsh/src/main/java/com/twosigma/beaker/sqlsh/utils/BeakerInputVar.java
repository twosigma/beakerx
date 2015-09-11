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
package com.twosigma.beaker.sqlsh.utils;

public class BeakerInputVar {
    String fieldName;
    String objectName;
    String type;
    boolean array;
    boolean object;
    boolean all;
    int index;

    public BeakerInputVar(String var) {
        int a = var.indexOf('[');
        int b = var.indexOf(']');
        if (a > 0 && b > a) {
            array = true;
            objectName = var.substring(0, a);
            String index = var.substring(a + 1, b);
            if ("*".equals(index)) {
                all = true;
            } else {
                this.index = Integer.parseInt(index);
            }
        }
        int dot = var.indexOf('.');
        if (dot > 0) {
            object = true;
            fieldName = var.substring(dot + 1);
            if(objectName == null) {
                objectName = var.substring(0, dot);
            }
        }
        if(objectName == null) objectName = var;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isArray() {
        return array;
    }

    public void setArray(boolean array) {
        this.array = array;
    }

    public boolean isObject() {
        return object;
    }

    public void setObject(boolean object) {
        this.object = object;
    }

    public boolean isAll() {
        return all;
    }

    public void setAll(boolean all) {
        this.all = all;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public String getObjectName() {
        return objectName;
    }

    public void setObjectName(String objectName) {
        this.objectName = objectName;
    }
}
