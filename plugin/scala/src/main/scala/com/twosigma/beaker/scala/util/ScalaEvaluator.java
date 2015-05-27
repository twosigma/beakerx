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

package com.twosigma.beaker.scala.util;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.FileSystems;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Semaphore;
import java.util.logging.Logger;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;

import scala.collection.Iterable;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.twosigma.beaker.scala.util.ScalaEvaluatorGlue;
import com.twosigma.beaker.NamespaceClient;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.object.TableDisplay;
import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beaker.jvm.serialization.ObjectSerializer;
import com.twosigma.beaker.jvm.threads.BeakerCellExecutor;

public class ScalaEvaluator {
  private final static Logger logger = Logger.getLogger(ScalaEvaluator.class.getName());
  
  protected String shellId;
  protected String sessionId;
  protected List<String> classPath;
  protected List<String> imports;
  protected String outDir;
  protected boolean exit;
  protected boolean updateLoader;
  protected final BeakerCellExecutor executor;
  protected workerThread myWorker;
  protected String currentClassPath;
  protected String currentImports;
  private final Provider<BeakerObjectConverter> objectSerializerProvider;
  
  protected class jobDescriptor {
    String codeToBeExecuted;
    SimpleEvaluationObject outputObject;

    jobDescriptor(String c , SimpleEvaluationObject o) {
      codeToBeExecuted = c;
      outputObject = o;
    }
  }

  protected final Semaphore syncObject = new Semaphore(0, true);
  protected final ConcurrentLinkedQueue<jobDescriptor> jobQueue = new ConcurrentLinkedQueue<jobDescriptor>();

  @Inject
  public ScalaEvaluator(Provider<BeakerObjectConverter> osp) {
    objectSerializerProvider = osp;
    executor = new BeakerCellExecutor("scala");
  }

  public void initialize(String id, String sId) {
    shellId = id;
    sessionId = sId;
    classPath = new ArrayList<String>();
    imports = new ArrayList<String>();
    exit = false;
    updateLoader = false;
    currentClassPath = "";
    currentImports = "";
    outDir = FileSystems.getDefault().getPath(System.getenv("beaker_tmp_dir"),"dynclasses",sessionId).toString();
    try { (new File(outDir)).mkdirs(); } catch (Exception e) { }
    startWorker();
  }

  protected void startWorker() {
    myWorker = new workerThread();
    myWorker.start();
  }

  public String getShellId() { return shellId; }

  private static boolean autoTranslationSetup = false;
  
  public void setupAutoTranslation() {
    if(autoTranslationSetup)
      return;
    
    objectSerializerProvider.get().addfTypeSerializer(new ScalaCollectionSerializer(objectSerializerProvider.get()));
    objectSerializerProvider.get().addfTypeSerializer(new ScalaMapSerializer(objectSerializerProvider.get()));
    objectSerializerProvider.get().addfTypeSerializer(new ScalaPrimitiveTypeListOfListSerializer(objectSerializerProvider.get()));
    objectSerializerProvider.get().addfTypeSerializer(new ScalaListOfPrimitiveTypeMapsSerializer(objectSerializerProvider.get()));
    objectSerializerProvider.get().addfTypeSerializer(new ScalaPrimitiveTypeMapSerializer(objectSerializerProvider.get()));    
    autoTranslationSetup = true;
  }
  
  public void killAllThreads() {
    executor.killAllThreads();
  }

  public void cancelExecution() {
    executor.cancelExecution();
  }

  public void resetEnvironment() {
    executor.killAllThreads();
    updateLoader=true;
    syncObject.release();
    try {
      newAutoCompleteEvaluator();
    } catch(MalformedURLException e) { }
  } 

  public void exit() {
    exit = true;
    cancelExecution();
    syncObject.release();
  }

  public void setShellOptions(String cp, String in, String od) throws IOException {
    if (od==null || od.isEmpty()) {
      od = FileSystems.getDefault().getPath(System.getenv("beaker_tmp_dir"),"dynclasses",sessionId).toString();
    } else {
      od = od.replace("$BEAKERDIR",System.getenv("beaker_tmp_dir"));
    }
    
    // check if we are not changing anything
    if (currentClassPath.equals(cp) && currentImports.equals(in) && outDir.equals(od))
      return;

    currentClassPath = cp;
    currentImports = in;
    outDir = od;

    if(cp==null || cp.isEmpty())
      classPath = new ArrayList<String>();
    else
      classPath = Arrays.asList(cp.split("[\\s]+"));
    if (imports==null || in.isEmpty())
      imports = new ArrayList<String>();
    else
      imports = Arrays.asList(in.split("\\s+"));

    try { (new File(outDir)).mkdirs(); } catch (Exception e) { }
    
    resetEnvironment();
  }

