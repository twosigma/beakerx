package com.twosigma.beaker.scala.test;

import static org.junit.Assert.*;

import java.io.File;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;

import org.cometd.bayeux.Message;
import org.cometd.bayeux.client.ClientSessionChannel;
import org.cometd.client.BayeuxClient;
import org.cometd.client.transport.LongPollingTransport;
import org.eclipse.jetty.client.HttpClient;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.representation.Form;
import com.sun.jersey.test.framework.JerseyTest;


public class ScalaShellTest extends JerseyTest {
	
	private static int thePort;
	private static Process process;
	private static BayeuxClient  client;
	private static final Queue<String> sharedQ = new LinkedList<String>();
	private static WebResource webResource;
	private static final JSONParser p = new JSONParser();
	private static final Form form = new Form();
	private static ClientResponse response;
    private static String shellId;
    private static boolean debug;
	
    public ScalaShellTest() throws Exception {
        super("");
        
    }
    
    @BeforeClass
    public static void initialize() throws Exception {
      debug = System.getProperty("beaker.test.debug") != null;
      
      thePort = Integer.parseInt(System.getProperty("jersey.test.port"));
      String directory = System.getProperty("beaker.test.dir");
      
      ProcessBuilder builder = new ProcessBuilder("bin/scala", (new Integer(thePort)).toString());
      if(debug) {
        builder.redirectOutput(new File("scala_test_out.txt"));
        builder.redirectError(new File("scala_test_err.txt"));
      }
      builder.directory(new File(directory));
      process = builder.start(); // throws IOException

      Thread.sleep(4000);
            
      // Create (and eventually set up) Jetty's HttpClient:
      HttpClient httpClient = new HttpClient();
      httpClient.start();

      // Prepare the transport
      Map<String, Object> options = new HashMap<String, Object>();
      LongPollingTransport transport = new LongPollingTransport(options, httpClient);

      // Create the BayeuxClient
      client = new BayeuxClient("http://localhost:"+System.getProperty("jersey.test.port")+"/cometd", transport);
      client.handshake();
      boolean handshaken = client.waitFor(1000, BayeuxClient.State.CONNECTED);
      if (handshaken)
      {
        if(debug)  System.out.println("Cometd connection successful");
      } else {
        if(debug)  System.out.println("Cometd connection succesful");
      }
    }
    
    private static class ChannelListener implements ClientSessionChannel.MessageListener
    {
        public void onMessage(ClientSessionChannel channel, Message message)
        {
          synchronized (sharedQ) {
            sharedQ.add(message.getJSON());
            sharedQ.notify();
          }
        }
    }
    
    @AfterClass
    public static void terminate() {
      process.destroy();
    }

    private static void evaluateTask(String code, String expect) throws ParseException {
      form.clear();
      form.add("shellId", shellId);
      form.add("code", code);

      response = webResource.path("/rest/scalash/evaluate").post(ClientResponse.class, form);
      checkResponse (200);
      String result = response.getEntity(String.class);

      JSONObject ro = (JSONObject)p.parse(result);
      String id = (String) ro.get("update_id");
      if(debug) System.out.println("Subscribing to "+id);
      client.getChannel("/object_update/"+id).subscribe(new ChannelListener());
      boolean completed = false;
      String status = "";
      
      while(!completed) {
        synchronized (sharedQ) {
          //waiting condition - wait until Queue is not empty
          while (sharedQ.size() == 0) {
              try {
                  sharedQ.wait();
              } catch (InterruptedException ex) {
                  ex.printStackTrace();
              }
          }
          String msg = sharedQ.poll();
          if(debug) System.out.println("received update "+msg);
          ro = (JSONObject)p.parse(msg);
          status = (String) ((JSONObject)ro.get("data")).get("status");
          if(!status.equals("RUNNING")) {
            completed = true;
            Object o = ((JSONObject)ro.get("data")).get("payload");
            if ( o!=null)
              result = o.toString();
            client.getChannel("/object_update/"+id).unsubscribe();
          }
        }
      }
      
      if(expect!=null)
        assertEquals(result,expect);
      assertEquals(status,"FINISHED");
    }
    
    private static void checkResponse(int code) {
      assertEquals("Failed : HTTP error code : " + response.getStatus() + " "+ response.getHeaders(), code, response.getStatus());
    }
    
    private static void autocomplete(String code, String expect) throws ParseException {
      form.clear();
      form.add("shellId", shellId);
      form.add("code", code.substring(0, code.length()));
      form.add("caretPosition",code.length());

      response = webResource.path("/rest/scalash/autocomplete").post(ClientResponse.class, form);
      System.out.println("response is "+response.getStatus());
      //checkResponse (200);
      if(response.getStatus()==200) {
        String result = response.getEntity(String.class);
        System.out.println("received"+result);
      }
    }
    
    
    @Test
    public void testHelloWorld() throws InterruptedException, ParseException {
        webResource = resource();
        
        form.add("shellId", "my_shell_id");
        form.add("sessionId", "my_session");
         
        response = webResource.path("/rest/scalash/getShell").post(ClientResponse.class, form);
        checkResponse (200);
        
		shellId = response.getEntity(String.class);
		if(debug) System.out.println("New shell ID :"+shellId);
		
        form.clear();
        form.add("shellId", shellId);
        form.add("classPath", "");
        form.add("imports", "com.twosigma.beaker.NamespaceClient\ncom.twosigma.beaker.BeakerProgressUpdate\nimport com.twosigma.beaker.chart.Color\ncom.twosigma.beaker.chart.xychart.*\ncom.twosigma.beaker.chart.xychart.plotitem.*");
        
        response = webResource.path("/rest/scalash/setShellOptions").post(ClientResponse.class, form);
        checkResponse (204);

        evaluateTask("1+1","2");

        evaluateTask("56+56","112");

        evaluateTask("3*4","12");
        
        autocomplete("var s = new Str", "");
        autocomplete("var s = new String();\ns.", "");
        autocomplete("var s = new String();\ns.co", "");
        
    }
}
