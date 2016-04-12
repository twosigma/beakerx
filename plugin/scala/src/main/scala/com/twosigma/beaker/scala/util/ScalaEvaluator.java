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
import java.nio.file.FileSystems;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Semaphore;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.commons.lang3.tuple.Pair;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.ObjectMapper;

import scala.Predef;
import scala.Tuple2;
import scala.collection.Iterable;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.twosigma.beaker.NamespaceClient;
import com.twosigma.beaker.jvm.classloader.DynamicClassLoaderSimple;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.object.TableDisplay;
import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beaker.jvm.serialization.ObjectDeserializer;
import com.twosigma.beaker.jvm.serialization.ObjectSerializer;
import com.twosigma.beaker.jvm.threads.BeakerCellExecutor;
import scala.collection.JavaConverters;

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
    if (logger.isLoggable(Level.FINE))
      logger.fine("id: "+id +", sId: "+sId);
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
    
    objectSerializerProvider.get().addfTypeDeserializer(new ScalaCollectionDeserializer(objectSerializerProvider.get()));
    objectSerializerProvider.get().addfTypeDeserializer(new ScalaMapDeserializer(objectSerializerProvider.get()));
    objectSerializerProvider.get().addfTypeDeserializer(new ScalaTableDeSerializer(objectSerializerProvider.get()));
    
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
      classPath = Arrays.asList(cp.split("[\\s"+File.pathSeparatorChar+"]+"));
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
      if (logger.isLoggable(Level.FINEST))
        logger.finest("return: "+r2);
      return r2;
    }
    return null;
  }

  protected ScalaEvaluatorGlue shell;
  protected String loader_cp = "";
  protected ScalaEvaluatorGlue acshell;
  protected String acloader_cp = "";

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
        logger.finest("looping");
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

    /*
     * Scala uses multiple classloaders and (unfortunately) cannot fallback to the java one while compiling scala code so we
     * have to build our DynamicClassLoader and also build a proper classpath for the compiler classloader.
     */
    protected ClassLoader newClassLoader() throws MalformedURLException
    {
      logger.fine("creating new loader");

      loader_cp = "";
      for (int i = 0; i < classPath.size(); i++) {
        loader_cp += classPath.get(i);
        loader_cp += File.pathSeparatorChar;
      }
      loader_cp += outDir;
      DynamicClassLoaderSimple cl = new DynamicClassLoaderSimple(ClassLoader.getSystemClassLoader());
      cl.addJars(classPath);
      cl.addDynamicDir(outDir);
      return cl;
    }

    protected void newEvaluator() throws MalformedURLException
    {
      logger.fine("creating new evaluator");
      shell = new ScalaEvaluatorGlue(newClassLoader(), loader_cp + File.pathSeparatorChar + System.getProperty("java.class.path"));

      if (!imports.isEmpty()) {
        for (int i = 0; i < imports.size(); i++) {
          String imp = imports.get(i).trim();
          if (imp.startsWith("import"))
            imp = imp.substring(6).trim();
          if (imp.endsWith(".*"))
            imp = imp.substring(0,imp.length()-1) + "_";
          if(!imp.isEmpty()) {
            if (logger.isLoggable(Level.FINEST))
              logger.finest("importing : "+imp);
            if(!shell.addImport(imp))
              System.err.println("ERROR: cannot add import '"+imp+"'");
          }
        }
      }

      logger.fine("creating beaker object");

      // ensure object is created
      NamespaceClient.getBeaker(sessionId);

      String r = shell.evaluate2(
          "var _beaker = NamespaceClient.getBeaker(\""+sessionId+"\")\n"+
          "import language.dynamics\n"+
          "object beaker extends Dynamic {\n"+
          "  def selectDynamic( field : String ) = _beaker.get(field)\n"+
          "  def updateDynamic (field : String)(value : Any) : Any = {\n"+
          "    _beaker.set(field,value)\n"+
          "    return value\n"+
          "  }\n"+
          "  def applyDynamic(methodName: String)(args: AnyRef*) = {\n"+
          "    def argtypes = args.map(_.getClass)\n"+
          "    def method = _beaker.getClass.getMethod(methodName, argtypes: _*)\n"+
          "    method.invoke(_beaker,args: _*)\n"+
          "  }\n"+
          "}\n" 
          );
      if(r!=null && !r.isEmpty()) {
        System.err.println("ERROR creating beaker object: "+r);
      }
    }
  }

  
  protected ClassLoader newAutoCompleteClassLoader() throws MalformedURLException
  {
    logger.fine("creating new autocomplete loader");
    acloader_cp = "";
    for (int i = 0; i < classPath.size(); i++) {
      acloader_cp += classPath.get(i);
      acloader_cp += File.pathSeparatorChar;
    }
    acloader_cp += outDir;
        
    DynamicClassLoaderSimple cl = new DynamicClassLoaderSimple(ClassLoader.getSystemClassLoader());
    cl.addJars(classPath);
    cl.addDynamicDir(outDir);
    return cl;
  }

  protected void newAutoCompleteEvaluator() throws MalformedURLException
  {
    logger.fine("creating new autocomplete evaluator");
    acshell = new ScalaEvaluatorGlue(newAutoCompleteClassLoader(), acloader_cp + File.pathSeparatorChar + System.getProperty("java.class.path"));

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

    String r = acshell.evaluate2(
        "var _beaker = NamespaceClient.getBeaker(\""+sessionId+"\")\n"+
        "import language.dynamics\n"+
        "object beaker extends Dynamic {\n"+
        "  def selectDynamic( field : String ) = _beaker.get(field)\n"+
        "  def updateDynamic (field : String)(value : Any) : Any = {\n"+
        "    _beaker.set(field,value)\n"+
        "    return value\n"+
        "  }\n"+
        "  def applyDynamic(methodName: String)(args: AnyRef*) = {\n"+
        "    def argtypes = args.map(_.getClass)\n"+
        "    def method = _beaker.getClass.getMethod(methodName, argtypes: _*)\n"+
        "    method.invoke(_beaker,args: _*)\n"+
        "  }\n"+
        "}\n" 
        );
    if(r!=null && !r.isEmpty()) {
      System.err.println("ERROR creating beaker beaker: "+r);
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
  
  class ScalaTableDeSerializer implements ObjectDeserializer {
    private final BeakerObjectConverter parent;
    
    public ScalaTableDeSerializer(BeakerObjectConverter p) {
      parent = p;
      parent.addKnownBeakerType("TableDisplay");
    }

    @SuppressWarnings("unchecked")
    @Override
    public Object deserialize(JsonNode n, ObjectMapper mapper) {
      org.apache.commons.lang3.tuple.Pair<String, Object> deserializeObject = TableDisplay.DeSerializer.getDeserializeObject(parent, n, mapper);
      String subtype  = deserializeObject.getLeft();
      if (subtype != null && subtype.equals(TableDisplay.DICTIONARY_SUBTYPE)) {
        return scala.collection.JavaConverters.mapAsScalaMapConverter((Map<String, Object>) deserializeObject.getRight()).asScala().toMap(Predef.<Tuple2<String, Object>>conforms());
      } else if (subtype != null && subtype.equals(TableDisplay.LIST_OF_MAPS_SUBTYPE)) {
        List<Map<String, Object>> rows = (List<Map<String, Object>>) deserializeObject.getRight();
        List<Object> oo = new ArrayList<Object>();
        for (Map<String, Object> row : rows) {
          oo.add(JavaConverters.mapAsScalaMapConverter(row).asScala().toMap(Predef.<Tuple2<String, Object>>conforms()));
        }
        return scala.collection.JavaConversions.collectionAsScalaIterable(oo);
      } else if (subtype != null && subtype.equals(TableDisplay.MATRIX_SUBTYPE)) {
        List<List<?>> matrix = (List<List<?>>) deserializeObject.getRight();
        ArrayList<Object> ll = new ArrayList<Object>();
        for (List<?> ob : matrix) {
          ll.add(scala.collection.JavaConversions.asScalaBuffer(ob).toList());
        }
        return scala.collection.JavaConversions.asScalaBuffer(ll).toList();
      }

      return deserializeObject.getRight();
    }

    @Override
    public boolean canBeUsed(JsonNode n) {
      return n.has("type") && n.get("type").asText().equals("TableDisplay");
    }
  }     
  
  public class ScalaCollectionDeserializer implements ObjectDeserializer {
    private final BeakerObjectConverter parent;

    public ScalaCollectionDeserializer(BeakerObjectConverter p) {
      parent = p;
    }

    @Override
    public boolean canBeUsed(JsonNode n) {
      return n.isArray();
    }

    @Override
    public Object deserialize(JsonNode n, ObjectMapper mapper) {
      List<Object> o = new ArrayList<Object>();
      try {
        logger.fine("using custom array deserializer");
        for(int i=0; i<n.size(); i++) {
          o.add(parent.deserialize(n.get(i), mapper));
        }
      } catch (Exception e) {
        if (logger.isLoggable(Level.SEVERE))
          logger.log(Level.SEVERE, "exception deserializing Collection ", e);
        o = null;
      }
      if (o!=null)
        return scala.collection.JavaConversions.asScalaBuffer(o).toList();
      return null;
    }
  }

  public class ScalaMapDeserializer implements ObjectDeserializer {
    private final BeakerObjectConverter parent;

    public ScalaMapDeserializer(BeakerObjectConverter p) {
      parent = p;
    }
    
    @Override
    public boolean canBeUsed(JsonNode n) {
      return n.isObject() && (!n.has("type") || !parent.isKnownBeakerType(n.get("type").asText()));
    }

    @Override
    public Object deserialize(JsonNode n, ObjectMapper mapper) {
      HashMap<String, Object> o = new HashMap<String,Object>();
      try {
        logger.fine("using custom map deserializer");
        Iterator<Entry<String, JsonNode>> e = n.getFields();
        while(e.hasNext()) {
          Entry<String, JsonNode> ee = e.next();
          o.put(ee.getKey(), parent.deserialize(ee.getValue(),mapper));
        }
      } catch (Exception e) {
        if (logger.isLoggable(Level.SEVERE))
          logger.log(Level.SEVERE, "exception deserializing Map ", e);
        o = null;
      }
      if (o!=null)
        return scala.collection.JavaConverters.mapAsScalaMapConverter(o).asScala().toMap( Predef.<Tuple2<String,Object>>conforms());
      return null;
    }

  }

}

