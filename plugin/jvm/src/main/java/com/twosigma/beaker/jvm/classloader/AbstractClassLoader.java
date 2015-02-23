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

/**
 *  NOTE: this is a modified version of JCL library source file.
 *  
 *  
 *  JCL (Jar Class Loader)
 *
 *  Copyright (C) 2011  Kamran Zafar
 *
 *  This file is part of Jar Class Loader (JCL).
 *  Jar Class Loader (JCL) is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  JarClassLoader is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with JCL.  If not, see <http://www.gnu.org/licenses/>.
 *
 *  @author Kamran Zafar
 *
 *  Contact Info:
 *  Email:  xeus.man@gmail.com
 *  Web:    http://xeustech.blogspot.com
 */

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Abstract class loader that can load classes from different resources
 * 
 * @author Kamran Zafar
 * 
 */
@SuppressWarnings("unchecked")
public abstract class AbstractClassLoader extends ClassLoader {

    protected final List<ProxyClassLoader> loaders = new ArrayList<ProxyClassLoader>();

    private final ProxyClassLoader systemLoader = new SystemLoader();
    private final ProxyClassLoader parentLoader = new ParentLoader();
    private final ProxyClassLoader currentLoader = new CurrentLoader();

    /**
     * Build a new instance of AbstractClassLoader.java.
     * @param parent parent class loader
     */
    public AbstractClassLoader(ClassLoader parent) {
        super(parent);
        addDefaultLoader();
    }
    
    /**
     * No arguments constructor
     */
    public AbstractClassLoader() {
        super();
        addDefaultLoader();
    }

    protected void addDefaultLoader() {
        loaders.add(systemLoader);
        loaders.add(parentLoader);
        loaders.add(currentLoader);
    }

    public void addLoader(ProxyClassLoader loader) {
        loaders.add(loader);
    }

    /*
     * (non-Javadoc)
     * 
     * @see java.lang.ClassLoader#loadClass(java.lang.String)
     */
    @Override
    public Class loadClass(String className) throws ClassNotFoundException {
        return (loadClass(className, true));
    }

    /**
     * Overrides the loadClass method to load classes from other resources,
     * JarClassLoader is the only subclass in this project that loads classes
     * from jar files
     * 
     * @see java.lang.ClassLoader#loadClass(java.lang.String, boolean)
     */
    @Override
    public Class loadClass(String className, boolean resolveIt) throws ClassNotFoundException {
        if (className == null || className.trim().equals(""))
            return null;

        Collections.sort(loaders);

        Class clazz = null;

        if (clazz == null) {
            for (ProxyClassLoader l : loaders) {
                if (l.isEnabled()) {
                    clazz = l.loadClass(className, resolveIt);
                    if (clazz != null)
                        break;
                }
            }
        }

        if (clazz == null)
            throw new ClassNotFoundException(className);

        return clazz;
    }

    /**
     * Overrides the getResource method to load non-class resources from other
     * sources, JarClassLoader is the only subclass in this project that loads
     * non-class resources from jar files
     *
     * @see java.lang.ClassLoader#getResource(java.lang.String)
     */
    @Override
    public URL getResource(String name) {
        if (name == null || name.trim().equals(""))
            return null;

        Collections.sort(loaders);

        URL url = null;
        
        if (url == null) {
            for (ProxyClassLoader l : loaders) {
                if (l.isEnabled()) {
                    url = l.findResource(name);
                    if (url != null)
                        break;
                }
            }
        }

        return url;

    }

    /**
     * Overrides the getResourceAsStream method to load non-class resources from
     * other sources, JarClassLoader is the only subclass in this project that
     * loads non-class resources from jar files
     * 
     * @see java.lang.ClassLoader#getResourceAsStream(java.lang.String)
     */
    @Override
    public InputStream getResourceAsStream(String name) {
        if (name == null || name.trim().equals(""))
            return null;

        Collections.sort(loaders);

        InputStream is = null;

          for (ProxyClassLoader l : loaders) {
              if (l.isEnabled()) {
                  is = l.loadResource(name);
                  if (is != null)
                      break;
              }
          }

        return is;

    }

    
    @Override
    protected Enumeration<URL> findResources(String name) throws IOException {
      if (name == null || name.trim().equals(""))
        return null;
      
      Collections.sort(loaders);
    
      Enumeration<URL> url = null;
    
      if (url == null || !url.hasMoreElements()) {
        for (ProxyClassLoader l : loaders) {
          if (l.isEnabled()) {
            url = l.findResources(name);
            if (url != null)
              break;
          }
        }
      }
      
      return url;
    }
    
    
    /**
     * System class loader
     * 
     */
    class SystemLoader extends ProxyClassLoader {

