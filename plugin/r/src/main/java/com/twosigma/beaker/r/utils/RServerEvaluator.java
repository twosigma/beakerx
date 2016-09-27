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
package com.twosigma.beaker.r.utils;

import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.nio.file.attribute.PosixFilePermission;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.batik.ext.awt.image.codec.png.PNGRegistryEntry;
import org.apache.batik.ext.awt.image.codec.tiff.TIFFRegistryEntry;
import org.apache.batik.ext.awt.image.spi.ImageTagRegistry;
import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.ImageTranscoder;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.fluent.Request;
import org.rosuda.REngine.REXP;
import org.rosuda.REngine.REXPMismatchException;
import org.rosuda.REngine.Rserve.RConnection;
import org.rosuda.REngine.Rserve.RserveException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beaker.r.module.ErrorGobbler;
import com.twosigma.beaker.r.module.ROutputHandler;

public class RServerEvaluator {
  protected static final String BEGIN_MAGIC = "**beaker_begin_magic**";
  protected static final String END_MAGIC = "**beaker_end_magic**";
  private final static Logger logger = LoggerFactory.getLogger(RServerEvaluator.class.getName());

  protected final String shellId;
  protected final String sessionId;
  protected boolean exit;
  protected workerThread myWorker;
  private int corePort;

  public String getSessionId() {
    return sessionId;
  }

