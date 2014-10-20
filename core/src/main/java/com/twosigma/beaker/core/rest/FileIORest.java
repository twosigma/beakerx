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
package com.twosigma.beaker.core.rest;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.sun.jersey.api.Responses;
import com.twosigma.beaker.core.module.config.BeakerConfig;
import com.twosigma.beaker.shared.module.util.GeneralUtils;
import java.io.File;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import jcifs.util.MimeMap;
import org.apache.commons.lang3.exception.ExceptionUtils;

/**
 * for file I/O (save and load)
 */
@Path("file-io")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class FileIORest {

  private static final MimeMap MIME_MAP;
  static {
    MimeMap mimeMap = null;
    try {
      mimeMap = new MimeMap();
    } catch (IOException ex) {
      Logger.getLogger(FileIORest.class.getName()).log(Level.SEVERE, null, ex);
    }
    MIME_MAP = mimeMap;
  }

  private final GeneralUtils utils;
  private final String [] searchDirs;

  @Inject
  private FileIORest(BeakerConfig bkConfig, GeneralUtils utils) {
    this.utils = utils;
    this.searchDirs = bkConfig.getFileSearchDirs();
  }

  @GET
  @Path("getHomeDirectory")
  @Produces(MediaType.TEXT_PLAIN)
  public String getHomeDirector() {
    return System.getProperty("user.home");
  }

  @GET
  @Path("getStartUpDirectory")
  @Produces(MediaType.TEXT_PLAIN)
  public String getStartUpDirectory() {
    return System.getProperty("user.dir");
  }

  @POST
  @Path("save")
  public void save(
      @FormParam("path") String path,
      @FormParam("content") String contentAsString) throws IOException {
    path = removePrefix(path);
    try {
      utils.saveFile(path, contentAsString);
    } catch (Throwable t) {
      throw new FileSaveException(ExceptionUtils.getStackTrace(t));
    }
  }

  @POST
  @Path("saveIfNotExists")
  public void saveIfNotExists(
      @FormParam("path") String path,
      @FormParam("content") String contentAsString) throws IOException {
    path = removePrefix(path);
    if (Files.exists(Paths.get(path))) {
      if (new File(path).isDirectory()) {
        throw new FileAlreadyExistsAndIsDirectoryException();
      }
      throw new FileAlreadyExistsException();
    }
    try {
      utils.saveFile(path, contentAsString);
    } catch (Throwable t) {
      throw new FileSaveException(ExceptionUtils.getStackTrace(t));
    }
  }

  @GET
  @Path("load")
  @Produces(MediaType.TEXT_PLAIN)
  public String load(@QueryParam("path") String path) throws IOException {
    path = removePrefix(path);
    if (Files.exists(Paths.get(path))) {
      try {
        byte[] encoded = Files.readAllBytes(Paths.get(path));
        return StandardCharsets.UTF_8.decode(ByteBuffer.wrap(encoded)).toString();
      } catch (Throwable t) {
        throw new FileOpenException(ExceptionUtils.getStackTrace(t));
      }
    }

    for(String s : this.searchDirs) {
      String npath = s + "/" + path; 
      if (Files.exists(Paths.get(npath))) {
        try {
          byte[] encoded = Files.readAllBytes(Paths.get(npath));
          return StandardCharsets.UTF_8.decode(ByteBuffer.wrap(encoded)).toString();
        } catch (Throwable t) {
          throw new FileOpenException(ExceptionUtils.getStackTrace(t));
        }
      }
    }
    throw new FileDoesntExistException(path + " was not found");
  }

  private static final String FILE_PREFIX = "file:";
  private static String removePrefix(String path) {
    if (path.startsWith("file:")) {
      path = path.substring(FILE_PREFIX.length()); // get rid of prefix "file:"
    }
    return path;
  }

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
      return "";
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
  private static class FileSaveException extends WebApplicationException {
    public FileSaveException(String stackTrace) {
      super(Response.status(Responses.PRECONDITION_FAILED)
          .entity("<h1>Save failed</h1><pre>" + stackTrace + "</pre>")
          .type("text/plain")
          .build());
    }
  }

  private static class FileOpenException extends WebApplicationException {
    public FileOpenException(String stackTrace) {
      super(Response.status(Responses.PRECONDITION_FAILED)
          .entity("<h1>Open failed</h1><pre>" + stackTrace + "</pre>")
          .type("text/plain")
          .build());
    }
  }

  private static class FileAlreadyExistsAndIsDirectoryException extends WebApplicationException {
    public FileAlreadyExistsAndIsDirectoryException() {
      super(Response.status(Responses.PRECONDITION_FAILED)
          .entity("isDirectory").type("text/plain").build());
    }
  }

  private static class FileAlreadyExistsException extends WebApplicationException {
    public FileAlreadyExistsException() {
      super(Response.status(Responses.CONFLICT)
          .entity("exists").type("text/plain").build());
    }
  }

  private static class FileDoesntExistException extends WebApplicationException {
    public FileDoesntExistException(String message) {
      super(Response.status(Responses.NOT_FOUND)
          .entity(message).type("text/plain").build());
    }
  }

}
