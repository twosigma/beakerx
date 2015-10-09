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
package org.abstractmeta.toolbox.compilation.compiler.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

/**
 * ClassPath utility methods.
 *
 * @author Adrian Witas
 */
public class ClassPathUtil {

    private static String OS = System.getProperty("os.name").toLowerCase();

    public static boolean isWindows() {
        return OS.contains("win");
    }


    public static String getClassPathSeparator() {
        return isWindows() ? ";" : ":";
    }

    /**
     * Returns current jvm class path entries
     * This method read java.class.path property
     * @return class path entries.
     */
    public static Collection<String> getClassPathEntries() {
        String classPath = System.getProperty("java.class.path", "");
        Collection<String> result = new ArrayList<String>();
        Collections.addAll(result, classPath.split(getClassPathSeparator()));
        return result;
    }

}
