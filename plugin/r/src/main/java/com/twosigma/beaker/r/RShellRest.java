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
package com.twosigma.beaker.r;

import java.io.File;
import java.io.InputStream;
import java.io.IOException;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.swing.ImageIcon;
import javax.ws.rs.FormParam;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import javax.imageio.ImageIO;

import com.google.inject.Singleton;
import com.twosigma.beaker.json.serializer.StringObject;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.object.TableDisplay;

import org.rosuda.REngine.Rserve.RConnection;
import org.rosuda.REngine.Rserve.RserveException;
import org.rosuda.REngine.REXPMismatchException;
import org.rosuda.REngine.REXP;
import org.rosuda.REngine.RList;

/**
 * Glue between the REST calls from the R plugin to the Rserve module that manages the R process.
 */
@Singleton
@Produces(MediaType.APPLICATION_JSON)
@Path("rsh")
public class RShellRest {

  private static String beginMagic = "**beaker_begin_magic**";
  private static String endMagic = "**beaker_end_magic**";
  private final Map<String, RConnection> _shells = new HashMap<String, RConnection>();
  private ROutputHandler _rOutputHandler = null;
    private RConnection _con = null;

  public RShellRest()
          throws IOException, RserveException {
  }

  public void setOutput(InputStream stream) {
    _rOutputHandler = new ROutputHandler(stream, beginMagic, endMagic);
    _rOutputHandler.start();
  }

  @POST
  @Path("getShell")
  public StringObject getShell(@FormParam("shellid") String shellID)
          throws InterruptedException, RserveException {
    if (!shellID.isEmpty() && _shells.containsKey(shellID)) {
      // System.out.println("found shell " + shellID + " on server.");
      return new StringObject(shellID);
    } else {
      return newShell();
    }
  }

  @POST
  @Path("newShell")
  public StringObject newShell()
          throws InterruptedException, RserveException {
    String shellID = UUID.randomUUID().toString();
    newEvaluator(shellID);
    return new StringObject(shellID);
  }

  @POST
  @Path("newShell2")
  public StringObject newShell2()
          throws InterruptedException, RserveException {
    String shellID = UUID.randomUUID().toString();
    newEvaluator(shellID);
    return new StringObject(shellID);
  }

  @POST
  @Path("newShell3")
  public Response newShell3()
          throws InterruptedException, UnknownHostException, RserveException {
    String shellID = UUID.randomUUID().toString();
    newEvaluator(shellID);
    Response res = Response
            .status(Response.Status.OK)
            .header("Access-Control-Allow-Origin", "http://" + InetAddress.getLocalHost().getHostName() + ":1088")
            .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
            .header("Access-Control-Allow-Headers", "Authorization, X-Requested-With, Content-Type, Origin, Accept")
            .header("Access-Control-Expose-Headers", "Authorization, X-Requested-With, Content-Type, Origin, Accept")
            .header("Access-Control-Allow-Credentials", "true")
            .entity(new StringObject(shellID))
            .build();
    return res;
  }

  @OPTIONS
  @Path("newShell3")
  public Response newShell3OP()
          throws InterruptedException, UnknownHostException, RserveException {
    String shellID = UUID.randomUUID().toString();
    newEvaluator(shellID);
    Response res = Response
            .status(Response.Status.OK)
            .header("Access-Control-Allow-Origin", "http://" + InetAddress.getLocalHost().getHostName() + ":1088")
            .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
            .header("Access-Control-Allow-Headers", "Authorization, X-Requested-With, Content-Type, Origin, Accept")
            .header("Access-Control-Expose-Headers", "Authorization, X-Requested-With, Content-Type, Origin, Accept")
            .header("Access-Control-Allow-Credentials", "true")
            .build();
    return res;
  }

  private String readFile(String name) {
    File file = new File(name);
    try {
      FileInputStream fis = new FileInputStream(file);
      byte[] data = new byte[(int) file.length()];
      fis.read(data);
      fis.close();
      return new String(data, "UTF-8");
    } catch (FileNotFoundException e) {
      System.out.println("ERROR reading default notebook: " + e);
    } catch (IOException e) {
      System.out.println("ERROR reading default notebook: " + e);
    }
    return null;
  }

  // R SVG has ids that need to be made globally unique.  Plus we
  // remove the xml version string, and any blank data attributes,
  // since these just cause errors on chrome's console.
  private String fixSvgResults(String xml) {
    String unique = "b" + Long.toString(System.currentTimeMillis());
    xml = xml.replace("id=\"glyph", "id=\"" + unique + "glyph");
    xml = xml.replace("xlink:href=\"#glyph", "xlink:href=\"#" + unique + "glyph");
    xml = xml.replace("d=\"\"", "");
    xml = xml.replace("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n", "");
    return xml;
  }

