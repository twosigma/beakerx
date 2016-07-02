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
package com.twosigma.beaker.core.module.elfinder.impl.commands;

import com.twosigma.beaker.core.module.elfinder.impl.AbstractJsonCommand;
import com.twosigma.beaker.core.module.elfinder.service.Command;
import com.twosigma.beaker.core.module.elfinder.impl.FsItemEx;
import com.twosigma.beaker.core.module.elfinder.service.FsService;
import org.json.JSONObject;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;

/**
 * This returns the dimensions on an image.
 */
public class DimCommand extends AbstractJsonCommand implements Command {
  @Override
  protected void execute(FsService fsService,
                         HttpServletRequest request,
                         ServletContext servletContext,
                         JSONObject json) throws Exception {
    String   target = request.getParameter("target");
    FsItemEx item   = findItem(fsService, target);
    // If it's not an image then just return empty JSON.
    if (item.getMimeType().startsWith("image")) {
      InputStream inputStream = null;
      try {
        inputStream = item.openInputStream();
        BufferedImage image  = ImageIO.read(inputStream);
        int           width  = image.getWidth();
        int           height = image.getHeight();
        json.put("dim", String.format("%dx%d", width, height));
      } catch (IOException ioe) {
        String message = "Failed load image to get dimensions: " + item.getPath();
        LOGGER.warning(message);

      } finally {
        if (inputStream != null) {
          try {
            inputStream.close();
          } catch (IOException ioe) {
            LOGGER.severe("Failed to close stream to: " + item.getPath() + "\n" + ioe);
          }
        }
      }

    } else {
      LOGGER.warning("dim command called on non-image: " + item.getPath());
    }
  }
}
