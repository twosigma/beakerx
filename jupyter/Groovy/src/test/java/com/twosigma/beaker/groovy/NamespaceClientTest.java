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

package com.twosigma.beaker.groovy;

import com.twosigma.beaker.jupyter.GroovyKernelManager;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.Map;

public class NamespaceClientTest {

    private static String SESSION_ID = "sessionId";
    private NamespaceClient namespaceClient;
    private GroovyKernelTest groovyKernel;

    @Before
    public void setUp(){
        namespaceClient = NamespaceClient.getBeaker(SESSION_ID);
        groovyKernel = new GroovyKernelTest();
        GroovyKernelManager.register(groovyKernel);
    }

    @After
    public void tearDown() throws Exception {
        GroovyKernelManager.register(null);
    }

    @Test
    public void getNamespaceClientBySessionId_returnNamespaceClient(){
        //when
        NamespaceClient curNamespaceClient = NamespaceClient.getBeaker(SESSION_ID);
        //then
        Assertions.assertThat(namespaceClient).isNotNull();
        Assertions.assertThat(curNamespaceClient).isEqualTo(namespaceClient);
    }

    @Test
    public void getNamespaceClientByCurrentSessionId_returnNamespaceClient(){
        //when
        NamespaceClient curNamespaceClient = NamespaceClient.getBeaker();
        //then
        Assertions.assertThat(curNamespaceClient).isNotNull();
        Assertions.assertThat(curNamespaceClient).isEqualTo(namespaceClient);
    }

    @Test
    public void deleteNamespaceClientBySessionId_deleteNamespaceClient(){
        //when
        NamespaceClient.delBeaker(SESSION_ID);
        NamespaceClient curNamespaceClient = NamespaceClient.getBeaker();
        //then
        Assertions.assertThat(curNamespaceClient).isNull();
    }

    @Test
    public void setData_returnValue() throws Exception {
        //given
        NamespaceClient curNamespaceClient = NamespaceClient.getBeaker("returnValue");
        //when
        Object value = curNamespaceClient.set("x", new Integer(10));
        //then
        Assertions.assertThat(value).isNotNull();
        Assertions.assertThat(value).isEqualTo(new Integer(10));
    }

    @Test
    public void setData_setAutotranslationData() throws Exception {
        //given
        NamespaceClient curNamespaceClient = NamespaceClient.getBeaker("setAutotranslationData");
        //when
        curNamespaceClient.set("x", new Integer(10));
        //then
        Assertions.assertThat(groovyKernel.getMessages()).isNotEmpty();
        Map data = (Map) groovyKernel.getMessages().get(1).getContent().get("data");
        Assertions.assertThat(data.get("name")).isEqualTo("x");
        Assertions.assertThat(data.get("value")).isEqualTo("10");
        Assertions.assertThat(data.get("sync")).isEqualTo(Boolean.TRUE);
    }

    @Test
    public void setData_sendCommMessage() throws Exception {
        //given
        NamespaceClient curNamespaceClient = NamespaceClient.getBeaker("sendCommMessage");
        //when
        curNamespaceClient.set("x", new Integer(10));
        //then
        Assertions.assertThat(groovyKernel.getMessages()).isNotEmpty();
    }

}
