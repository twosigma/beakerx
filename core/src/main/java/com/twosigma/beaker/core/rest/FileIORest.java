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
import jcifs.util.MimeMap;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.BufferedReader;
import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.nio.file.AccessDeniedException;
import java.nio.file.FileSystemException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Paths;
import java.nio.file.attribute.PosixFileAttributeView;
import java.nio.file.attribute.PosixFileAttributes;
import java.nio.file.attribute.PosixFilePermission;
import java.nio.file.attribute.UserPrincipal;
import java.nio.file.attribute.UserPrincipalLookupService;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Arrays;

import static javax.ws.rs.core.Response.Status.BAD_REQUEST;
import static javax.ws.rs.core.Response.Status.INTERNAL_SERVER_ERROR;
import static javax.ws.rs.core.Response.Status.OK;
import static javax.ws.rs.core.Response.status;
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

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * for file I/O (save and load)
 */
@Path("file-io")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class FileIORest {

  private final static Logger logger = LoggerFactory.getLogger(FileIORest.class.getName());

  private static final MimeMap MIME_MAP;
  static {
    MimeMap mimeMap = null;
    try {
      mimeMap = new MimeMap();
    } catch (IOException ex) {
      logger.error(ex.getMessage());
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

  private String workingDirectory = System.getProperty("user.home");
  // private String workingDirectory = "/User/diego/notebook";

  @GET
  @Path("getWorkingDirectory")
  @Produces(MediaType.TEXT_PLAIN)
  public String getWorkingDirectory() {
    return workingDirectory;
  }

  @POST
  @Path("setWorkingDirectory")
  public void setWorkingDirectory(
      @FormParam("dir") String dir) {
    this.workingDirectory = dir; 
  }

  @GET
  @Path("getHomeDirectory")
  @Produces(MediaType.TEXT_PLAIN)
  public String getHomeDirector() {
    return System.getProperty("user.home");
  }

  @GET
  @Path("getLocalDrives")
  public List<String> getLocalDrives() {
    List<String> roots = new LinkedList<>();
    for (File file : File.listRoots()) {
      roots.add(file.getAbsolutePath());
    }
    return roots;
  }

  @GET
  @Path("analysePath")
  @Produces(MediaType.APPLICATION_JSON)
  public Map<String, Object> analysePath(@QueryParam("path") String path) {

    Map<String, Object> result = new HashMap<>();
    File file = new File(path);
    if (file.exists()) {
      result.put("exist", true);
      result.put("isDirectory", file.isDirectory());
    }else{
      result.put("exist", false);
      java.nio.file.Path parent = Paths.get(path).getParent();
      if (parent != null && new File(parent.toString()).exists()){
        result.put("parent", parent.toString());
      }
    }
    return result;
  }

  @GET
  @Path("getPosixFileOwnerAndPermissions")
  @Produces(MediaType.APPLICATION_JSON)
  public Response getPosixFileOwnerAndPermissions(@QueryParam("path") String pathString) throws IOException {
    pathString = removePrefix(pathString);
    java.nio.file.Path path = Paths.get(pathString);
    if(Files.exists(path)) {
      Map<String, Object> response = new HashMap<>();
      response.put("permissions", Files.getPosixFilePermissions(path));
      response.put("owner", Files.getOwner(path, LinkOption.NOFOLLOW_LINKS).getName());
      response.put("group", Files.readAttributes(path, PosixFileAttributes.class, LinkOption.NOFOLLOW_LINKS).group().getName());
      return status(OK).entity(response).build();
    } else {
      return status(BAD_REQUEST).build();
    }
  }

  @POST
  @Consumes("application/x-www-form-urlencoded")
  @Path("setPosixFileOwnerAndPermissions")
  @Produces(MediaType.TEXT_PLAIN)
  public Response setPosixFilePermissions(
    @FormParam("path") String pathString,
    @FormParam("owner") String owner,
    @FormParam("group") String group,
    @FormParam("permissions[]") List<String> permissions) throws IOException {
    HashSet<PosixFilePermission> filePermissions = getPosixFilePermissions(permissions);
    try {
      java.nio.file.Path path = Paths.get(pathString);

      Files.setPosixFilePermissions(path, filePermissions);

      UserPrincipalLookupService userPrincipalLookupService = FileSystems.getDefault().getUserPrincipalLookupService();
      if (StringUtils.isNoneBlank(owner)) {
        Files.setOwner(path, userPrincipalLookupService.lookupPrincipalByName(owner));
      }
      if (StringUtils.isNoneBlank(group)) {
        Files.getFileAttributeView(path, PosixFileAttributeView.class, LinkOption.NOFOLLOW_LINKS)
            .setGroup(userPrincipalLookupService.lookupPrincipalByGroupName(group));
      }
      return status(OK).build();
    } catch (FileSystemException e) {
      return status(INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
    }
  }


  @GET
  @Path("getStartUpDirectory")
  @Produces(MediaType.TEXT_PLAIN)
  public String getStartUpDirectory() {
    return System.getProperty("user.dir");
  }

  @POST
  @Path("createDirectory")
  public void createDirectory(
      @FormParam("path") String path) throws IOException {
    if (Files.exists(Paths.get(path))) {
      throw new FileAlreadyExistsException();
    }
    try {
      new File(path).mkdirs();
    } catch (Throwable t) {
      throw new DirectoryCreationException(ExceptionUtils.getStackTrace(t));
    }
  }

  @POST
  @Path("save")
  public void save(
      @FormParam("path") String path,
      @FormParam("content") String contentAsString) throws IOException {
    path = removePrefix(path);
    try {
      utils.saveFile(path, contentAsString);
    } catch (AccessDeniedException ade) {
      throw new FileAccessDeniedException(ExceptionUtils.getMessage(ade));
    }  catch (Throwable t) {
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

  @POST
  @Path("rename")
  public void saveIfNotExists(
      @FormParam("oldPath") String oldPath,
      @FormParam("newPath") String newPath,
      @FormParam("overwrite") boolean overwrite) throws IOException {
    newPath = removePrefix(newPath);
    if (Files.exists(Paths.get(newPath))) {
      if (new File(newPath).isDirectory()) {
        throw new FileAlreadyExistsAndIsDirectoryException();
      }
      if (!overwrite) {
        throw new FileAlreadyExistsException();
      }
    }
    try {
      utils.renameFile(oldPath, newPath);
    } catch (Throwable t) {
      throw new FileSaveException(ExceptionUtils.getStackTrace(t));
    }
  }

  private String readAsString(String path) {
    try {
      byte[] encoded = Files.readAllBytes(Paths.get(path));
      return StandardCharsets.UTF_8.decode(ByteBuffer.wrap(encoded)).toString();
    } catch (AccessDeniedException ade) {
      throw new FileAccessDeniedException(ExceptionUtils.getMessage(ade));
    } catch (Throwable t) {
      throw new FileOpenException(ExceptionUtils.getStackTrace(t));
    }
  }

  @GET
  @Path("load")
  @Produces(MediaType.TEXT_PLAIN)
  public String load(@QueryParam("path") String path) throws IOException {
    path = removePrefix(path);
    if (Files.exists(Paths.get(path))) {
      return readAsString(path);
    }
    for (String s : this.searchDirs) {
      String npath = s + "/" + path;
      if (Files.exists(Paths.get(npath))) {
        return readAsString(npath);
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
  @Path("isDirectory")
  public Boolean isDirectory(@QueryParam("path") String path){
    if (StringUtils.isEmpty(path))
      return false;
    File file = new File(path);
    return file.exists() && file.isDirectory();
  }

  @POST
  @Path("getDecoratedChildren")
  public List<Map<String, Object>> getDecoratedChildren(
      @FormParam("openFolders") String openFolderList) {
    List<String> openFolders = Arrays.asList(openFolderList.split("\\s*,\\s*"));
    return getChildren(openFolders.get(0), openFolders);
  }

  private static List<Map<String, Object>> getChildren(String path, List<String> openFolders) {
    File f = new File(path);
    File[] children = f.listFiles();
    List<Map<String, Object>> ret = new ArrayList<>(children.length);
    for (File cf : children) {
      if (!cf.isHidden()) {
        String childPath = cf.getPath();
        Map<String, Object> map = new HashMap<>();
        map.put("uri", childPath);
        map.put("modified", cf.lastModified());
        map.put("type", cf.isDirectory() ? "directory" : getMimeTypeForFileName(cf.getPath()));
        String prettyChildPath = childPath + "/";
        if (openFolders.contains(prettyChildPath)) {
          map.put("children", getChildren(childPath, openFolders));
        }
        ret.add(map);
      }
    }
    return ret;
  }


  @GET
  @Path("autocomplete")
  @Produces(MediaType.APPLICATION_JSON)
  public String [] autocomplete(@QueryParam("path") String path) throws IOException {

    /*
     * type of paths:
     * 
     * /a/b/c
     * ./a/b/c
     * ~/a/b/c
     * ~davide/a/b/c
     * ~davide
     * a
     */

    if (path.startsWith("~")) {
      int lp = path.lastIndexOf(File.separatorChar);
      String n="";
      if (lp>=0) {
        n = path.substring(lp);
        path = path.substring(0,lp);
      }
      try {
        String command = "ls -d " + path;
        Process shellExec = Runtime.getRuntime().exec(new String[]{"bash", "-c", command});

        BufferedReader reader = new BufferedReader(new InputStreamReader(shellExec.getInputStream()));
        String expandedPath = reader.readLine();

        // Only return a new value if expansion worked.
        // We're reading from stdin. If there was a problem, it was written
        // to stderr and our result will be null.
        if (expandedPath != null) {
          if (!expandedPath.startsWith("~"))
            path = expandedPath+n;
          else
            return new String[0];
        }
      } catch (java.io.IOException ex) {
        return new String[0];
      }
    }

    List<String> s = new ArrayList<String>();
    int lp = path.lastIndexOf(File.separatorChar);    

    File f = new File(path);
    if (f.exists() && f.isDirectory()) {
      File[] filesList = f.listFiles();
      for (File file : filesList) {
        if (path.endsWith(File.separator))
          s.add(path + file.getName());
        else
          s.add(path + File.separator + file.getName());
      }
    } else if (lp == -1) {
      final String p = path;
      FilenameFilter fileNameFilter = new FilenameFilter() {          
        @Override
        public boolean accept(File dir, String name) {
          if(name.startsWith(p))
            return true;
          return false;
        }
      };
      File dir = new File(".");
      File[] filesList = dir.listFiles(fileNameFilter);
      for (File file : filesList) {
        s.add(file.getName());
      }
    } else {
      String p = path.substring(0,lp+1);
      f = new File(p);
      if (f.exists() && f.isDirectory()) {
        final String n = path.substring(lp+1);
        FilenameFilter fileNameFilter = new FilenameFilter() {          
          @Override
          public boolean accept(File dir, String name) {
            if(name.startsWith(n))
              return true;
            return false;
          }
        };
        File[] filesList = f.listFiles(fileNameFilter);
        for (File file : filesList) {
          s.add(p + file.getName());
        }
      }
    }

    return  s.toArray(new String[s.size()]);
  }

  private HashSet<PosixFilePermission> getPosixFilePermissions(List<String> permissions) {
    HashSet<PosixFilePermission> filePermissions = new HashSet<>();
    for (String permission : permissions) {
      filePermissions.add(PosixFilePermission.valueOf(permission));
    }
    return filePermissions;
  }

  private static class DirectoryCreationException extends WebApplicationException {
    public DirectoryCreationException(String stackTrace) {
      super(status(Responses.PRECONDITION_FAILED)
          .entity("<h1>Directory Creation Failed</h1><pre>" + stackTrace + "</pre>")
          .type("text/plain")
          .build());
    }
  }

  private static class FileSaveException extends WebApplicationException {
    public FileSaveException(String stackTrace) {
      super(status(Responses.PRECONDITION_FAILED)
          .entity("<h1>Save failed</h1><pre>" + stackTrace + "</pre>")
          .type("text/plain")
          .build());
    }
  }

  private static class FileOpenException extends WebApplicationException {
    public FileOpenException(String stackTrace) {
      super(status(Responses.PRECONDITION_FAILED)
          .entity("<h1>Open failed</h1><pre>" + stackTrace + "</pre>")
          .type("text/plain")
          .build());
    }
  }

  private static class FileAlreadyExistsAndIsDirectoryException extends WebApplicationException {
    public FileAlreadyExistsAndIsDirectoryException() {
      super(status(Responses.PRECONDITION_FAILED)
          .entity("isDirectory").type("text/plain").build());
    }
  }

  private static class FileAlreadyExistsException extends WebApplicationException {
    public FileAlreadyExistsException() {
      super(status(Responses.CONFLICT)
          .entity("exists").type("text/plain").build());
    }
  }

  private static class FileDoesntExistException extends WebApplicationException {
    public FileDoesntExistException(String message) {
      super(status(Responses.NOT_FOUND)
          .entity(message).type("text/plain").build());
    }
  }

  private static class FileAccessDeniedException extends WebApplicationException {
    public FileAccessDeniedException(String message) {
      super(status(Responses.NOT_ACCEPTABLE)
        .entity(message).type("text/plain").build());
    }
  }

}