  class MyTranscoder extends ImageTranscoder {
    private BufferedImage image = null;
    public BufferedImage createImage(int w, int h) {
        image = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);
        return image;
    }
    public void writeImage(BufferedImage img, TranscoderOutput out) {
    }
    public BufferedImage getImage() {
        return image;
    }
}
  
  protected class jobDescriptor {
    public String codeToBeExecuted;
    public SimpleEvaluationObject outputObject;

    jobDescriptor(String c , SimpleEvaluationObject o) {
      codeToBeExecuted = c;
      outputObject = o;
    }
  }

  protected final Semaphore syncObject = new Semaphore(0, true);
  protected final ConcurrentLinkedQueue<jobDescriptor> jobQueue = new ConcurrentLinkedQueue<jobDescriptor>();
  protected boolean iswindows;
  protected BeakerObjectConverter objSerializer;

  public RServerEvaluator(String id, String sId, int cp, BeakerObjectConverter os) {
    logger.debug("created");
    shellId = id;
    sessionId = sId;
    exit = false;
    corePort = cp;
    iswindows = System.getProperty("os.name").contains("Windows");
    objSerializer = os;
    registerBatikRegistryEntries();
    startWorker();
  }

  private void registerBatikRegistryEntries() {
    //workaround for Batik
    final ImageTagRegistry registry = ImageTagRegistry.getRegistry();
    registry.register(new PNGRegistryEntry());
    registry.register(new TIFFRegistryEntry());
  }

  protected void startWorker() {
    myWorker = new workerThread();
    myWorker.start();
    logger.debug("worker started");
  }

  public String getShellId() { return shellId; }

  public void cancelExecution() {
    logger.debug("cancelling");
    myWorker.cancelExecution();
  }

  public void exit() {
    logger.debug("exiting");
    exit = true;
    cancelExecution();
    syncObject.release();
  }

  public void evaluate(SimpleEvaluationObject seo, String code) {
    logger.debug("evaluating");
    // send job to thread
    jobQueue.add(new jobDescriptor(code,seo));
    syncObject.release();
  }

  public List<String> autocomplete(String code, int caretPosition) {
    logger.debug("autocomplete");
    return myWorker.autocomplete(code,caretPosition);
  }

  protected int getPortFromCore() throws IOException, ClientProtocolException
  {
    String password = System.getenv("beaker_core_password");
    String auth = Base64.encodeBase64String(("beaker:" + password).getBytes("ASCII"));
    String response = Request.Get("http://127.0.0.1:" + corePort + "/rest/plugin-services/getAvailablePort")
        .addHeader("Authorization", "Basic " + auth)
        .execute().returnContent().asString();
    return Integer.parseInt(response);
  }

  protected String makeTemp(String base, String suffix) throws IOException
  {
    File dir = new File(System.getenv("beaker_tmp_dir"));
    File tmp = File.createTempFile(base, suffix, dir);
    if (!iswindows) {
      Set<PosixFilePermission> perms = EnumSet.of(PosixFilePermission.OWNER_READ, PosixFilePermission.OWNER_WRITE);
      Files.setPosixFilePermissions(tmp.toPath(), perms);
    }
    String r = tmp.getAbsolutePath();
    logger.debug("returns {}", r);
    return r;
  }

  protected BufferedWriter openTemp(String location) throws UnsupportedEncodingException, FileNotFoundException
  {
    // only in Java :(
    return new BufferedWriter(new OutputStreamWriter(new FileOutputStream(location), "ASCII"));
  }

  protected String writeRserveScript(int port, String password) throws IOException
  {
    String pwlocation = makeTemp("BeakerRserve", ".pwd");
    BufferedWriter bw = openTemp(pwlocation);
    bw.write("beaker " + password + "\n");
    bw.close();

    if (iswindows) {
      // R chokes on backslash in windows path, need to quote them
      pwlocation = pwlocation.replace("\\", "\\\\");
    }

    String location = makeTemp("BeakerRserveScript", ".r");
    bw = openTemp(location);
    bw.write("library(Rserve)\n");
    bw.write("run.Rserve(auth=\"required\", plaintext=\"enable\", port=" +
        port + ", pwdfile=\"" + pwlocation + "\")\n");
    bw.close();
    logger.debug("script is {}", location);
    return location;
  }


  // Remove the xml version string, and any blank data attributes,
  // since these just cause errors on chrome's console.  Then expand
  // all symbol/use elements manually.  This is because there is a
  // disagreement between firefox and chrome on how to interpret how
  // CSS applies to the resulting hidden DOM elements.  See github
  // Issue #987.  Finally, remove all definitions since they have been
  // expanded and are no longer needed.  This is done with hackey
  // string matching instead of truly parsing the XML.
  protected String fixSvgResults(String xml) {
    Pattern pat = Pattern.compile("<use xlink:href=\"#([^\"]+)\" x=\"([^\"]+)\" y=\"([^\"]+)\"/>");
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

  protected Object getSvgResults(String name) {
    File file = new File(name);
    if (file.length() > 0) {
      if (file.length() < 100*1024) {
        // return small SVG as SVG
        try (FileInputStream fis = new FileInputStream(file)) {
          byte[] data = new byte[(int) file.length()];
          fis.read(data);
          fis.close();
          String contents = new String(data, "UTF-8");
          logger.debug("returning svg content");
          Object r = fixSvgResults(contents);
          file.delete();
          return r;
        } catch (Exception e) {
          logger.error("ERROR reading SVG results", e);
        }
      } else {
        try {
          // return large SVG as ImageIcon
          MyTranscoder transcoder = new MyTranscoder();
          transcoder.transcode(new TranscoderInput(file.toURI().toURL().toString()), null);
          BufferedImage image = transcoder.getImage();
          file.delete();
          return image;
        } catch(Exception e) {
          logger.error("ERROR converting SVG results", e);
        }
      }
      file.delete();
    }
    return null;
  }

  protected boolean isVisible(REXP result, SimpleEvaluationObject obj) {
    try {
      int[] asInt = result.asList().at(1).asIntegers();
      if (asInt.length == 1 && asInt[0] != 0) {
        logger.debug("is visible");
        return true;
      }
    } catch (REXPMismatchException e) {
    } catch (NullPointerException e) {
    }
    return false;
  }

  protected class workerThread extends Thread {
    public RConnection connection;
    public ROutputHandler outputHandler;
    public ErrorGobbler errorGobbler;
    public int port;
    public String password;
    public int pid;
    public Process rServe;
    public final Semaphore mutex = new Semaphore(1);
    
    public workerThread() {
      super("groovy worker");
    }

    public List<String> autocomplete(String code, int caretPosition) {
      if (connection == null)
        return null;

      try {
        if (mutex.tryAcquire(1, TimeUnit.SECONDS)) {          
          StringBuilder evcode = new StringBuilder();
          
          String ss = code.substring(0, caretPosition);
          caretPosition += StringUtils.countMatches(ss, "\n");
          
          evcode.append("utils:::.assignLinebuffer('");
          evcode.append(code.replaceAll("'", "\\\\'").replaceAll("\n", "\\\\n"));
          evcode.append("')\n");
          evcode.append("utils:::.assignEnd(");
          evcode.append(caretPosition);
          evcode.append(")\n");
          evcode.append("utils:::.guessTokenFromLine()\n");
          evcode.append("utils:::.completeToken()\n");
          evcode.append("utils:::.retrieveCompletions()\n");

          String tryCode = "beaker_eval_=withVisible(try({" + evcode.toString() + "\n},silent=TRUE))";
          REXP result;
          try {
            result = connection.eval(tryCode);
            if (result!= null) {
              logger.trace("RESULT: {}", result);
              
              String[] value = result.asList().at(0).asStrings();
              
              ArrayList<String> r = new ArrayList<String>();
              for (String s : value) {
                r.add(s);
              }      
              mutex.release();
              return r;
            }
          } catch (RserveException | REXPMismatchException e) {
            logger.error("Exception in autocomplete", e);
          }
          mutex.release();
          return null;
        }
      } catch (InterruptedException e1) { }
      
      ArrayList<String> r = new ArrayList<String>();
      r.add("  ");
      r.add("** Rserve is busy **");
      return r;
    }

    public void cancelExecution() {
      if (iswindows) {
        return;
      }
      if (pid >0) {
        try {
          logger.debug("sending signal");
          Runtime.getRuntime().exec("kill -SIGINT " + pid);
        } catch (IOException e) {
          logger.error("exception sending signal: ", e);
        }
      }
    }

    protected boolean startRserve()
    {
      pid = -1;
      try {
        port = getPortFromCore();
        password  = RandomStringUtils.random(40, true, true);
        String[] command = {"Rscript", writeRserveScript(port, password)};

        // TODO: better error handling

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

        rServe = Runtime.getRuntime().exec(command, environmentArray);
        BufferedReader rServeOutput = new BufferedReader(new InputStreamReader(rServe.getInputStream(), "ASCII"));
        String line = null;
        while ((line = rServeOutput.readLine()) != null) {
          if (line.indexOf("(This session will block until Rserve is shut down)") >= 0) {
            break;
          } else {
            // System.out.println("Rserve>" + line);
          }
        }
        errorGobbler = new ErrorGobbler(rServe.getErrorStream());
        errorGobbler.start();

        outputHandler = new ROutputHandler(rServe.getInputStream(), BEGIN_MAGIC, END_MAGIC);
        outputHandler.start();

        connection = new RConnection("127.0.0.1", port);
        mutex.acquire();
        connection.login("beaker", password);
               
        pid = connection.eval("Sys.getpid()").asInteger();

        String initCode = "devtools::load_all(Sys.getenv('beaker_r_init'), " +
            "quiet=TRUE, export_all=FALSE)\n" +
            "beaker:::set_session('" + sessionId + "')\n";
        connection.eval(initCode);
        mutex.release();
      } catch(Exception e) {
        logger.error("exception starting RServe", e);
        if (connection != null)
          mutex.release();
        if (rServe!=null) {
          rServe.destroy();
          try {
            rServe.waitFor();
          } catch (InterruptedException e1) {
            e1.printStackTrace();
          }
        }
        connection = null;
        errorGobbler = null;
        outputHandler = null;
        return false;
      }
      return true;
    }

    /*
     * This thread performs all the evaluation
     */

    public void run() {
      jobDescriptor j = null;

      startRserve();
      
      while(!exit) {
        try {
          // wait for work
          syncObject.acquire();

          // get next job descriptor
          j = jobQueue.poll();
          if(j==null)
            continue;

          if (connection==null) {
            if (!startRserve()) {
              j.outputObject.error("... R language backend failed!");
              continue;
            }
          }

          outputHandler.reset(j.outputObject);
          errorGobbler.reset(j.outputObject);

          String file = iswindows ? "rplot.svg" : makeTemp("rplot", ".svg");
          try {
            java.nio.file.Path p = java.nio.file.Paths.get(file);
            java.nio.file.Files.deleteIfExists(p);
          } catch (IOException e) {
            // ignore
          }

          boolean isfinished = false;

          mutex.acquire();

          String resultjson = null;
          Object oresult = null; 
          try {
            // direct graphical output
            String tryCode;
            connection.eval("do.call(svg,c(list('" + file + "'), beaker::saved_svg_options))");
            tryCode = "beaker_warn_ <- {};\n"
                + "beaker_err_ <- {};\n"
                + " beaker_eval_=withVisible(tryCatch({ " + j.codeToBeExecuted + "\n}"
                    + ", warning = function(w){beaker_warn_ <<- w }"
                    + ", error = function(e){beaker_err_ <<- e } ))\n"+
                "list(beaker_eval_, beaker:::convertToJSON(beaker_eval_$value, beaker:::collapse_unit_vectors))";
            
            REXP result = connection.eval(tryCode);
            REXP e = connection.eval("beaker_err_");
            REXP w = connection.eval("beaker_warn_");
            
            if (result!= null) {
              logger.trace("RESULT: {}", result);
              resultjson=result.asList().at(1).asString();
              logger.trace("JSON: {}", resultjson);
              result = result.asList().at(0);
            }
            
            if (null == result) {
              logger.debug("null result");;
              oresult = "";
              resultjson = null;
              
              if(!w.isNull() && w.asList().at(0).isString()){
                String warning = w.asList().at(0).asString();
                j.outputObject.error(warning);
                isfinished = true;
              }
              
            } else if (!e.isNull() && e.asList().at(0).isString() || !w.isNull() && w.asList().at(0).isString()) {
              String error = null;
              if(!e.isNull() && e.asList().at(0).isString()){
                error = e.asList().at(0).asString();
              }
              String warning = null;
              if(!w.isNull() && w.asList().at(0).isString()){
                warning = w.asList().at(0).asString();
              }
              String meaage = "";
              if(error != null){
                meaage += error;
              }
              if(warning != null){
                if(meaage != null && !meaage.isEmpty()){
                  error += "\n";
                }
                meaage += warning;
              }
              j.outputObject.error(meaage);
              isfinished = true;
            } else if (resultjson!=null && !resultjson.isEmpty() && resultjson.startsWith("{ \"type\":" )) {
              logger.debug("is a beaker object");
              oresult = null;
            } else if (!isVisible(result, j.outputObject)) {
              logger.debug("is not visible");
              oresult = "";
            } else {
              logger.debug("capturing from output handler");
              String finish = "print(\"" + BEGIN_MAGIC + "\")\n" +
                  "print(beaker_eval_$value)\n" +
                  "print(\"" + END_MAGIC + "\")\n";
              connection.eval(finish);
              outputHandler.waitForCapture();
              oresult = outputHandler.getCaptured();
            }
          } catch (RserveException e) {
            isfinished = true;
            if (127 == e.getRequestReturnCode()) {
              j.outputObject.error("Interrupted");
            } else {
              j.outputObject.error(e.getMessage());
            }
          }
          
          // flush graphical output
          try {
            connection.eval("dev.off()");
          } catch (RserveException e) {
            if (!isfinished)
              j.outputObject.error("from dev.off(): " + e.getMessage());
          }

          if (!isfinished) {
            Object svg = getSvgResults(file);
            if (svg != null) {
              j.outputObject.finished(svg);
            } else         
              j.outputObject.finished(oresult, resultjson);
          }
          
          outputHandler.reset(null);
          errorGobbler.reset(null);
          mutex.release();

        } catch(Throwable e) {
          logger.error("exception in worker:", e);
        }
      }
      logger.debug("destroying worker");
      if (rServe!=null && connection!=null) {
        try {
          mutex.acquire();
        } catch (InterruptedException e1) { }
        try {
          connection.shutdown();
        } catch (RserveException e) {
        }
        mutex.release();
        try {
          rServe.waitFor();
        } catch (InterruptedException e) {
          logger.error("exception waiting for process termination", e);
        }
      }
      logger.info("DONE");
    }  
  }
}