  public void evaluate(SimpleEvaluationObject seo, String code) {
    // send job to thread
    jobQueue.add(new jobDescriptor(code,seo));
    syncObject.release();
  }

  public List<String> autocomplete(String code, int caretPosition) {    
    if(acshell != null) {
      String [] sv = code.substring(0, caretPosition).split("\n");
      for ( int i=0; i<sv.length-1; i++) {
        acshell.evaluate2(sv[i]);
        caretPosition -= sv[i].length()+1;
      }
      ArrayList<CharSequence> ret = acshell.autocomplete(sv[sv.length-1], caretPosition);
      ArrayList<String> r2 = new ArrayList<String>();
      for(CharSequence c : ret)
        r2.add(c.toString());
      return r2;
    }
    return null;
  }

  protected ScalaDynamicClassLoader loader = null;
  protected ScalaEvaluatorGlue shell;
  protected ScalaDynamicClassLoader acloader = null;
  protected ScalaEvaluatorGlue acshell;

  protected class workerThread extends Thread {

    public workerThread() {
      super("scala worker");
    }

    /*
     * This thread performs all the evaluation
     */

    public void run() {
      jobDescriptor j = null;
      NamespaceClient nc = null;

      while(!exit) {
        try {
          // wait for work
          syncObject.acquire();

          // check if we must create or update class loader
          if(updateLoader) {
            shell = null;
          }

          // get next job descriptor
          j = jobQueue.poll();
          if(j==null)
            continue;

          if (shell==null) {
            updateLoader=false;
            newEvaluator();
          }

          if(loader!=null)
            loader.clearCache();

          j.outputObject.started();

          nc = NamespaceClient.getBeaker(sessionId);
          nc.setOutputObj(j.outputObject);
          if (!executor.executeTask(new MyRunnable(j.codeToBeExecuted, j.outputObject))) {
            j.outputObject.error("... cancelled!");
          }
          if(nc!=null) {
            nc.setOutputObj(null);
            nc = null;
          }
        } catch(Throwable e) {
          e.printStackTrace();
        } finally {
          if(nc!=null) {
            nc.setOutputObj(null);
            nc = null;
          }
        }
      }
      NamespaceClient.delBeaker(sessionId);
    }

    protected class MyRunnable implements Runnable {

      protected final String theCode;
      protected final SimpleEvaluationObject theOutput;

      public MyRunnable(String code, SimpleEvaluationObject out) {
        theCode = code;
        theOutput = out;
      }
      
      @Override
      public void run() {
        theOutput.setOutputHandler();
        try {
          shell.evaluate(theOutput, theCode);
        } catch(Throwable e) {
          if (e instanceof InterruptedException || e instanceof InvocationTargetException || e instanceof ThreadDeath) {
            theOutput.error("... cancelled!");
          } else {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            theOutput.error(sw.toString());
          }
        }
        theOutput.setOutputHandler();
      }
      
    };

    protected ClassLoader newClassLoader() throws MalformedURLException
    {
      URL[] urls = {};
      if (!classPath.isEmpty()) {
        urls = new URL[classPath.size()];
        for (int i = 0; i < classPath.size(); i++) {
          urls[i] = new URL("file://" + classPath.get(i));
          System.out.println(urls[i].toString());
        }
      }
      loader = null;
      ClassLoader cl;
      loader = new ScalaDynamicClassLoader(outDir);
      loader.addAll(Arrays.asList(urls));
      cl = loader.getLoader();
      return cl;
    }

    protected void newEvaluator() throws MalformedURLException
    {
      shell = new ScalaEvaluatorGlue(newClassLoader(), System.getProperty("java.class.path"));

      if (!imports.isEmpty()) {
        for (int i = 0; i < imports.size(); i++) {
          String imp = imports.get(i).trim();
          if (imp.startsWith("import"))
            imp = imp.substring(6).trim();
          if (imp.endsWith(".*"))
            imp = imp.substring(0,imp.length()-1) + "_";
          if(!imp.isEmpty()) {
            if(!shell.addImport(imp))
              System.err.println("ERROR: cannot add import '"+imp+"'");
          }
        }
      }
      
      // ensure object is created
      NamespaceClient.getBeaker(sessionId);

      String r = shell.evaluate2("var beaker = NamespaceClient.getBeaker(\""+sessionId+"\")");
      if(r!=null && !r.isEmpty()) {
        System.err.println("ERROR setting beaker: "+r);
      }
    }
  }

  
  protected ClassLoader newAutoCompleteClassLoader() throws MalformedURLException
  {
    URL[] urls = {};
    if (!classPath.isEmpty()) {
      urls = new URL[classPath.size()];
      for (int i = 0; i < classPath.size(); i++) {
        urls[i] = new URL("file://" + classPath.get(i));
        System.out.println(urls[i].toString());
      }
    }
    acloader = null;
    ClassLoader cl;
    acloader = new ScalaDynamicClassLoader(outDir);
    acloader.addAll(Arrays.asList(urls));
    cl = acloader.getLoader();
    return cl;
  }

