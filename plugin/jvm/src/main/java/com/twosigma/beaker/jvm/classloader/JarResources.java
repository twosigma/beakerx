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
 * NOTE: this is a modified version of JCL library source file.
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

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.CodeSource;
import java.security.ProtectionDomain;
import java.security.cert.Certificate;
import java.util.HashMap;
import java.util.Map;
import java.util.jar.JarEntry;
import java.util.jar.JarInputStream;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * JarResources reads jar files and loads the class content/bytes in a HashMap
 * 
 * @author Kamran Zafar
 * 
 */
public class JarResources {

    protected Map<String, JclJarEntry> jarEntryContents;
    protected boolean collisionAllowed;

    private static Logger logger = Logger.getLogger( JarResources.class.getName() );

    /**
     * Default constructor
     */
    public JarResources() {
        jarEntryContents = new HashMap<String, JclJarEntry>();
        collisionAllowed = true;
    }

    /**
     * @param name
     * @return URL
     */
    public URL getResourceURL(String name) {
      if (logger.isLoggable( Level.FINEST ))
        logger.finest( "getResourceURL: " + name );
      
      JclJarEntry entry = jarEntryContents.get(name);
      if (entry != null) {
        if (entry.getBaseUrl() == null) {
          throw new JclException( "non-URL accessible resource" );
        }
        try {
          return new URL( entry.getBaseUrl().toString() + name );
        } catch (MalformedURLException e) {
          throw new JclException( e );
        }
      }

      return null;
    }

    /**
     * @param name
     * @return byte[]
     */
    public JclJarEntry getResource(String name) {
      JclJarEntry entry = jarEntryContents.get(name);
      return entry;
    }

    /**
     * Returns an immutable Map of all jar resources
     * 
     * @return Map
     */
    public Map<String, byte[]> getResources() {
      Map<String, byte[]> resourcesAsBytes = new HashMap<String, byte[]>(jarEntryContents.size());
      
      for (Map.Entry<String, JclJarEntry> entry : jarEntryContents.entrySet()) {
        resourcesAsBytes.put(entry.getKey(), entry.getValue().getResourceBytes());
      }

      return resourcesAsBytes;
    }

    /**
     * Reads the specified jar file
     * 
     * @param jarFile
     */
    public void loadJar(String jarFile) {
        if (logger.isLoggable( Level.FINEST ))
            logger.finest( "Loading jar: " + jarFile );

        FileInputStream fis = null;
        try {
            File file = new File( jarFile );
            String baseUrl = "jar:" + file.toURI().toString() + "!/";
            fis = new FileInputStream( file );
            loadJar( baseUrl, fis, getProtectionDomain(file.toURI().toURL()) );
        } catch (IOException e) {
            if (logger.isLoggable( Level.FINEST ))
              logger.finest( "error on : " + jarFile );
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

    /**
     * Reads the jar file from a specified URL
     * 
     * @param url
     */
    public void loadJar(URL url) {
        if (logger.isLoggable( Level.FINEST ))
            logger.finest( "Loading jar: " + url.toString() );

        InputStream in = null;
        try {
            String baseUrl = "jar:" + url.toString() + "!/";
            in = url.openStream();
            loadJar(baseUrl, in, getProtectionDomain(url) );
        } catch (IOException e) {
            if (logger.isLoggable( Level.FINEST ))
              logger.finest( "error on: " + url.toString() );
            throw new JclException( e );
        } finally {
            if (in != null)
                try {
                    in.close();
                } catch (IOException e) {
                    throw new JclException( e );
                }
        }
    }

    /**
        * Loads protection domain for specified jar. The domain is not loaded from the jar itself but it is derived from parent protection domain.
        * 
        * @param aURL jar url
        * @return
        */
    protected ProtectionDomain getProtectionDomain(URL aURL) {
      ProtectionDomain parentDomain = getClass().getProtectionDomain();
      CodeSource csParent = parentDomain.getCodeSource();
      Certificate[] certParent = csParent.getCertificates();
      CodeSource csChild = (certParent == null ? new CodeSource(aURL, csParent.getCodeSigners()) : new CodeSource(aURL, certParent));
      ProtectionDomain pdChild = new ProtectionDomain(csChild, parentDomain.getPermissions(), parentDomain.getClassLoader(), parentDomain.getPrincipals());
      return pdChild;
    }
         
    /**
     * Load the jar contents from InputStream
     * @param baseUrl 
     * @param protectionDomain 
     * 
     */
    public void loadJar(String baseUrl, InputStream jarStream, ProtectionDomain p) {

        BufferedInputStream bis = null;
        JarInputStream jis = null;

        try {
            bis = new BufferedInputStream( jarStream );
            jis = new JarInputStream( bis );

            JarEntry jarEntry = null;
            while (( jarEntry = jis.getNextJarEntry() ) != null) {
                if (logger.isLoggable( Level.FINEST ))
                    logger.finest( dump( jarEntry ) );

                if (jarEntry.isDirectory()) {
                    continue;
                }

                if (jarEntryContents.containsKey( jarEntry.getName() )) {
                    if (!collisionAllowed)
                        throw new JclException( "Class/Resource " + jarEntry.getName() + " already loaded" );
                    else {
                        if (logger.isLoggable( Level.FINEST ))
                            logger.finest( "Class/Resource " + jarEntry.getName()
                                    + " already loaded; ignoring entry..." );
                        continue;
                    }
                }

                if (logger.isLoggable( Level.FINEST ))
                    logger.finest( "Entry Name: " + jarEntry.getName() + ", " + "Entry Size: " + jarEntry.getSize() );

                byte[] b = new byte[2048];
                ByteArrayOutputStream out = new ByteArrayOutputStream();

                int len = 0;
                while (( len = jis.read( b ) ) > 0) {
                    out.write( b, 0, len );
                }

                // add to internal resource HashMap
                JclJarEntry entry = new JclJarEntry();
                entry.setBaseUrl(baseUrl);
                entry.setResourceBytes(out.toByteArray());
                entry.setProtectionDomain(p);
                jarEntryContents.put( jarEntry.getName(), entry );

                if (logger.isLoggable( Level.FINEST ))
                    logger.finest( jarEntry.getName() + ": size=" + out.size() + " ,csize="
                            + jarEntry.getCompressedSize() );

                out.close();
            }
        } catch (IOException e) {
            throw new JclException( e );
        } catch (NullPointerException e) {
            if (logger.isLoggable( Level.FINEST ))
                logger.finest( "Done loading." );
        } finally {
            if (jis != null)
                try {
                    jis.close();
                } catch (IOException e) {
                    throw new JclException( e );
                }

            if (bis != null)
                try {
                    bis.close();
                } catch (IOException e) {
                    throw new JclException( e );
                }
        }
    }

    /**
     * For debugging
     * 
     * @param je
     * @return String
     */
    private String dump(JarEntry je) {
        StringBuffer sb = new StringBuffer();
        if (je.isDirectory()) {
            sb.append( "d " );
        } else {
            sb.append( "f " );
        }

        if (je.getMethod() == JarEntry.STORED) {
            sb.append( "stored   " );
        } else {
            sb.append( "defalted " );
        }

        sb.append( je.getName() );
        sb.append( "\t" );
        sb.append( "" + je.getSize() );
        if (je.getMethod() == JarEntry.DEFLATED) {
            sb.append( "/" + je.getCompressedSize() );
        }

        return ( sb.toString() );
    }
}