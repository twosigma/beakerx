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
import java.util.List;
import org.apache.commons.codec.binary.Base64;
import org.apache.http.client.fluent.Request;
import org.apache.http.client.fluent.Form;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;

public class Namespace {

    private Base64 encoder;
    private String session;

    public Namespace(String session) {
	this.encoder = new Base64();
	this.session = session;
    }

    public void set(String name, Object value)
	throws ClientProtocolException, IOException
    {

	String account = "beaker:" + System.getenv("beaker_core_password");
	String auth = encoder.encodeBase64String(account.getBytes());
	List<NameValuePair> form = Form.form().add("name", name)
	    .add("session", this.session).build();
	Request.Get("http://127.0.0.1:" + System.getenv("beaker_core_port") +
		    "/rest/namespace/set")
	    .addHeader("Authorization", "Basic " + auth).bodyForm(form).execute();
    }
    public Object get(String name) {
	return null;
    }
}
