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

public class BeakerInputVar {
  String fieldName;
  String objectName;
  String type;
  boolean array;
  boolean object;
  boolean all;
  int index;
  String errorMessage;

  public BeakerInputVar(String var) {
    int a = var.indexOf('[');
    int b = var.indexOf(']');
    int dot = var.indexOf('.', b);

    if (a >= 0 && b > a) {
      if ((dot - b) > 1 || (dot < 1 && (var.length() - 1) > b)) {
        errorMessage = "expected token '.' after ']': " + var;
        return;
      }
      array = true;
      objectName = var.substring(0, a);
      String index = var.substring(a + 1, b);
      if (objectName.isEmpty()) {
        errorMessage = "unexpected token '[': " + var;
        return;
      }
      if (index.isEmpty()) {
        errorMessage = "index of array element should be defined: " + var;
        return;
      }
      if ("*".equals(index)) {
        all = true;
      } else {
        try {
          this.index = Integer.parseInt(index);
        } catch (NumberFormatException n) {
          errorMessage = "NumberFormatException in " + var + "; " + n.getMessage();
          return;
        }
      }
    } else if (a > b && b >=0) {
      errorMessage = "unexpected token ']': " + var;
      return;
    } else if (a >= 0) {
      errorMessage = "unexpected token '[': " + var;
      return;
    } else if (b >= 0) {
      errorMessage = "unexpected token ']': " + var;
      return;
    }


    if (dot > 0) {
      object = true;
      fieldName = var.substring(dot + 1);
      if (fieldName.isEmpty()) {
        errorMessage = "unexpected token '.': " + var;
        return;
      }
      if (objectName == null) {
        objectName = var.substring(0, dot);
      }
    }

    if (objectName == null) objectName = var;
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

  public String getErrorMessage() {
    return errorMessage;
  }

  public void setErrorMessage(String errorMessage) {
    this.errorMessage = errorMessage;
  }

}
