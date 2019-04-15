/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.javash.autocomplete;

import com.twosigma.beakerx.autocomplete.AutocompleteCandidate;
import com.twosigma.beakerx.autocomplete.AutocompleteRegistry;
import com.twosigma.beakerx.autocomplete.ClassUtils;
import com.twosigma.beakerx.autocomplete.AutocompleteClasspathScanner;

import java.util.List;

public class AutocompleteRegistryFactory {

  public static AutocompleteRegistry createRegistry(AutocompleteClasspathScanner cps) {
    AutocompleteRegistry registry = AutocompleteRegistryFactory.create(JavaCompletionTypes.NUM_TYPES);
    for (String pkg : cps.getPackages()) {
      String[] pkgv = pkg.split("\\.");
      AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.PACKAGE_NAME, pkgv);
      registry.addCandidate(c);
      List<String> cls = cps.getClasses(pkg);
      if (cls != null && !cls.isEmpty()) {
        c = new AutocompleteCandidate(JavaCompletionTypes.FQ_TYPE, pkgv);
        AutocompleteCandidate l = c;
        while (l.hasChildren()) {
          l = l.getChildrens().get(0);
        }
        for (String cl : cls) {
          l.addChildren(new AutocompleteCandidate(JavaCompletionTypes.FQ_TYPE, cl));
        }
        registry.addCandidate(c);
      }
    }
    return registry;
  }


  private static AutocompleteRegistry create(int num) {
    AutocompleteRegistry registry = new AutocompleteRegistry(num);
    setup(registry);
    return registry;
  }

  private static void setup(AutocompleteRegistry r) {
    AutocompleteCandidate c;

    c = new AutocompleteCandidate(JavaCompletionTypes.INITIAL, "package");
    r.addCandidate(c);

    c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, "import");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, "public");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, "class");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, "abstract");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, "enum");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, "final");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, "interface");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, "private");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, "protected");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, "static");
    r.addCandidate(c);

    c = new AutocompleteCandidate(JavaCompletionTypes.CLASSLEVEL, "extends");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.CLASSLEVEL, "implements");
    r.addCandidate(c);

    c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "if");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "for");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "while");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "do");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "else");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "try");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "catch");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "switch");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "return");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "throw");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "break");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "continue");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "synchronized");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "finally");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "default");
    r.addCandidate(c);

    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "int");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "float");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "char");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "byte");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "void");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "boolean");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "short");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "long");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "double");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "Boolean");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "Byte");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "Character");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "Double");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "Float");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "Integer");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "Long");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "Math");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "Number");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "Object");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "Package");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "Process");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "ProcessBuilder");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "Runtime");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "RuntimePermission");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "SecurityManager");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "Short");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "StackTraceElement");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "StrictMath");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "String");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "StringBuffer");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "StringBuilder");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "System");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "Thread");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "ThreadGroup");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "Throwable");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "Void");
    r.addCandidate(c);

    c = new AutocompleteCandidate(JavaCompletionTypes.MEMBERDELC, "public");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.MEMBERDELC, "abstract");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.MEMBERDELC, "final");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.MEMBERDELC, "private");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.MEMBERDELC, "protected");
    r.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.MEMBERDELC, "static");
    r.addCandidate(c);

    c = new AutocompleteCandidate(JavaCompletionTypes.NEW, "new");
    r.addCandidate(c);
  }


  public static void setup(ClassUtils cu, AutocompleteRegistry registry) {
    cu.defineClassShortName("Boolean", "java.lang.Boolean");
    cu.defineClassShortName("Byte", "java.lang.Byte");
    cu.defineClassShortName("Character", "java.lang.Character");
    cu.defineClassShortName("Double", "java.lang.Double");
    cu.defineClassShortName("Float", "java.lang.Float");
    cu.defineClassShortName("Integer", "java.lang.Integer");
    cu.defineClassShortName("Long", "java.lang.Long");
    cu.defineClassShortName("Math", "java.lang.Math");
    cu.defineClassShortName("Number", "java.lang.Number");
    cu.defineClassShortName("Object", "java.lang.Object");
    cu.defineClassShortName("Package", "java.lang.Package");
    cu.defineClassShortName("Process", "java.lang.Process");
    cu.defineClassShortName("ProcessBuilder", "java.lang.ProcessBuilder");
    cu.defineClassShortName("Runtime", "java.lang.Runtime");
    cu.defineClassShortName("RuntimePermission", "java.lang.RuntimePermission");
    cu.defineClassShortName("SecurityManager", "java.lang.SecurityManager");
    cu.defineClassShortName("Short", "java.lang.Short");
    cu.defineClassShortName("StackTraceElement", "java.lang.StackTraceElement");
    cu.defineClassShortName("StrictMath", "java.lang.StrictMath");
    cu.defineClassShortName("String", "java.lang.String");
    cu.defineClassShortName("StringBuffer", "java.lang.StringBuffer");
    cu.defineClassShortName("StringBuilder", "java.lang.StringBuilder");
    cu.defineClassShortName("System", "java.lang.System");
    cu.defineClassShortName("Thread", "java.lang.Thread");
    cu.defineClassShortName("ThreadGroup", "java.lang.ThreadGroup");
    cu.defineClassShortName("Throwable", "java.lang.Throwable");
    cu.defineClassShortName("Void", "java.lang.Void");

    AutocompleteCandidate c;
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "Boolean");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "Byte");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "Character");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "Double");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "Exception");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "Float");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "Integer");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "Long");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "Number");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "Object");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "Package");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "Process");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "ProcessBuilder");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "Runtime");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "RuntimePermission");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "SecurityManager");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "Short");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "StackTraceElement");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "StrictMath");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "String");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "StringBuffer");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "StringBuilder");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "System");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "Thread");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "ThreadGroup");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "Throwable");
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.NAME, "Void");
    registry.addCandidate(c);

  }


  public static void addDefaultImports(ClassUtils cu,AutocompleteRegistry registry, List<String> imports, AutocompleteClasspathScanner cps) {
    for (String imp : imports) {
      // this imports using '*'
      if (imp.endsWith(".*")) {
        String st = imp.substring(0, imp.length() - 2);
        String[] txtv = st.split("\\.");
        AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.PACKAGE_NAME, txtv);
        registry.addCandidate(c);
        List<String> cls = cps.getClasses(st);
        if (cls != null) {
          c = new AutocompleteCandidate(JavaCompletionTypes.FQ_TYPE, txtv);
          AutocompleteCandidate l = c.findLeaf();
          for (String s : cls) {
            l.addChildren(new AutocompleteCandidate(JavaCompletionTypes.CUSTOM_TYPE, s));
            registry.addCandidate(new AutocompleteCandidate(JavaCompletionTypes.CUSTOM_TYPE, s));
            cu.defineClassShortName(s, st + "." + s);
          }
          registry.addCandidate(c);
        }
      } else {
        String[] txtv = imp.split("\\.");
        AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.PACKAGE_NAME, txtv, txtv.length - 1);
        registry.addCandidate(c);
        c = new AutocompleteCandidate(JavaCompletionTypes.FQ_TYPE, txtv);
        registry.addCandidate(c);
        c = new AutocompleteCandidate(JavaCompletionTypes.CUSTOM_TYPE, txtv[txtv.length - 1]);
        registry.addCandidate(c);
        cu.defineClassShortName(txtv[txtv.length - 1], imp);
      }
    }
  }

  public static void createImportAutocompleteCandidate(ClassUtils cu, AutocompleteRegistry registry, String imp) {
    String[] txtv = imp.split("\\.");
    AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.PACKAGE_NAME, txtv, txtv.length - 1);
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.FQ_TYPE, txtv);
    registry.addCandidate(c);
    c = new AutocompleteCandidate(JavaCompletionTypes.CUSTOM_TYPE, txtv[txtv.length - 1]);
    registry.addCandidate(c);
    cu.defineClassShortName(txtv[txtv.length - 1], imp);
  }

}
