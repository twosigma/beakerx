package com.twosigma.beaker.scala.test;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;

import org.cometd.bayeux.Message;
import org.cometd.bayeux.client.ClientSession;
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
	
    public ScalaShellTest() throws Exception {
        super("");
        
    }
    
    @BeforeClass
    public static void initialize() throws Exception {
    	//thePort = Integer.parseInt(System.getProperty("jersey.test.port"));
    	//String cmd = "bin/scala "+thePort;
    	//System.out.println("starting: "+cmd);
    	//process = Runtime.getRuntime().exec(cmd);
    	//Thread.sleep(4000);
      
      
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
        System.out.println("SUCCESS");
      } else {
        System.out.println("FAILURE");
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
    	//process.destroy();
    }

    
    @Test
    public void testHelloWorld() throws InterruptedException, ParseException {
        WebResource webResource = resource();
        JSONParser p = new JSONParser();

        Form form = new Form();
        form.add("shellId", "my_shell_id");
        form.add("sessionId", "my_session");
         
        ClientResponse response = webResource.path("/rest/scalash/getShell").post(ClientResponse.class, form);
        if (response.getStatus() != 200) {
			throw new RuntimeException("Failed : HTTP error code : "
			     + response.getStatus() + " "+ response.getHeaders());
		}
 
		String shellId = response.getEntity(String.class);
		System.out.println("New shell ID :"+shellId);
        
		form.clear();
		form.add("shellId", shellId);
		form.add("code", "1+1");
	
		response = webResource.path("/rest/scalash/evaluate").post(ClientResponse.class, form);
        if (response.getStatus() != 200) {
			throw new RuntimeException("Failed : HTTP error code : "
			     + response.getStatus() + " "+ response.getHeaders());
		}
        String result = response.getEntity(String.class);
        //System.out.println("Result :"+result);

        JSONObject ro = (JSONObject)p.parse(result);
        String id = (String) ro.get("update_id");
        System.out.println("Subscribing to "+id);
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
            System.out.println("receive "+msg);
            ro = (JSONObject)p.parse(msg);
            status = (String) ((JSONObject)ro.get("data")).get("status");
            if(!status.equals("RUNNING")) {
              completed = true;
              result = ((JSONObject)ro.get("data")).get("result").toString();
              client.getChannel("/object_update/"+id).unsubscribe();
            }
          }
        }
        
        assertEquals(result,"2");
        assertEquals(status,"FINISHED");
  
        form.clear();
        form.add("shellId", shellId);
        form.add("classPath", "");
        form.add("imports", "com.twosigma.beaker.NamespaceClient\ncom.twosigma.beaker.BeakerProgressUpdate\nimport com.twosigma.beaker.chart.Color\ncom.twosigma.beaker.chart.xychart.*\ncom.twosigma.beaker.chart.xychart.plotitem.*");
        
        response = webResource.path("/rest/scalash/setShellOptions").post(ClientResponse.class, form);
        if (response.getStatus() != 204) {
            throw new RuntimeException("Failed : HTTP error code : "
                 + response.getStatus() + " "+ response.getHeaders());
        }

        form.clear();
        form.add("shellId", shellId);
        form.add("code", "3+1");
    
        response = webResource.path("/rest/scalash/evaluate").post(ClientResponse.class, form);
        if (response.getStatus() != 200) {
            throw new RuntimeException("Failed : HTTP error code : "
                 + response.getStatus() + " "+ response.getHeaders());
        }
        result = response.getEntity(String.class);
        
        ro = (JSONObject)p.parse(result);
        id = (String) ro.get("update_id");
        System.out.println("Subscribing to "+id);
        client.getChannel("/object_update/"+id).subscribe(new ChannelListener());
        completed = false;
        status = "";
        
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
            ro = (JSONObject)p.parse(msg);
            status = (String) ((JSONObject)ro.get("data")).get("status");
            if(!status.equals("RUNNING")) {
              completed = true;
              result = ((JSONObject)ro.get("data")).get("result").toString();
              client.getChannel("/object_update/"+id).unsubscribe();
           }
          }
        }
        
        assertEquals("4",result);
        assertEquals("FINISHED",status);

    }
}
