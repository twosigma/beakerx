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
import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.net.URI;

/**
 * Provides implementation of JavaCodeFileObject SimpleJavaFileObject.
 * This implementation stores compiled byte code for a given class.
 * <p>Java file object of this type is created by {@link javax.tools.JavaFileManager#getJavaFileForOutput}
 * to stores compiled byte-code for given internal class name.
 * </p>
 *
 * @author Adrian Witas
 */

public class JavaCodeFileObject extends SimpleJavaFileObject {

    private ByteArrayOutputStream byteCodeOutputStream;

    protected JavaCodeFileObject(URI uri) {
        super(uri, Kind.CLASS);
    }

    @Override
    public OutputStream openOutputStream() {
        byteCodeOutputStream = new ByteArrayOutputStream();
        return byteCodeOutputStream;
    }

    byte[] getByteCode() {
        return byteCodeOutputStream.toByteArray();
    }
}
