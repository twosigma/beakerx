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

package com.twosigma.beakerx.doclet;

import com.sun.source.doctree.DocCommentTree;
import com.sun.source.util.DocTrees;
import jdk.javadoc.doclet.DocletEnvironment;
import jdk.javadoc.doclet.StandardDoclet;

import javax.lang.model.element.Element;
import javax.lang.model.element.ElementKind;
import javax.lang.model.element.ExecutableElement;
import javax.lang.model.element.Modifier;
import javax.lang.model.element.TypeElement;
import javax.lang.model.element.VariableElement;
import javax.lang.model.util.ElementFilter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class BeakerxDoclet extends StandardDoclet {

  @Override
  public boolean run(DocletEnvironment docEnv) {
    HashMap<String, ClassInspect> inspects = new HashMap<>();
    DocTrees docTrees = docEnv.getDocTrees();
    for (TypeElement t : ElementFilter.typesIn(docEnv.getIncludedElements())) {
      DocCommentTree docCommentTree = docTrees.getDocCommentTree(t);
      String comment = (docCommentTree != null) ? docCommentTree.getFullBody().toString() : "";
      ClassInspect classInspect = new ClassInspect(t.getSimpleName().toString(), t.getQualifiedName().toString(), comment);
      inspects.put(classInspect.getFullName(), classInspect);
      List<MethodInspect> constructors = new ArrayList<>();
      List<MethodInspect> methods = new ArrayList<>();
      for (Element ee : t.getEnclosedElements()) {
        if (ee.getModifiers().contains(Modifier.PUBLIC) || ee.getModifiers().contains(Modifier.PROTECTED)) {
          if (ee.getKind().equals(ElementKind.CONSTRUCTOR)) {
            constructors.add(getInspect(ee, docTrees));
          } else if (ee.getKind().equals(ElementKind.METHOD)) {
            methods.add(getInspect(ee, docTrees));
          }
        }
      }
      classInspect.setMethods(methods);
      classInspect.setConstructors(constructors);
    }
    SerializeInspect serializeInspect = new SerializeInspect();
    String json = serializeInspect.toJson(inspects);
    serializeInspect.saveToFile(json);
    return true;
  }

  private static MethodInspect getInspect(Element element, DocTrees docTrees) {
    DocCommentTree eeDocComment = docTrees.getDocCommentTree(element);
    List<String> signature = new ArrayList<>();
    if (element instanceof ExecutableElement) {
      ExecutableElement eElement = (ExecutableElement) element;
      for (VariableElement v : eElement.getParameters()) {
        String n = v.asType().toString();
        if (v.asType().toString().contains("<")) {
          n = v.asType().toString().substring(0, v.asType().toString().indexOf("<"));
        }
        signature.add(n + " " + v.getSimpleName());
      }
    }
    String comment = (eeDocComment != null) ? eeDocComment.getFullBody().toString() : "";
    String name = element.toString().subSequence(0, element.toString().indexOf("(")).toString();
    MethodInspect methodInspect = new MethodInspect(name, comment, String.join(", ", signature));
    return methodInspect;
  }
}