  protected void newAutoCompleteEvaluator() throws MalformedURLException
  {
    acshell = new ScalaEvaluatorGlue(newAutoCompleteClassLoader(), System.getProperty("java.class.path"));

    if (!imports.isEmpty()) {
      for (int i = 0; i < imports.size(); i++) {
        String imp = imports.get(i).trim();
        if (imp.startsWith("import"))
          imp = imp.substring(6).trim();
        if (imp.endsWith(".*"))
          imp = imp.substring(0,imp.length()-1) + "_";
        if(!imp.isEmpty()) {
          if(!acshell.addImport(imp))
            System.err.println("ERROR: cannot add import '"+imp+"'");
        }
      }
    }
    
    // ensure object is created
    NamespaceClient.getBeaker(sessionId);

    String r = acshell.evaluate2("var beaker = NamespaceClient.getBeaker(\""+sessionId+"\")");
    if(r!=null && !r.isEmpty()) {
      System.err.println("ERROR setting beaker: "+r);
    }
    
  }

  class ScalaListOfPrimitiveTypeMapsSerializer implements ObjectSerializer {
    private final BeakerObjectConverter parent;
    
    public ScalaListOfPrimitiveTypeMapsSerializer(BeakerObjectConverter p) {
      parent = p;
    }
    
    @Override
    public boolean canBeUsed(Object obj, boolean expand) {
      if (!expand)
        return false;
      
      if (! (obj instanceof scala.collection.immutable.Seq<?>))
        return false;
      
      Collection<?> col = scala.collection.JavaConversions.asJavaCollection((Iterable<?>) obj);
      if (col.isEmpty())
        return false;
      
      for (Object o : col) {
        if (!(o instanceof scala.collection.Map<?,?>))
          return false;
        
        Map<?, ?> m = scala.collection.JavaConversions.mapAsJavaMap((scala.collection.Map<?, ?>)  o);
        Set<?> keys = m.keySet();
        for(Object key : keys) {
          if (key!=null && !parent.isPrimitiveType(key.getClass().getName()))
            return false;
          Object val = m.get(key);
          if (val!=null && !parent.isPrimitiveType(val.getClass().getName()))
            return false;
        }
      }      
      return true;
    }

    @Override
    public boolean writeObject(Object obj, JsonGenerator jgen, boolean expand) throws JsonProcessingException, IOException {
      logger.fine("list of maps");
      // convert this 'on the fly' to a datatable
      Collection<?> col = scala.collection.JavaConversions.asJavaCollection((Iterable<?>) obj);
      List<Map<?,?>> tab = new ArrayList<Map<?,?>>();
      for (Object o : col) {
        Map<?, ?> row = scala.collection.JavaConversions.mapAsJavaMap((scala.collection.Map<?, ?>) o);
        tab.add(row);
      }
      TableDisplay t = new TableDisplay(tab,parent);
      jgen.writeObject(t);
      return true;
    }
  }
  
  class ScalaPrimitiveTypeListOfListSerializer implements ObjectSerializer {
    private final BeakerObjectConverter parent;
    
    public ScalaPrimitiveTypeListOfListSerializer(BeakerObjectConverter p) {
      parent = p;
    }
    
    @Override
    public boolean canBeUsed(Object obj, boolean expand) {
      if (!expand)
        return false;
      
      if (! (obj instanceof scala.collection.immutable.Seq<?>))
        return false;
      
      Collection<?> col = scala.collection.JavaConversions.asJavaCollection((Iterable<?>) obj);
      if (col.isEmpty())
        return false;
      
      for (Object o : col) {
        if (!(o instanceof scala.collection.immutable.Seq))
          return false;
        
        Collection<?> col2 = scala.collection.JavaConversions.asJavaCollection((Iterable<?>) o);
        for (Object o2 : col2) {
          if (!parent.isPrimitiveType(o2.getClass().getName()))
            return false;
        }
      }
      return true;
    }

