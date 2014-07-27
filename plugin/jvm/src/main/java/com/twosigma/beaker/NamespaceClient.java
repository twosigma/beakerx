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

import java.io.IOException;
import java.net.URLEncoder;
import java.util.List;
import org.apache.commons.codec.binary.Base64;
import org.apache.http.client.fluent.Request;
import org.apache.http.client.fluent.Form;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.map.ObjectMapper;


public class NamespaceClient {

    private Base64 encoder;
    private String session;
    private ObjectMapper mapper;
    private String auth;
    private String urlBase;

    public NamespaceClient(String session) {
	this.encoder = new Base64();
	this.mapper = new ObjectMapper();
	this.session = session;
	String account = "beaker:" + System.getenv("beaker_core_password");
	this.auth = "Basic " + encoder.encodeBase64String(account.getBytes());
	this.urlBase = "http://127.0.0.1:" + System.getenv("beaker_core_port") +
	    "/rest/namespace";
    }

    public void set(String name, Object value)
	throws ClientProtocolException, IOException
    {
	
	
	List<NameValuePair> form = Form.form()
	    .add("name", name)
	    .add("value", mapper.writeValueAsString(value))
	    .add("sync", "false")
	    .add("session", this.session).build();
	Request.Post(urlBase + "/set")
	    .addHeader("Authorization", auth).bodyForm(form).execute();
    }
    public Object get(String name)
	throws ClientProtocolException, IOException
    {
	String args = "name=" + URLEncoder.encode(name, "ISO-8859-1") +
	    "&session=" + URLEncoder.encode(this.session, "ISO-8859-1");
	String valueString = Request.Get(urlBase + "/get?" + args)
	    .addHeader("Authorization", auth)
	    .execute().returnContent().asString();;
	Binding binding = mapper.readValue(valueString, Binding.class);
	if (!binding.defined) {
	    throw new RuntimeException("name not defined: " + name);
	}
	return binding.value;
    }

    // XXX duplicated code with NamespaceService, move to shared module.
  @JsonAutoDetect
  public static class Binding {

    private String name;
    private String session;
    private Object value;
    private Boolean defined;

    public String getName() {
      return this.name;
    }
    public String getSession() {
      return this.session;
    }
    public Object getValue() {
      return this.value;
    }
    public Boolean getDefined() {
      return this.defined;
    }
    public void setName(String s) {
      this.name = s;
    }
    public void setSession(String s) {
      this.session = s;
    }
    public void setValue(Object o) {
      this.value = o;
    }
    public void setDefined(Boolean b) {
      this.defined = b;
    }
    public Binding() {
    }
    public Binding(String session, String name, Object value, Boolean defined) {
      this.session = session;
      this.name = name;
      this.value = value;
      this.defined = defined;
    }
  }

}
