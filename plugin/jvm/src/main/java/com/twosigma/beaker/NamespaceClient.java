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

package com.twosigma.beaker;

import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.shared.NamespaceBinding;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.codec.binary.Base64;
import org.apache.http.client.fluent.Request;
import org.apache.http.client.fluent.Form;
import org.apache.http.client.ClientProtocolException;
import org.codehaus.jackson.map.ObjectMapper;


public class NamespaceClient {

  private String session;
  private ObjectMapper mapper;
  private String auth;
  private String urlBase;
  private SimpleEvaluationObject seo;

  private NamespaceClient(String session) {
    this.mapper = new ObjectMapper();
    this.session = session;
    String account = "beaker:" + System.getenv("beaker_core_password");
    this.auth = "Basic " + Base64.encodeBase64String(account.getBytes());
    this.urlBase = "http://127.0.0.1:" + System.getenv("beaker_core_port") + "/rest/namespace";
  }

  public Object set4(String name, Object value, Boolean unset, Boolean sync)
    throws ClientProtocolException, IOException
  {
    Form form = Form.form().add("name", name)
      .add("sync", sync.toString())
      .add("session", this.session);
    if (!unset) {
      form.add("value", mapper.writeValueAsString(value));
    }
    String reply = Request.Post(urlBase + "/set")
      .addHeader("Authorization", auth).bodyForm(form.build())
      .execute().returnContent().asString();
    if (!reply.equals("ok")) {
      throw new RuntimeException(reply);
    }
    return value;
  }

  public Object set(String name, Object value)
    throws ClientProtocolException, IOException
  {
    return set4(name, value, false, true);
  }

  public Object setFast(String name, Object value)
    throws ClientProtocolException, IOException
  {
    return set4(name, value, false, false);
  }

  public Object unset(String name)
    throws ClientProtocolException, IOException
  {
    return set4(name, null, true, true);
  }

  public Object get(String name)
    throws ClientProtocolException, IOException
  {
    String args = "name=" + URLEncoder.encode(name, "ISO-8859-1") +
      "&session=" + URLEncoder.encode(this.session, "ISO-8859-1");
    String valueString = Request.Get(urlBase + "/get?" + args)
      .addHeader("Authorization", auth)
      .execute().returnContent().asString();
    NamespaceBinding binding = mapper.readValue(valueString, NamespaceBinding.class);
    if (!binding.getDefined()) {
      throw new RuntimeException("name not defined: " + name);
    }
    return binding.getValue();
  }

  public synchronized void setOutputObj(SimpleEvaluationObject o) {
    seo = o;
  }

  public synchronized void showProgressUpdate(String s) {
    if (seo != null) {
      BeakerProgressUpdate bpu = new BeakerProgressUpdate(s);
      seo.update(bpu);
    }
  }

  public synchronized void showProgressUpdate(int i) {
    if (seo != null) {
      BeakerProgressUpdate bpu = new BeakerProgressUpdate(i);
      seo.update(bpu);
    }
  }

  public synchronized void showProgressUpdate(String s, int i) {
    if (seo != null) {
      BeakerProgressUpdate bpu = new BeakerProgressUpdate(s,i);
      seo.update(bpu);
    }
  }

  public synchronized void showProgressUpdate(String s, Object p) {
    if (seo != null) {
      BeakerProgressUpdate bpu = new BeakerProgressUpdate(s,p);
      seo.update(bpu);
    }
  }

  public synchronized void showProgressUpdate(Object p) {
    if (seo != null) {
      BeakerProgressUpdate bpu = new BeakerProgressUpdate(p);
      seo.update(bpu);
    }
  }

  public synchronized void showProgressUpdate(int i, Object p) {
    if (seo != null) {
      BeakerProgressUpdate bpu = new BeakerProgressUpdate(i,p);
      seo.update(bpu);
    }
  }

  public synchronized void showProgressUpdate(String s, int i, Object p) {
    if (seo != null) {
      BeakerProgressUpdate bpu = new BeakerProgressUpdate(s,i,p);
      seo.update(bpu);
    }
  }

  public synchronized void showProgressUpdate(BeakerProgressUpdate o) {
    if (seo != null)
      seo.update(o);
  }

  private static Map<String,NamespaceClient> nsClients = new HashMap<String,NamespaceClient>();

  private static String currentSession;
  
  public synchronized static NamespaceClient getBeaker() {
    if (currentSession!=null)
      return nsClients.get(currentSession);
    return null;
    }

  public synchronized  static NamespaceClient getBeaker(String s) {
    if (!nsClients.containsKey(s))
      nsClients.put(s, new NamespaceClient(s));
    currentSession = s;
    return nsClients.get(currentSession);
  }

  
}
