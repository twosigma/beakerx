package com.twosigma.beakerx.kernel.magic.command;

import com.twosigma.beakerx.kernel.magic.command.functionality.FileService;
import org.apache.commons.io.FileUtils;

import java.io.File;

public class FileServiceImpl implements FileService {

  @Override
  public void delete(File file) {
    FileUtils.deleteQuietly(file);
  }
}
