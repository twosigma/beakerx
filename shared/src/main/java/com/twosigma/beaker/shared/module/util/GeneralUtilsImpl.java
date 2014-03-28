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

package com.twosigma.beaker.shared.module.util;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.StandardCopyOption;
import java.nio.file.StandardOpenOption;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * BasicUtilsImpl
 *
 */
public class GeneralUtilsImpl implements GeneralUtils {

  @Override
  public void openUrl(String url) {
    String osName = System.getProperty("os.name");
    boolean onMac = osName.equals("Mac OS X");
    boolean onWin = osName.startsWith("Windows");
    String[] cmd = {"xdg-open", url};
    if (onMac) cmd[0] = "open";
    if (onWin) cmd[0] = "explorer";
    try {
      Runtime.getRuntime().exec(cmd);
    } catch (IOException e) {
      Logger.getLogger(GeneralUtilsImpl.class.getName())
          .log(Level.INFO, "ERROR opening url {0}", url);
    }
  }

  @Override
  public String readFile(Path path) {
    if (path == null) {
      Logger.getLogger(GeneralUtilsImpl.class.getName())
          .log(Level.INFO, "ERROR locating file {0}", path);
      return null;
    }
    byte[] encoded = null;
    try {
      encoded = Files.readAllBytes(path);
    } catch (IOException ex) {
      Logger.getLogger(GeneralUtilsImpl.class.getName())
          .log(Level.INFO, "ERROR reading file {0}", path);
      return null;
    }
    return StandardCharsets.UTF_8.decode(ByteBuffer.wrap(encoded)).toString();
  }

  @Override
  public String readFile(File file) {
    return this.readFile(castToPath(file));
  }

  @Override
  public String readFile(String file) {
    return this.readFile(castToPath(file));
  }

  @Override
  public String readFile(URI file) {
    return this.readFile(castToPath(file));
  }

  @Override
  public void saveFile(Path file, String content) throws IOException {
    Files.write(file, content.getBytes(StandardCharsets.UTF_8),
        StandardOpenOption.CREATE,
        StandardOpenOption.TRUNCATE_EXISTING);
  }

  @Override
  public void saveFile(File file, String content) throws IOException {
    this.saveFile(castToPath(file), content);
  }

  @Override
  public void saveFile(String file, String content) throws IOException {
    this.saveFile(castToPath(file), content);
  }

  @Override
  public void saveFile(URI file, String content) throws IOException {
    this.saveFile(castToPath(file), content);
  }

  @Override
  public void ensureDirectoryExists(Path directory) throws IOException {
    if (Files.exists(directory)) {
      if (!Files.isDirectory(directory)) {
        throw new RuntimeException("failed to create " + directory);
      }
    } else {
      if (!directory.toFile().mkdirs()) {
        throw new RuntimeException("failed to create " + directory);
      }
    }
  }

  @Override
  public void ensureDirectoryExists(File directory) throws IOException {
    this.ensureDirectoryExists(castToPath(directory));
  }

  @Override
  public void ensureDirectoryExists(String directory) throws IOException {
    this.ensureDirectoryExists(castToPath(directory));
  }

  @Override
  public void ensureDirectoryExists(URI directory) throws IOException {
    this.ensureDirectoryExists(castToPath(directory));
  }

  @Override
  public void ensureFileHasContent(Path targetFile, Path copyFromIfMissing) throws IOException {
    if (isFileValid(targetFile)) {
      return;
    }

    // target has no content,
    // try copying from the source.
    if (isFileValid(copyFromIfMissing)) {
      try {
        Files.copy(copyFromIfMissing, targetFile, StandardCopyOption.REPLACE_EXISTING);
      } catch (IOException e) {
        Logger.getLogger(GeneralUtilsImpl.class.getName())
          .log(Level.INFO, "ERROR copying from {0} to {1}", new Object[]{copyFromIfMissing, targetFile});
        throw e;
      }
    } else {
      // the source also has no content?!
      throw new RuntimeException("ERROR ensuring file,"
          + "the source file " + copyFromIfMissing + "is also empty");
    }
  }

