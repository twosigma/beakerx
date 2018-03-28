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
package com.twosigma.beakerx.kernel;

import com.twosigma.beakerx.util.ClassPath;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static com.twosigma.beakerx.util.Preconditions.checkNotNull;
import static com.twosigma.beakerx.kernel.AddImportStatus.ADDED;
import static com.twosigma.beakerx.kernel.AddImportStatus.EXISTS;

public class Imports {

  private List<ImportPath> imports;
  private List<String> importsAsStrings = null;

  public Imports(List<ImportPath> importPaths) {
    this.imports = checkNotNull(importPaths);
  }

  public List<ImportPath> getImportPaths() {
    return imports;
  }

  public AddImportStatus add(ImportPath anImport, ClassLoader classLoader) {
    checkNotNull(anImport);
    if (this.imports.contains(anImport)) {
      return EXISTS;
    }
    if (!isImportPathValid(anImport, classLoader)) {
      return AddImportStatus.ERROR;
    }
    clear();
    this.imports.add(anImport);
    return ADDED;
  }

  public boolean remove(ImportPath anImport) {
    checkNotNull(anImport);
    if (this.imports.contains(anImport)) {
      clear();
      return this.imports.remove(anImport);
    }
    return false;
  }

  public boolean isEmpty() {
    return imports.isEmpty();
  }

  public List<String> toListOfStrings() {
    if (importsAsStrings == null) {
      this.importsAsStrings = importsToStrings();
    }
    return this.importsAsStrings;
  }

  private List<String> importsToStrings() {
    List<String> importsAsStrings = new ArrayList<>();
    for (ImportPath st : getImportPaths()) {
      importsAsStrings.add(st.asString());
    }
    return importsAsStrings;
  }

  private void clear() {
    this.importsAsStrings = null;
  }

  @Override
  public String toString() {
    return imports.stream().map(ImportPath::asString).collect(Collectors.joining("\n"));
  }

  private boolean isImportPathValid(ImportPath anImport, ClassLoader classLoader) {
    if (anImport.isStatic()) {
      return isValidStaticImport(anImport, classLoader);
    } else {
      return isValidImport(anImport, classLoader);
    }
  }

  private boolean isValidStaticImport(ImportPath anImport, ClassLoader classLoader) {
    String importToCheck = anImport.path();
    if (!importToCheck.contains(".")) {
      return false;
    }
    if (importToCheck.endsWith(".*")) {
      return isValidStaticImportWithWildcard(classLoader, importToCheck);
    } else {
      return isValidStatic(classLoader, importToCheck);
    }
  }

  private boolean isValidImport(ImportPath anImport, ClassLoader classLoader) {
    String importToCheck = anImport.path();
    if (importToCheck.endsWith(".*")) {
      return isValidImportWithWildcard(importToCheck, classLoader);
    } else {
      return isValidClassImport(importToCheck, classLoader);
    }
  }

  private boolean isValidStaticImportWithWildcard(ClassLoader classLoader, String importToCheck) {
    String classImport = importToCheck.substring(0, importToCheck.lastIndexOf("."));
    return isValidClassImport(classImport, classLoader);
  }

  private boolean isValidStatic(ClassLoader classLoader, String importToCheck) {
    String packageImport = importToCheck.substring(0, importToCheck.lastIndexOf("."));
    boolean validClassImport = isValidClassImport(packageImport, classLoader);
    if (validClassImport) {
      String methodOrName = importToCheck.substring(importToCheck.lastIndexOf("."), importToCheck.length()).replaceFirst(".", "");
      if (methodOrName.isEmpty()) {
        return false;
      }
      try {
        Class<?> aClass = classLoader.loadClass(packageImport);
        List<Method> methods = getMethods(methodOrName, aClass);
        if (!methods.isEmpty()) {
          return true;
        }
        List<Field> fields = getFields(methodOrName, aClass);
        return !fields.isEmpty();
      } catch (ClassNotFoundException e) {
        return false;
      }
    }
    return false;
  }

  private List<Field> getFields(String methodOrName, Class<?> aClass) {
    Field[] publicFields = aClass.getFields();
    return Arrays.stream(publicFields).filter(x -> x.getName().equals(methodOrName)).collect(Collectors.toList());
  }

  private List<Method> getMethods(String methodOrName, Class<?> aClass) {
    Method[] publicMethods = aClass.getMethods();
    return Arrays.stream(publicMethods).filter(x -> x.getName().equals(methodOrName)).collect(Collectors.toList());
  }

  private boolean isValidClassImport(String importToCheck, ClassLoader classLoader) {
    try {
      classLoader.loadClass(importToCheck);
      return true;
    } catch (ClassNotFoundException e) {
      return false;
    }
  }

  private boolean isValidImportWithWildcard(String importToCheck, ClassLoader classLoader) {
    try {
      String packageWithoutWildcard = importToCheck.substring(0, importToCheck.lastIndexOf("."));
      return ClassPath.from(classLoader).packageExists(packageWithoutWildcard);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }
}