  private boolean addSvgResults(String name, SimpleEvaluationObject obj) {
    try {
      File file = new File(name);
      if (file.length() > 0) {
        FileInputStream fis = new FileInputStream(file);
        byte[] data = new byte[(int) file.length()];
        fis.read(data);
        fis.close();
        String contents = new String(data, "UTF-8");
        obj.finished(fixSvgResults(contents));
        return true;
      }
    } catch (FileNotFoundException e) {
      System.out.println("ERROR reading SVG results: " + e);
    } catch (IOException e) {
      System.out.println("IO error on " + name + " " + e);
    }
    return false;
  }

  // should support multiple images? XXX
  private boolean addPngResults(String name, SimpleEvaluationObject obj) {
    try {
      File file = new File(name);
      if (file.length() > 0) {
        obj.finished(new ImageIcon(ImageIO.read(file)));
        return true;
      }
    } catch (IOException e) {
      System.out.println("IO error on " + name + " " + e);
    }
    return false;
  }

  private boolean isDataFrame(REXP result, SimpleEvaluationObject obj) {
    TableDisplay table;
    try {
      RList list = result.asList();
      int cols = list.size();
      String[] names = list.keys();
      if (null == names) {
        return false;
      }
      String[][] array = new String[cols][];
      List<List> values = new ArrayList<List>();
      List<Class> classes = new ArrayList<Class>();

      for (int i = 0; i < cols; i++) {
        // XXX should identify numeric columns
        classes.add("".getClass());
        array[i] = list.at(i).asStrings();
      }
      if (array.length < 1) {
        return false;
      }
      for (int j = 0; j < array[0].length; j++) {
        List<String> row = new ArrayList<String>();
        for (int i = 0; i < cols; i++) {
          if (array[i].length != array[0].length) {
            return false;
          }
          row.add(array[i][j]);
        }
        values.add(row);
      }
      table = new TableDisplay(values, Arrays.asList(names), classes);
    } catch (REXPMismatchException e) {
      return false;
    }
    obj.finished(table);
    return true;
  }

  @POST
  @Path("evaluate")
  public SimpleEvaluationObject evaluate(@FormParam("shellID") String shellID,
          @FormParam("code") String code)
          throws InterruptedException, REXPMismatchException {
    boolean gotMismatch = false;
    // System.out.println("evaluating, shellID = " + shellID + ", code = " + code);
    SimpleEvaluationObject obj = new SimpleEvaluationObject(code);
    obj.started();
    RConnection con = getEvaluator(shellID);
    String dotDir = System.getProperty("user.home") + "/.beaker";
    String file = dotDir + "/rplot.svg";
    file = "rplot.svg"; // XXX hack, something about the windows file path crashes R.
    try {
      java.nio.file.Path p = java.nio.file.Paths.get(file);
      java.nio.file.Files.deleteIfExists(p);
    } catch (IOException e) {
      // ignore
    }

    try {
      // direct graphical output
      con.eval("svg('" + file + "')");
      String tryCode = "beaker_eval_=try({" + code + "\n},silent=TRUE)";
      REXP result = con.eval(tryCode);

      /*
       if (null != result)
       System.out.println("result class = " + result.getClass().getName());
       else
       System.out.println("result = null");
       */

      if (null == result) {
        obj.finished("");
      } else if (result.inherits("try-error")) {
        String prefix = "Error in try({ : ";
        String rs = result.asString();
        if (rs.substring(0, prefix.length()).equals(prefix)) {
          rs = rs.substring(prefix.length());
        }
        obj.error(rs);
      } else if (isDataFrame(result, obj)) {
        // nothing
      } else {
        _rOutputHandler.reset(obj);
        con.eval("print(\"" + beginMagic + "\")");
        con.eval("print(beaker_eval_)");
        con.eval("print(\"" + endMagic + "\")");
      }
    } catch (RserveException e) {
      obj.error(e.getMessage());
    } catch (REXPMismatchException e) {
      gotMismatch = true;
    }

    // flush graphical output
    try {
      con.eval("dev.off()");
    } catch (RserveException e) {
      obj.error("from dev.off(): " + e.getMessage());
    }

    // addPngResults(file, obj);
    addSvgResults(file, obj);

    return obj;
  }

  @POST
  @Path("autocomplete")
  public List<String> autocomplete(
          @FormParam("shellID") String shellID,
          @FormParam("code") String code,
          @FormParam("caretPosition") int caretPosition)
          throws InterruptedException {

    List<String> completionStrings = new ArrayList<String>(0);
    //TODO
    return completionStrings;
  }

  private void newEvaluator(String id) {
      if (_con != null) {
	  _shells.put(id, _con);
	  return;
      }
    try {
      RConnection con = new RConnection();
      _shells.put(id, con);
      _con = con;
    } catch (RserveException e) {
      System.out.println("RserveException");
    }
  }

  private RConnection getEvaluator(String shellID) {
    if (shellID == null || shellID.isEmpty()) {
      shellID = "default";
    }
    return _shells.get(shellID);
  }
}
