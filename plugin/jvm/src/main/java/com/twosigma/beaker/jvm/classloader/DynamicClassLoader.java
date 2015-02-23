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

package com.twosigma.beaker.jvm.classloader;


import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.net.URL;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

public class DynamicClassLoader {
    @SuppressWarnings("rawtypes")
	protected final Map<String, Class> classes;
    protected final String dirPath;
    protected final DynamicLoaderProxy dlp = new DynamicLoaderProxy();
    protected SubClassLoader subLoader;
    protected final JarClassLoader parent;
    
    @SuppressWarnings("rawtypes")
	public DynamicClassLoader(String dir) {
        classes = Collections.synchronizedMap( new HashMap<String, Class>() );
        dirPath = dir;
        parent = new JarClassLoader();
        parent.getLocalLoader().setOrder(20);
        parent.getCurrentLoader().setOrder(30);
        parent.getParentLoader().setOrder(40); 
        parent.getThreadLoader().setOrder(50);
        parent.getSystemLoader().setOrder(60);
        if(dir!=null && !dir.isEmpty()) {
          getProxy().setOrder(10);
          parent.addLoader(getProxy());
        }
        subLoader = new SubClassLoader(parent);
    }

    public void add(Object s) {
        parent.add(s);
    }
    
	public void addAll(List<?> sources) {
        parent.addAll(sources);
    }
    
    public Class<?> loadClass(String n) throws ClassNotFoundException {
        return parent.loadClass(n);
    }
    
    public ClassLoader getLoader() { return parent; }
    
    class SubClassLoader extends ClassLoader {
        public SubClassLoader(ClassLoader p) {
            super(p);
        }
        public Class<?> my_defineClass(String s, byte [] b, int a, int x) {
            return defineClass(s,b,a,x);
        }
        public void my_definePackage(String n) {
            definePackage( n, null, null, null, null, null, null, null );
        }
        public void my_resolveClass(Class<?> r) {
            resolveClass(r);
        }
    }
    
    public DynamicLoaderProxy getProxy() { return dlp; }
    
    class DynamicLoaderProxy extends ProxyClassLoader {

        public DynamicLoaderProxy() {
            order = 10;
            enabled = true;
        }

        @Override
        public Class<?> loadClass(String className, boolean resolveIt) {
            Class<?> result = null;
            byte[] classBytes;

            result = classes.get( className );
            if (result != null) {
                return result;
            }

            classBytes = loadClassBytes( className );
            if (classBytes == null) {
                return null;
            }

            result = subLoader.my_defineClass( className, classBytes, 0, classBytes.length );
            if (result == null) {
                return null;
            }

            /*
             * Preserve package name.
             */
            if (result.getPackage() == null) {
                int lastDotIndex = className.lastIndexOf( '.' );
                String packageName = (lastDotIndex >= 0) ? className.substring( 0, lastDotIndex) : "";
                subLoader.my_definePackage( packageName);
            }

            if (resolveIt)
                subLoader.my_resolveClass( result );

            classes.put( className, result );
            return result;
        }

        @Override
        public InputStream loadResource(String name) {
            byte[] arr = loadClassBytes( name );
            if (arr != null) {
                return new ByteArrayInputStream( arr );
            }
            return null;
        }

        @Override
        public URL findResource(String name) {
            return null;
        }
    }
    
    
    protected byte[] loadClassBytes(String className) {
        String path = dirPath + File.separator + className.replace(".", File.separator) + ".class";
        
        File f = new File(path);
        if (f.exists()) {
            byte [] content = new byte[(int) f.length()];
            FileInputStream fis = null;
            try {
                fis = new FileInputStream( f );
                if (fis.read( content ) != -1) {
                    return content;
                }
            } catch (IOException e) {
                throw new JclException( e );
            } finally {
                if (fis != null)
                    try {
                        fis.close();
                    } catch (IOException e) {
                        throw new JclException( e );
                    }
            }
            
        }
        return null;
    }

    public void clearCache() {
        classes.clear();
        subLoader = new SubClassLoader(parent);
    }
}