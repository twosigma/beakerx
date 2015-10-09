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

import javax.tools.SimpleJavaFileObject;
import java.net.URI;

/**
 * Provides implementation of SimpleJavaFileObject.
 * This implementation stores java source code for a given class.
 * <p> Iterable of this type is supplied  {@link javax.tools.JavaCompiler#getTask(java.io.Writer, javax.tools.JavaFileManager, javax.tools.DiagnosticListener, Iterable, Iterable, Iterable)}
 * to create actual compilation task: {@link javax.tools.JavaCompiler.CompilationTask}
 * </p>
 * @author Adrian Witas
 */

public class JavaSourceFileObject extends SimpleJavaFileObject {

    private final CharSequence source;


    protected JavaSourceFileObject(URI uri, CharSequence source) {
        super(uri, Kind.SOURCE);
        this.source = source;
    }


    @Override
    public CharSequence getCharContent(final boolean ignoreEncodingErrors)  throws UnsupportedOperationException {
        if (source == null) {
            throw new IllegalStateException("source was null");
        }
        return source;
    }


}
