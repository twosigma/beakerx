/**
 * Copyright 2011 Adrian Witas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.abstractmeta.toolbox.compilation.compiler.registry.impl;


import org.abstractmeta.toolbox.compilation.compiler.registry.JavaFileObjectRegistry;

import javax.tools.JavaFileObject;
import java.net.URI;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Logger;

/**
 * Provides default implementation of JavaFileObjectRegistry.
 *
 * @author Adrian Witas
 */

public class JavaFileObjectRegistryImpl implements JavaFileObjectRegistry {

    private final Logger logger = Logger.getLogger(JavaFileObjectRegistryImpl.class.getName());
    private final Map<URI, JavaFileObject> javaFileObjects = new ConcurrentHashMap<URI, JavaFileObject>();

    @Override
    public void register(JavaFileObject fileObject) {
         this.javaFileObjects.put(fileObject.toUri(), fileObject);
    }

    @Override
    public boolean isRegistered(URI objectUri) {
        return javaFileObjects.containsKey(objectUri);
    }

    @Override
    public JavaFileObject get(URI objectUri) {
        return javaFileObjects.get(objectUri);
    }


    @Override
    public void unregister(URI objectUri) {
        javaFileObjects.remove(objectUri);
    }

    @Override
    public Collection<JavaFileObject> get(JavaFileObject.Kind kind) {
        List<JavaFileObject> result = new ArrayList<JavaFileObject>();
        for (JavaFileObject candidate : javaFileObjects.values()) {
            if (candidate.getKind() == kind) {
                result.add(candidate);
            }
        }

        return result;
    }
}
