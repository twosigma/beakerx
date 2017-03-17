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
package org.abstractmeta.toolbox.compilation.compiler.impl;


import org.abstractmeta.toolbox.compilation.compiler.registry.JavaFileObjectRegistry;
import org.abstractmeta.toolbox.compilation.compiler.util.URIUtil;

import javax.tools.FileObject;
import javax.tools.ForwardingJavaFileManager;
import javax.tools.JavaFileManager;
import javax.tools.JavaFileObject;
import java.io.IOException;
import java.net.URI;

/**
 * This implementation uses {@link org.abstractmeta.toolbox.compilation.compiler.registry.JavaFileObjectRegistry}
 * to both retrieve and persist java files.
 *
 * @author Adrian Witas
 */

public class SimpleJavaFileManager extends ForwardingJavaFileManager<JavaFileManager> {

    // the delegating class loader (passed to the constructor)
    private final ClassLoader classLoader;
    private final JavaFileObjectRegistry javaFileObjectRegistry;

    protected SimpleJavaFileManager(JavaFileManager javaFileManager, ClassLoader classLoader, JavaFileObjectRegistry javaFileObjectRegistry) {
        super(javaFileManager);
        this.classLoader = classLoader;
        this.javaFileObjectRegistry = javaFileObjectRegistry;
    }


    /**
     * @return the class loader which this file manager delegates to
     */
    public ClassLoader getClassLoader() {
        return classLoader;
    }


    @Override
    public FileObject getFileForInput(Location location, String packageName, String relativeName) throws IOException {
        URI uri = URIUtil.buildUri(location, packageName, relativeName);
        if (javaFileObjectRegistry.isRegistered(uri)) {
            return javaFileObjectRegistry.get(uri);
        }
        return super.getFileForInput(location, packageName, relativeName);
    }

    public JavaFileObject getJavaFileForOutput(Location location, String qualifiedName, JavaFileObject.Kind kind, FileObject outputFile) throws IOException {
        if (kind == JavaFileObject.Kind.CLASS) {
            JavaFileObject result = new JavaCodeFileObject(URIUtil.buildUri(location, qualifiedName));
            javaFileObjectRegistry.register(result);
            return result;
        } else {
            throw new IllegalStateException(String.format("Unsupported kind: %s for %s", kind, qualifiedName));
        }
    }

    @Override
    public ClassLoader getClassLoader(JavaFileManager.Location location) {
        return classLoader;
    }


}


