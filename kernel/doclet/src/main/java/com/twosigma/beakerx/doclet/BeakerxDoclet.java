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

import com.sun.javadoc.ClassDoc;
import com.sun.javadoc.ExecutableMemberDoc;
import com.sun.javadoc.Parameter;
import com.sun.javadoc.RootDoc;
import com.sun.tools.doclets.standard.Standard;
import com.sun.tools.javadoc.ClassDocImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class BeakerxDoclet extends Standard {
    public static boolean start(RootDoc root) {
        //iterate over all classes.
        HashMap<String, ClassInspect> inspects = new HashMap<>(root.classes().length);
        ClassDoc[] classes = root.classes();

        for (ClassDoc classDoc : classes) {
            ClassInspect classInspect = new ClassInspect(classDoc.name(), ((ClassDocImpl) classDoc).type.toString(), classDoc.commentText());
            inspects.put(classInspect.getFullName(), classInspect);
            classInspect.setMethods(getInspects(classDoc.methods()));
            classInspect.setConstructors(getInspects(classDoc.constructors()));
        }

        SerializeInspect serializeInspect = new SerializeInspect();
        String json = serializeInspect.toJson(inspects);
        serializeInspect.saveToFile(json);
        return true;
    }

    private static List<MethodInspect> getInspects(ExecutableMemberDoc[] memberDocs) {
        List<MethodInspect> methodInspects = new ArrayList<>(memberDocs.length);
        for (ExecutableMemberDoc memberDoc : memberDocs) {
            List<String> signature = new ArrayList<>();
            for (Parameter parameter : memberDoc.parameters()) {
                signature.add(parameter.type().qualifiedTypeName() + " " + parameter.name());
            }
            MethodInspect methodInspect = new MethodInspect(memberDoc.name(), memberDoc.getRawCommentText(),
                    String.join(", ", signature));
            methodInspects.add(methodInspect);
        }
        return methodInspects;
    }
}
