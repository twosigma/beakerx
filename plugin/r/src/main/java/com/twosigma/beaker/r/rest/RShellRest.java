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
package com.twosigma.beaker.r.rest;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.nio.file.attribute.PosixFilePermission;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.util.Set;
import java.util.UUID;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import com.google.inject.Singleton;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.object.TableDisplay;
import com.twosigma.beaker.r.module.ErrorGobbler;
import com.twosigma.beaker.r.module.ROutputHandler;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.http.client.fluent.Request;
import org.apache.http.client.ClientProtocolException;
import org.rosuda.REngine.Rserve.RConnection;
import org.rosuda.REngine.Rserve.RserveException;
import org.rosuda.REngine.REXPMismatchException;
import org.rosuda.REngine.REXP;
import org.rosuda.REngine.RList;

/**
 * Glue between the REST calls from the R plugin to the Rserve module that manages the R process.
 */
@Path("rsh")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class RShellRest {

  private boolean useMultipleRservers = windows();

  private static final String BEGIN_MAGIC = "**beaker_begin_magic**";
  private static final String END_MAGIC = "**beaker_end_magic**";
  private final Map<String, RServer> shells = new HashMap<>();
  private int svgUniqueCounter = 0;
  private int corePort = -1;
  private RServer rServer = null;
  private final Base64 encoder;

  public RShellRest() {
    this.encoder = new Base64();
  }

  int getPortFromCore()
    throws IOException, ClientProtocolException
  {
    String password = System.getenv("beaker_core_password");
    String auth = encoder.encodeBase64String(("beaker:" + password).getBytes("ASCII"));
    String response = Request.Get("http://127.0.0.1:" + corePort +
                                  "/rest/plugin-services/getAvailablePort")
      .addHeader("Authorization", "Basic " + auth)
      .execute().returnContent().asString();
    return Integer.parseInt(response);
  }

  private String makeTemp(String base, String suffix)
    throws IOException
  {
    File dir = new File(System.getenv("beaker_tmp_dir"));
    File tmp = File.createTempFile(base, suffix, dir);
    if (!windows()) {
      Set<PosixFilePermission> perms = EnumSet.of(PosixFilePermission.OWNER_READ,
                                                  PosixFilePermission.OWNER_WRITE);
      Files.setPosixFilePermissions(tmp.toPath(), perms);
    }
    return tmp.getAbsolutePath();
  }

  private BufferedWriter openTemp(String location)
    throws UnsupportedEncodingException, FileNotFoundException
  {
    // only in Java :(
    return new BufferedWriter(new OutputStreamWriter(new FileOutputStream(location), "ASCII"));
  }

  String writeRserveScript(int port, String password)
    throws IOException
  {
    String pwlocation = makeTemp("BeakerRserve", ".pwd");
    BufferedWriter bw = openTemp(pwlocation);
    bw.write("beaker " + password + "\n");
    bw.close();

    if (windows()) {
	// R chokes on backslash in windows path, need to quote them
	pwlocation = pwlocation.replace("\\", "\\\\");
    }

    String location = makeTemp("BeakerRserveScript", ".r");
    bw = openTemp(location);
    bw.write("library(Rserve)\n");
    bw.write("run.Rserve(auth=\"required\", plaintext=\"enable\", port=" +
             port + ", pwdfile=\"" + pwlocation + "\")\n");
    bw.close();

    return location;
  }

  private RServer startRserve()
    throws IOException, RserveException, REXPMismatchException
  {
    int port = getPortFromCore();
    String pluginInstallDir = System.getProperty("user.dir");
    String password = RandomStringUtils.random(40, true, true);
    String[] command = {"Rscript", writeRserveScript(port, password)};

    // Need to clear out some environment variables in order for a
    // new Java process to work correctly.
    // XXX not always necessary, use getPluginEnvps from BeakerConfig?
    // or just delete?
    List<String> environmentList = new ArrayList<>();
    for (Entry<String, String> entry : System.getenv().entrySet()) {
      if (!("CLASSPATH".equals(entry.getKey()))) {
        environmentList.add(entry.getKey() + "=" + entry.getValue());
      }
    }
    String[] environmentArray = new String[environmentList.size()];
    environmentList.toArray(environmentArray);

    Process rServe = Runtime.getRuntime().exec(command, environmentArray);
    BufferedReader rServeOutput =
      new BufferedReader(new InputStreamReader(rServe.getInputStream(), "ASCII"));
    String line = null;
    while ((line = rServeOutput.readLine()) != null) {
      if (line.indexOf("(This session will block until Rserve is shut down)") >= 0) {
        break;
      } else {
        // System.out.println("Rserve>" + line);
      }
    }
    ErrorGobbler errorGobbler = new ErrorGobbler(rServe.getErrorStream());
    errorGobbler.start();

    ROutputHandler handler = new ROutputHandler(rServe.getInputStream(),
                                                BEGIN_MAGIC, END_MAGIC);
    handler.start();

    RConnection rconn = new RConnection("127.0.0.1", port);
    rconn.login("beaker", password);
    int pid = rconn.eval("Sys.getpid()").asInteger();
    return new RServer(rconn, handler, errorGobbler, port, password, pid);
  }

  // set the port used for communication with the Core server
  public void setCorePort(int corePort)
    throws IOException
  {
    this.corePort = corePort;
  }

  @POST
  @Path("getShell")
  public String getShell(@FormParam("shellid") String shellId, @FormParam("sessionId") String sessionId)
    throws InterruptedException, RserveException, IOException, REXPMismatchException
  {
    // if the shell doesnot already exist, create a new shell
    if (shellId.isEmpty() || !this.shells.containsKey(shellId)) {
      shellId = UUID.randomUUID().toString();
      newEvaluator(shellId,sessionId);
      return shellId;
    }
    return shellId;
  }

  private boolean windows() {
    return System.getProperty("os.name").contains("Windows");
  }

  @POST
  @Path("evaluate")
  public SimpleEvaluationObject evaluate(
      @FormParam("shellID") String shellID,
      @FormParam("code") String code) 
    throws InterruptedException, REXPMismatchException, IOException
  {
    SimpleEvaluationObject obj = new SimpleEvaluationObject(code);
    obj.started();
    RServer server = getEvaluator(shellID);
    RConnection con = server.connection;

    server.outputHandler.reset(obj);
    server.errorGobbler.reset(obj);

    String file = windows() ? "rplot.svg" : makeTemp("rplot", ".svg");
    try {
      java.nio.file.Path p = java.nio.file.Paths.get(file);
      java.nio.file.Files.deleteIfExists(p);
    } catch (IOException e) {
      // ignore
    }

    try {
      // direct graphical output
      String tryCode;
      con.eval("do.call(svg,c(list('" + file + "'), beaker::saved_svg_options))");
      tryCode = "beaker_eval_=withVisible(try({" + code + "\n},silent=TRUE))";
      REXP result = con.eval(tryCode);

      if (false) {
        if (null != result)
          System.out.println("result class = " + result.getClass().getName());
        else
          System.out.println("result = null");
      }

      if (null == result) {
        obj.finished("");
      } else if (isError(result, obj)) {
      } else if (!isVisible(result, obj)) {
        obj.finished("");
      } else if (isDataFrame(result, obj)) {
        // nothing
      } else {
        String finish = "print(\"" + BEGIN_MAGIC + "\")\n" +
          "print(beaker_eval_$value)\n" +
          "print(\"" + END_MAGIC + "\")\n";
        con.eval(finish);
      }
    } catch (RserveException e) {
      if (127 == e.getRequestReturnCode()) {
        obj.error("Interrupted");
      } else {
        obj.error(e.getMessage());
      }
    }

    // flush graphical output
    try {
      con.eval("dev.off()");
    } catch (RserveException e) {
      obj.error("from dev.off(): " + e.getMessage());
    }

    addSvgResults(file, obj);
    
    server.outputHandler.reset(null);
    server.errorGobbler.reset(null);

    return obj;
  }

  @POST
  @Path("autocomplete")
  public List<String> autocomplete(
          @FormParam("shellID") String shellID,
          @FormParam("code") String code,
          @FormParam("caretPosition") int caretPosition)
          throws InterruptedException {

    List<String> completionStrings = new ArrayList<>(0);
    // XXX TODO
    return completionStrings;
  }

  @POST
  @Path("exit")
  public void exit(@FormParam("shellID") String shellID) {
  }

  @POST
  @Path("interrupt")
  public void interrupt(@FormParam("shellID") String shellID)
    throws IOException
  {
    if (windows()) {
      return;
    }
    RServer server = getEvaluator(shellID);
    server.errorGobbler.expectExtraLine();
    Runtime.getRuntime().exec("kill -SIGINT " + server.pid);
  }

  private void newEvaluator(String id, String sessionId)
    throws RserveException, IOException, REXPMismatchException
  {
    RServer newRs;
    if (useMultipleRservers) {
      newRs = startRserve();
    } else {
      if (null == rServer) {
        rServer = startRserve();
      }
      RConnection rconn = new RConnection("127.0.0.1", rServer.port);
      rconn.login("beaker", rServer.password);
      int pid = rconn.eval("Sys.getpid()").asInteger();
      newRs = new RServer(rconn, rServer.outputHandler, rServer.errorGobbler, rServer.port, rServer.password, pid);
    }
    newRs.sessionId = sessionId;
    this.shells.put(id, newRs);
    
    RConnection con = newRs.connection;
    try {
      String initCode = "devtools::load_all(Sys.getenv('beaker_r_init'), " +
          "quiet=TRUE, export_all=FALSE)\n" +
          "beaker:::set_session('" + sessionId + "')\n";
      REXP result = con.eval(initCode);
    } catch(Exception e) { e.printStackTrace(); }
  }

  private RServer getEvaluator(String shellID) {
    if (shellID == null || shellID.isEmpty()) {
      shellID = "default";
    }
    return this.shells.get(shellID);
  }

  // Remove the xml version string, and any blank data attributes,
  // since these just cause errors on chrome's console.  Then expand
  // all symbol/use elements manually.  This is because there is a
  // disagreement between firefox and chrome on how to interpret how
  // CSS applies to the resulting hidden DOM elements.  See github
  // Issue #987.  Finally, remove all definitions since they have been
  // expanded and are no longer needed.  This is done with hackey
  // string matching instead of truly parsing the XML.
  private String fixSvgResults(String xml) {
    Pattern pat = Pattern.compile("<use xlink:href=\"#([^\"]+)\" x=\"([^\"]+)\" y=\"([^\"]+)\"/>");
    String unique = "b" + Integer.toString(svgUniqueCounter++);
    xml = xml.replace("d=\"\"", "");
    xml = xml.replace("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n", "");
    
    while (true) {
      Matcher matcher = pat.matcher(xml);
      if (!matcher.find()) {
        break;
      }
      String expansion = "<g transform=\"translate(" + matcher.group(2) + "," + matcher.group(3) + ")\">\n";
      String glyph = matcher.group(1);
      int gi = xml.indexOf(glyph);
      int pathStart = xml.indexOf("<path", gi);
      int pathStop = xml.indexOf("/>", pathStart);
      String path = xml.substring(pathStart, pathStop + 2);
      expansion = expansion + path + "</g>\n";
      xml = xml.substring(0, matcher.start()) + expansion + xml.substring(matcher.end());
    }

    int defsStart = xml.indexOf("<defs>");
    if (defsStart >= 0) {
      int defsStop = xml.indexOf("</defs>");
      xml = xml.substring(0, defsStart) + xml.substring(defsStop + 7);
    }
    
    return xml;
  }

  private boolean addSvgResults(String name, SimpleEvaluationObject obj) {
    File file = new File(name);
    if (file.length() > 0) {
      try (FileInputStream fis = new FileInputStream(file)) {
        byte[] data = new byte[(int) file.length()];
        fis.read(data);
        fis.close();
        String contents = new String(data, "UTF-8");
        obj.finished(fixSvgResults(contents));
        return true;
      } catch (FileNotFoundException e) {
        System.out.println("ERROR reading SVG results: " + e);
      } catch (IOException e) {
        System.out.println("IO error on " + name + " " + e);
      }
    }
    return false;
  }

  private static boolean isError(REXP result, SimpleEvaluationObject obj) {
    try {
      REXP value = result.asList().at(0);
      if (value.inherits("try-error")) {
        String prefix = "Error in try({ : ";
        String rs = value.asString();
        if (rs.substring(0, prefix.length()).equals(prefix)) {
          rs = rs.substring(prefix.length());
        }
        obj.error(rs);
        return true;
      }
    } catch (REXPMismatchException e) {
    } catch (NullPointerException e) {
    }
    return false;
  }

  private static boolean isVisible(REXP result, SimpleEvaluationObject obj) {
    try {
      int[] asInt = result.asList().at(1).asIntegers();
      if (asInt.length == 1 && asInt[0] != 0) {
        String[] names = result.asList().keys();
        return true;
      }
    } catch (REXPMismatchException e) {
    } catch (NullPointerException e) {
    }
    return false;
  }

  private static boolean isDataFrame(REXP result, SimpleEvaluationObject obj) {
    TableDisplay table;
    try {
      RList list = result.asList().at(0).asList();
      int cols = list.size();
      String[] names = list.keys();
      if (null == names) {
        return false;
      }
      String[][] array = new String[cols][];
      List<List> values = new ArrayList<>();
      List<String> classes = new ArrayList<>();

      for (int i = 0; i < cols; i++) {
        if (null == list.at(i)) {
          return false;
        }
        String cname = list.at(i).getClass().getName();
        if (cname.equals("org.rosuda.REngine.REXPFactor")) {
          String t = "select\n";
          String [] sv = list.at(i).asFactor().levels();
          for (String s : sv)
            t = t + s + '\n';
          t = t.substring(0, t.length()-1);
          classes.add(t);
        } else if (cname.equals("org.rosuda.REngine.REXPInteger")) {
          classes.add("integer");
        } else if (cname.equals("org.rosuda.REngine.REXPDouble")) {
          classes.add("double");
        } else if (cname.equals("org.rosuda.REngine.REXPLogical")) {
          classes.add("boolean");
        } else { // consider this the default if (cname.equals("org.rosuda.REngine.REXPString")) {
          classes.add("string");
        }
        array[i] = list.at(i).asStrings();
      }
      if (array.length < 1) {
        return false;
      }
      for (int j = 0; j < array[0].length; j++) {
        List<String> row = new ArrayList<>();
        for (int i = 0; i < cols; i++) {
          if (array[i].length != array[0].length) {
            return false;
          }
          row.add(array[i][j]);
        }
        values.add(row);
      }
      table = new TableDisplay(values, Arrays.asList(names), classes);
    } catch (NullPointerException e) {
      return false;
    } catch (REXPMismatchException e) {
      return false;
    }
    obj.finished(table);
    return true;
  }

  private static class RServer {
    RConnection connection;
    ROutputHandler outputHandler;
    ErrorGobbler errorGobbler;
    int port;
    String password;
    int pid;
    String sessionId;
    public RServer(RConnection con, ROutputHandler handler, ErrorGobbler gobbler,
                   int port, String password, int pid) {
      this.connection = con;
      this.outputHandler = handler;
      this.errorGobbler = gobbler;
      this.port = port;
      this.password = password;
      this.pid = pid;
    }
  }
}