        private final Logger logger = Logger.getLogger(SystemLoader.class.getName());

        public SystemLoader() {
            order = 50;
            enabled = true;
        }

        @Override
        public Class loadClass(String className, boolean resolveIt) {
            Class result;

            try {
                result = findSystemClass(className);
            } catch (ClassNotFoundException e) {
                return null;
            }

            if (logger.isLoggable(Level.FINEST))
                logger.finest("Returning system class " + className);

            return result;
        }

        @Override
        public InputStream loadResource(String name) {
            InputStream is = getSystemResourceAsStream(name);

            if (is != null) {
                if (logger.isLoggable(Level.FINEST))
                    logger.finest("Returning system resource " + name);

                return is;
            }

            return null;
        }

        @Override
        public URL findResource(String name) {
            URL url = getSystemResource(name);

            if (url != null) {
                if (logger.isLoggable(Level.FINEST))
                    logger.finest("Returning system resource " + name);

                return url;
            }

            return null;
        }
    }

    /**
     * Parent class loader
     * 
     */
    class ParentLoader extends ProxyClassLoader {
        private final Logger logger = Logger.getLogger(ParentLoader.class.getName());

        public ParentLoader() {
            order = 30;
            enabled = true;
        }

        @Override
        public Class loadClass(String className, boolean resolveIt) {
            Class result;

            try {
                result = getParent().loadClass(className);
            } catch (ClassNotFoundException e) {
                return null;
            }

            if (logger.isLoggable(Level.FINEST))
                logger.finest("Returning class " + className + " loaded with parent classloader");

            return result;
        }

        @Override
        public InputStream loadResource(String name) {
            InputStream is = getParent().getResourceAsStream(name);

            if (is != null) {
                if (logger.isLoggable(Level.FINEST))
                    logger.finest("Returning resource " + name + " loaded with parent classloader");

                return is;
            }
            return null;
        }


        @Override
        public URL findResource(String name) {
            URL url = getParent().getResource(name);

            if (url != null) {
                if (logger.isLoggable(Level.FINEST))
                    logger.finest("Returning resource " + name + " loaded with parent classloader");

                return url;
            }
            return null;
        }
    }

    /**
     * Current class loader
     * 
     */
    class CurrentLoader extends ProxyClassLoader {
        private final Logger logger = Logger.getLogger(CurrentLoader.class.getName());

        public CurrentLoader() {
            order = 20;
            enabled = true;
        }

        @Override
        public Class loadClass(String className, boolean resolveIt) {
            Class result;

            try {
                result = getClass().getClassLoader().loadClass(className);
            } catch (ClassNotFoundException e) {
                return null;
            }

            if (logger.isLoggable(Level.FINEST))
                logger.finest("Returning class " + className + " loaded with current classloader");

            return result;
        }

        @Override
        public InputStream loadResource(String name) {
            InputStream is = getClass().getClassLoader().getResourceAsStream(name);

            if (is != null) {
                if (logger.isLoggable(Level.FINEST))
                    logger.finest("Returning resource " + name + " loaded with current classloader");

                return is;
            }

            return null;
        }


        @Override
        public URL findResource(String name) {
            URL url = getClass().getClassLoader().getResource(name);

            if (url != null) {
                if (logger.isLoggable(Level.FINEST))
                    logger.finest("Returning resource " + name + " loaded with current classloader");

                return url;
            }

            return null;
        }
    }

    public ProxyClassLoader getSystemLoader() {
        return systemLoader;
    }

    public ProxyClassLoader getParentLoader() {
        return parentLoader;
    }

    public ProxyClassLoader getCurrentLoader() {
        return currentLoader;
    }

}