  @Override
  public void ensureFileHasContent(File targetFile, File copyFromIfMissing) throws IOException {
    ensureFileHasContent(castToPath(targetFile), castToPath(copyFromIfMissing));
  }

  @Override
  public void ensureFileHasContent(String targetFile, String copyFromIfMissing) throws IOException {
    ensureFileHasContent(castToPath(targetFile), castToPath(copyFromIfMissing));
  }

  @Override
  public void ensureFileHasContent(URI targetFile, URI copyFromIfMissing) throws IOException {
    ensureFileHasContent(castToPath(targetFile), castToPath(copyFromIfMissing));
  }


  @Override
  public String createTempDirectory(Path dir, String prefix) throws IOException {
    Path tempDir = Files.createTempDirectory(dir, prefix);
    recursiveDeleteOnShutdownHook(tempDir);
    return tempDir.toString();
  }

  @Override
  public String createTempDirectory(File dir, String prefix) throws IOException {
    return this.createTempDirectory(castToPath(dir), prefix);
  }

  @Override
  public String createTempDirectory(String dir, String prefix) throws IOException {
    return this.createTempDirectory(castToPath(dir), prefix);
  }

  @Override
  public String createTempDirectory(URI dir, String prefix) throws IOException {
    return this.createTempDirectory(castToPath(dir), prefix);
  }

  @Override
  public void copyIfSrcExistsAndTargetDoesnt(Path srcFile, Path targetFile) throws IOException {
    if (Files.exists(srcFile) && Files.notExists(targetFile)) {
      Files.copy(srcFile, targetFile);
    }
  }

  @Override
  public void copyIfSrcExistsAndTargetDoesnt(File srcFile, File targetFile) throws IOException {
    this.copyIfSrcExistsAndTargetDoesnt(castToPath(srcFile), castToPath(targetFile));
  }

  @Override
  public void copyIfSrcExistsAndTargetDoesnt(String srcFile, String targetFile) throws IOException {
    this.copyIfSrcExistsAndTargetDoesnt(castToPath(srcFile), castToPath(targetFile));
  }

  @Override
  public void copyIfSrcExistsAndTargetDoesnt(URI srcFile, URI targetFile) throws IOException {
    this.copyIfSrcExistsAndTargetDoesnt(castToPath(srcFile), castToPath(targetFile));
  }

  private Path castToPath(Object locator) {
    final Path path;
    if (locator instanceof Path) {
      path = (Path) locator;
    } else if (locator instanceof String) {
      path = Paths.get((String) locator);
    } else if (locator instanceof File) {
      path = ((File) locator).toPath();
    } else if (locator instanceof URI) {
      path = Paths.get((URI) locator);
    } else {
      path = null;
    }
    return path;
  }

  private boolean isFileValid(Object file) {
    String content = readFile(castToPath(file));
    return content != null && !content.isEmpty();
  }

    public static void recursiveDeleteOnShutdownHook(final Path path) {
    Runtime.getRuntime().addShutdownHook(new Thread(
        new Runnable() {
      @Override
      public void run() {
        try {
          Files.walkFileTree(path, new SimpleFileVisitor<Path>() {
            @Override
            public FileVisitResult visitFile(Path file,
                @SuppressWarnings("unused") BasicFileAttributes attrs)
                throws IOException {
              Files.delete(file);
              return FileVisitResult.CONTINUE;
            }

            @Override
            public FileVisitResult postVisitDirectory(Path dir, IOException e)
                throws IOException {
              if (e == null) {
                Files.delete(dir);
                return FileVisitResult.CONTINUE;
              }
              throw e;
            }
          });
        } catch (IOException e) {
          throw new RuntimeException("Failed to delete " + path, e);
        }
      }
    }));
  }
}
