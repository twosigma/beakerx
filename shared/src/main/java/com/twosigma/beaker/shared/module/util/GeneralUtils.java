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

package com.twosigma.beaker.shared.module.util;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Path;

/**
 * BasicUtils
 *
 */
public interface GeneralUtils {

  public void openUrl(String url);

  /**
   * readFile
   * returns the content of the file in a String using UTF8 encoding;
   * Note it doesn't throw IOException when attempting to read and just return null;
   * @param path
   * @return the content of file in a String and null if any thing goes wrong.
   */
  public String readFile(Path file);
  public String readFile(File file);
  public String readFile(String file);
  public String readFile(URI file);

  /**
   * saveFile
   * saves the content to file
   * @param file
   * @param content
   * @throws IOException
   */
  public void saveFile(Path file, String content) throws IOException;
  public void saveFile(File file, String content) throws IOException;
  public void saveFile(String file, String content) throws IOException;
  public void saveFile(URI file, String content) throws IOException;


  /**
   * ensureDirectoryExists
   * ensures a directory exists, if it doesn't exist, create it as well as all needed parents.
   * If it exists but is not a directory or fail to mkdir, exception will be thrown.
   * @param directory
   * @throws IOException
   */
  public void ensureDirectoryExists(Path directory) throws IOException;
  public void ensureDirectoryExists(File directory) throws IOException;
  public void ensureDirectoryExists(String directory) throws IOException;
  public void ensureDirectoryExists(URI directory) throws IOException;


  /**
   * ensureFile
   * ensures the targetFile exist and has non empty content, if not, read and copy from srcFile
   * @param targetFile
   * @param srcFile
   * @throws IOException
   * @throws RuntimeException when srcFile is also empty
   */
  public void ensureFileHasContent(Path targetFile, Path srcFile) throws IOException;
  public void ensureFileHasContent(File targetFile, File srcFile) throws IOException;
  public void ensureFileHasContent(String targetFile, String srcFile) throws IOException;
  public void ensureFileHasContent(URI targetFile, URI srcFile) throws IOException;

  /**
   * createTempDirectory
   * creates a temp directory and add shutdown hook to delete the directory recursively
   * when the VM shuts down.
   * @param dir
   * @param prefix
   * @return the path to the created directory.
   */
  public String createTempDirectory(Path dir, String prefix) throws IOException;
  public String createTempDirectory(File dir, String prefix) throws IOException;
  public String createTempDirectory(String dir, String prefix) throws IOException;
  public String createTempDirectory(URI dir, String prefix) throws IOException;

  /**
   * copyIfSrcExistsAndTargetDoesnt
   * copies if source exists and target doesn't exist
   * @param srcFile
   * @param targetFile
   * @throws IOException
   */
  public void copyIfSrcExistsAndTargetDoesnt(Path srcFile, Path targetFile) throws IOException;
  public void copyIfSrcExistsAndTargetDoesnt(File srcFile, File targetFile) throws IOException;
  public void copyIfSrcExistsAndTargetDoesnt(String srcFile, String targetFile) throws IOException;
  public void copyIfSrcExistsAndTargetDoesnt(URI srcFile, URI targetFile) throws IOException;

}
