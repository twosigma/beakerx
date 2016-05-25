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

import com.mortennobel.imagescaling.DimensionConstrain;
import com.mortennobel.imagescaling.ResampleOp;
import com.twosigma.beaker.core.module.elfinder.impl.AbstractCommand;
import com.twosigma.beaker.core.module.elfinder.service.Command;
import com.twosigma.beaker.core.module.elfinder.impl.FsItemEx;
import com.twosigma.beaker.core.module.elfinder.service.FsService;
import org.apache.commons.lang3.time.DateUtils;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

public class TmbCommand extends AbstractCommand implements Command {
  @Override
  public void execute(FsService fsService, HttpServletRequest request, HttpServletResponse response,
                      ServletContext servletContext) throws Exception {
    String        target = request.getParameter("target");
    FsItemEx      fsi    = super.findItem(fsService, target);
    InputStream   is     = fsi.openInputStream();
    BufferedImage image  = ImageIO.read(is);
    int           width  = fsService.getServiceConfig().getTmbWidth();
    ResampleOp    rop    = new ResampleOp(DimensionConstrain.createMaxDimension(width, -1));
    rop.setNumberOfThreads(4);
    BufferedImage         b    = rop.filter(image, null);
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    ImageIO.write(b, "png", baos);
    baos.toByteArray();
    is.close();

    response.setHeader("Last-Modified", toGmtString(DateUtils.addDays(Calendar.getInstance().getTime(), 2 * 360)));
    response.setHeader("Expires", toGmtString(DateUtils.addDays(Calendar.getInstance().getTime(), 2 * 360)));

    ImageIO.write(b, "png", response.getOutputStream());
  }

  private String toGmtString(Date date) {
    //date formatter
    SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    //getting default timeZone
    TimeZone timeZone = TimeZone.getDefault();
    //getting current time
    Calendar cal = Calendar.getInstance();
    cal.setTime(date);
    //adding / substracting curren't timezone's offset
    cal.add(Calendar.MILLISECOND, -1 * timeZone.getRawOffset());
    //formatting and returning string of date
    return sd.format(cal.getTime());
  }
}
