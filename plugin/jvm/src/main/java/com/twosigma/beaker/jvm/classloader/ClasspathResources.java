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

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.logging.Level;
import java.util.logging.Logger;


/**
 * Class that builds a local classpath by loading resources from different
 * files/paths
 * 
 * @author Kamran Zafar
 * 
 */
public class ClasspathResources extends JarResources {

    private static Logger logger = Logger.getLogger( ClasspathResources.class.getName() );
    private boolean ignoreMissingResources;

    public ClasspathResources() {
        super();
        ignoreMissingResources = true;
    }

    /**
     * Reads the resource content
     * 
     * @param resource
     */
    private void loadResourceContent(String resource, String pack) {
        File resourceFile = new File( resource );
        String entryName = "";
        FileInputStream fis = null;
        byte[] content = null;
        try {
            fis = new FileInputStream( resourceFile );
            content = new byte[(int) resourceFile.length()];

            if (fis.read( content ) != -1) {

                if (pack.length() > 0) {
                    entryName = pack + "/";
                }

                entryName += resourceFile.getName();

                if (jarEntryContents.containsKey( entryName )) {
                    if (!collisionAllowed)
                        throw new JclException( "Resource " + entryName + " already loaded" );
                    else {
                        if (logger.isLoggable( Level.FINEST ))
                            logger.finest( "Resource " + entryName + " already loaded; ignoring entry..." );
                        return;
                    }
                }

                if (logger.isLoggable( Level.FINEST ))
                    logger.finest( "Loading resource: " + entryName );

                jarEntryContents.put( entryName, content );
            }
        } catch (IOException e) {
            throw new JclException( e );
        } finally {
            try {
                fis.close();
            } catch (IOException e) {
                throw new JclException( e );
            }
        }
    }

    /**
     * Attempts to load a remote resource (jars, properties files, etc)
     * 
     * @param url
     */
    private void loadRemoteResource(URL url) {
        if (logger.isLoggable( Level.FINEST ))
            logger.finest( "Attempting to load a remote resource." );

        if (url.toString().toLowerCase().endsWith( ".jar" )) {
            loadJar( url );
            return;
        }

        InputStream stream = null;
        ByteArrayOutputStream out = null;
        try {
            stream = url.openStream();
            out = new ByteArrayOutputStream();

            int byt;
            while (( ( byt = stream.read() ) != -1 )) {
                out.write( byt );
            }

            byte[] content = out.toByteArray();

            if (jarEntryContents.containsKey( url.toString() )) {
                if (!collisionAllowed)
                    throw new JclException( "Resource " + url.toString() + " already loaded" );
                else {
                    if (logger.isLoggable( Level.FINEST ))
                        logger.finest( "Resource " + url.toString() + " already loaded; ignoring entry..." );
                    return;
                }
            }

            if (logger.isLoggable( Level.FINEST ))
                logger.finest( "Loading remote resource." );

            jarEntryContents.put( url.toString(), content );
        } catch (IOException e) {
            throw new JclException( e );
        } finally {
            if (out != null)
                try {
                    out.close();
                } catch (IOException e) {
                    throw new JclException( e );
                }
            if (stream != null)
                try {
                    stream.close();
                } catch (IOException e) {
                    throw new JclException( e );
                }
        }
    }

    /**
     * Reads the class content
     * 
     * @param clazz
     * @param pack
     */
    private void loadClassContent(String clazz, String pack) {
        File cf = new File( clazz );
        FileInputStream fis = null;
        String entryName = "";
        byte[] content = null;

        try {
            fis = new FileInputStream( cf );
            content = new byte[(int) cf.length()];

            if (fis.read( content ) != -1) {
                entryName = pack + "/" + cf.getName();

                if (jarEntryContents.containsKey( entryName )) {
                    if (!collisionAllowed)
                        throw new JclException( "Class " + entryName + " already loaded" );
                    else {
                        if (logger.isLoggable( Level.FINEST ))
                            logger.finest( "Class " + entryName + " already loaded; ignoring entry..." );
                        return;
                    }
                }

                if (logger.isLoggable( Level.FINEST ))
                    logger.finest( "Loading class: " + entryName );

                jarEntryContents.put( entryName, content );
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

    /**
     * Reads local and remote resources
     * 
     * @param url
     */
    public void loadResource(URL url) {
      if (logger.isLoggable( Level.FINEST ))
        logger.finest( "loadResource url: " + url.toString() );
      
        try {
            // Is Local
            loadResource( new File( url.toURI() ), "" );
        } catch (IllegalArgumentException iae) {
            // Is Remote
            loadRemoteResource( url );
        } catch (URISyntaxException e) {
            throw new JclException( "URISyntaxException", e );
        }
    }

    /**
     * Reads local resources from - Jar files - Class folders - Jar Library
     * folders
     * 
     * @param path
     */
    public void loadResource(String path) {
        if (logger.isLoggable( Level.FINEST ))
            logger.finest( "loadResource: " + path );

        File fp = new File( path );

        if (!fp.exists() && !ignoreMissingResources) {
            throw new JclException( "File/Path does not exist" );
        }

        loadResource( fp, "" );
    }

    /**
     * Reads local resources from - Jar files - Class folders - Jar Library
     * folders
     * 
     * @param fol
     * @param packName
     */
    private void loadResource(File fol, String packName) {
        if (fol.isFile()) {
            if (fol.getName().toLowerCase().endsWith( ".class" )) {
                loadClassContent( fol.getAbsolutePath(), packName );
            } else {
                if (fol.getName().toLowerCase().endsWith( ".jar" )) {
                    loadJar( fol.getAbsolutePath() );
                } else {
                    loadResourceContent( fol.getAbsolutePath(), packName );
                }
            }

            return;
        }

        if (fol.list() != null) {
            for (String f : fol.list()) {
                File fl = new File( fol.getAbsolutePath() + "/" + f );

                String pn = packName;

                if (fl.isDirectory()) {

                    if (!pn.equals( "" ))
                        pn = pn + "/";

                    pn = pn + fl.getName();
                }

                loadResource( fl, pn );
            }
        }
    }

    /**
     * Removes the loaded resource
     * 
     * @param resource
     */
    public void unload(String resource) {
        if (jarEntryContents.containsKey( resource )) {
            if (logger.isLoggable( Level.FINEST ))
                logger.finest( "Removing resource " + resource );
            jarEntryContents.remove( resource );
        } else {
            throw new ResourceNotFoundException( resource, "Resource not found in local ClasspathResources" );
        }
    }

    public boolean isCollisionAllowed() {
        return collisionAllowed;
    }

    public void setCollisionAllowed(boolean collisionAllowed) {
        this.collisionAllowed = collisionAllowed;
    }

    public boolean isIgnoreMissingResources() {
        return ignoreMissingResources;
    }

    public void setIgnoreMissingResources(boolean ignoreMissingResources) {
        this.ignoreMissingResources = ignoreMissingResources;
    }
}