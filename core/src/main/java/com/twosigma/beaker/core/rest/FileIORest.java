/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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
package com.twosigma.beaker.core.rest;

import com.google.inject.Singleton;
import com.twosigma.beaker.shared.json.serializer.StringObject;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import jcifs.util.MimeMap;
import org.apache.commons.io.IOUtils;

/**
 * RESTful API for file I/O (save and load)
 */
@Singleton
@Produces(MediaType.APPLICATION_JSON)
@Path("file-io")
public class FileIORest {

  @GET
  @Path("getHomeDirectory")
  public StringObject getHomeDirector() {
    return new StringObject(System.getProperty("user.home"));
  }

  @POST
  @Path("save")
  public StringObject save(
      @FormParam("path") String path,
      @FormParam("content") String contentAsString) throws FileNotFoundException, IOException {
    if (path.startsWith("file:")) {
      path = path.substring(5); // get rid of prefix "file:"
    }
    FileOutputStream fos = new FileOutputStream(path);
      fos.write(contentAsString.getBytes());
    fos.close();
    return new StringObject("done");
  }

  @GET
  @Path("load")
  public StringObject load(
      @QueryParam("path") String path) throws FileNotFoundException, IOException {
    if (path.startsWith("file:")) {
      path = path.substring(5); // get rid of prefix "file:"
    }
    FileInputStream fin = new FileInputStream(path);
    byte[] content = IOUtils.toByteArray(fin);
    fin.close();
    return new StringObject(new String(content));
  }
  private static MimeMap MIME_MAP = null;

  public static String getMimeTypeForFileName(String filename) {
    String extension = filename;

    //remove parameters before checking extension
    extension = extension.split("\\?")[0];
    extension = extension.split("%3F")[0];

    int extensionIndex = extension.lastIndexOf('.');
    if (extensionIndex > 0 && extensionIndex < extension.length()) {
      extension = extension.substring(extensionIndex + 1);
    } else {
      extension = "";
    }
    return getMimeTypeForExtension(extension);
  }
  private static final String BEAKER_NOTEBOOK_EXTENSION = ".bkr";
  private static final String BEAKER_NOTEBOOK_MIME_TYPE =
      "application/prs.twosigma.beaker.notebook+json";

  public static String getMimeTypeForExtension(String extension) {
    if (MIME_MAP == null) {
      try {
        MIME_MAP = new MimeMap();
      } catch (IOException ex) {
        return "";
      }
    }

    String result;
    String extensionWithDot = "." + extension;

    if (extensionWithDot.equals(BEAKER_NOTEBOOK_EXTENSION)) {
      return BEAKER_NOTEBOOK_MIME_TYPE;
    }
    try {
      result = MIME_MAP.getMimeType(extension);
    } catch (IOException ex) {
      result = null;
    }

    if (result == null || result.equals("application/octet-stream")) {
      result = extension;
    }
    return result;
  }

  @GET
  @Path("getDecoratedChildren")
  public List<Map<String, Object>> getDecoratedChildren(
      @QueryParam("path") String path) {
    File f = new File(path);
    File[] children = f.listFiles();
    List<Map<String, Object>> ret = new ArrayList<>(children.length);
    for (File cf : children) {
      if (!cf.isHidden()) {
        Map<String, Object> map = new HashMap<>();
        map.put("uri", cf.getPath());
        map.put("type", cf.isDirectory() ? "directory" : getMimeTypeForFileName(cf.getPath()));
        ret.add(map);
      }
    }
    return ret;
  }
}
