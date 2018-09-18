package com.twosigma.beakerx;

import com.twosigma.beakerx.kernel.magic.command.functionality.FileService;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class FileServiceMock implements FileService {

  private List<String> deletedFiles = new ArrayList<>();

  @Override
  public void delete(File file) {
    this.deletedFiles.add(file.getAbsolutePath());
  }

  public List<String> getDeletedFiles() {
    return deletedFiles;
  }
}