    @Override
    public boolean writeObject(Object obj, JsonGenerator jgen, boolean expand) throws JsonProcessingException, IOException {
      logger.fine("collection of collections");
      
      Collection<?> m = scala.collection.JavaConversions.asJavaCollection((Iterable<?>) obj);
      int max = 0;
              
      for (Object entry : m) {
        Collection<?> e = scala.collection.JavaConversions.asJavaCollection((Iterable<?>) entry);
        if (max < e.size())
          max = e.size();
      }
      List<String> columns = new ArrayList<String>();
      for (int i=0; i<max; i++)
        columns.add("c"+i);
      List<List<?>> values = new ArrayList<List<?>>();
      for (Object entry : m) {
        Collection<?> e = scala.collection.JavaConversions.asJavaCollection((Iterable<?>) entry);
        List<Object> l2 = new ArrayList<Object>(e);
        if (l2.size() < max) {
          for (int i=l2.size(); i<max; i++)
            l2.add(null);
        }
        values.add(l2);
      }
      jgen.writeStartObject();
      jgen.writeObjectField("type", "TableDisplay");
      jgen.writeObjectField("columnNames", columns);
      jgen.writeObjectField("values", values);
      jgen.writeObjectField("subtype", TableDisplay.MATRIX_SUBTYPE);
      jgen.writeEndObject();
      return true;
    }
  }

  class ScalaPrimitiveTypeMapSerializer implements ObjectSerializer {
    private final BeakerObjectConverter parent;
    
    public ScalaPrimitiveTypeMapSerializer(BeakerObjectConverter p) {
      parent = p;
    }

    @Override
    public boolean canBeUsed(Object obj, boolean expand) {
      if (!expand)
        return false;

      if (!(obj instanceof scala.collection.immutable.Map))
        return false;
      
      Map<?, ?> m = scala.collection.JavaConversions.mapAsJavaMap((scala.collection.Map<?, ?>) obj);
      Set<?> keys = m.keySet();
      for(Object key : keys) {
        if (key!=null && !parent.isPrimitiveType(key.getClass().getName()))
          return false;
        Object val = m.get(key);
        if (val!=null && !parent.isPrimitiveType(val.getClass().getName()))
          return false;
      }
      return true;
    }

    @Override
    public boolean writeObject(Object obj, JsonGenerator jgen, boolean expand) throws JsonProcessingException, IOException {
      logger.fine("primitive type map");
      
      List<String> columns = new ArrayList<String>();
      columns.add("Key");
      columns.add("Value");

      List<List<?>> values = new ArrayList<List<?>>();

      Map<?, ?> m = scala.collection.JavaConversions.mapAsJavaMap((scala.collection.Map<?, ?>) obj);
      Set<?> keys = m.keySet();
      for(Object key : keys) {
        Object val = m.get(key);
        List<Object> l = new ArrayList<Object>();
        l.add(key.toString());
        l.add(val);
        values.add(l);
      }
      
      jgen.writeStartObject();
      jgen.writeObjectField("type", "TableDisplay");
      jgen.writeObjectField("columnNames", columns);
      jgen.writeObjectField("values", values);
      jgen.writeObjectField("subtype", TableDisplay.DICTIONARY_SUBTYPE);
      jgen.writeEndObject();
      return true;
    }
  }

  class ScalaCollectionSerializer implements ObjectSerializer {
    private final BeakerObjectConverter parent;
    
    public ScalaCollectionSerializer(BeakerObjectConverter p) {
      parent = p;
    }

    @Override
    public boolean canBeUsed(Object obj, boolean expand) {
      return obj instanceof scala.collection.immutable.Seq<?>;
    }

    @Override
    public boolean writeObject(Object obj, JsonGenerator jgen, boolean expand) throws JsonProcessingException, IOException {
      logger.fine("collection");
      // convert this 'on the fly' to an array of objects
      Collection<?> c = scala.collection.JavaConversions.asJavaCollection((Iterable<?>) obj);
      jgen.writeStartArray();
      for(Object o : c) {
        if (!parent.writeObject(o, jgen, false))
          jgen.writeObject(o.toString());
      }
      jgen.writeEndArray();
      return true;
    }
  }

  class ScalaMapSerializer implements ObjectSerializer {
    private final BeakerObjectConverter parent;
    
    public ScalaMapSerializer(BeakerObjectConverter p) {
      parent = p;
    }

    @Override
    public boolean canBeUsed(Object obj, boolean expand) {
      return obj instanceof scala.collection.immutable.Map<?, ?>;
    }

    @Override
    public boolean writeObject(Object obj, JsonGenerator jgen, boolean expand) throws JsonProcessingException, IOException {
      logger.fine("generic map");
      // convert this 'on the fly' to a map of objects
      Map<?, ?> m = scala.collection.JavaConversions.mapAsJavaMap((scala.collection.Map<?, ?>) obj);
      
      
      Set<?> keys = m.keySet();
      for(Object key : keys) {
        if (key==null || !(key instanceof String)) {
          jgen.writeObject(obj.toString());
          return true;
        }
      }

      jgen.writeStartObject();
      for(Object key : keys) {
        Object val = m.get(key);
        jgen.writeFieldName(key.toString());
        if (!parent.writeObject(val, jgen, false))
          jgen.writeObject(val!=null ? (val.toString()) : "null");
      }
      jgen.writeEndObject();
      return true;
    }
  }

}

