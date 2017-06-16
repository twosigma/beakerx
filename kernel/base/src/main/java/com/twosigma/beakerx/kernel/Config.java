/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.kernel;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Config {
	
    private String transport;
    private String key;
    @JsonProperty("ip")
    private String host;
    @JsonProperty("signature_scheme")
    private String scheme;
    @JsonProperty("kernel_name")
    private String name;
    @JsonProperty("control_port")
    private int control;
    @JsonProperty("shell_port")
    private int shell;
    @JsonProperty("stdin_port")
    private int stdin;
    @JsonProperty("hb_port")
    private int heartbeat;
    @JsonProperty("iopub_port")
    private int iopub;
	
    public String getTransport() {
        return transport;
    }

    public void setTransport(String transport) {
        this.transport = transport;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getScheme() {
        return scheme;
    }

    public void setScheme(String scheme) {
        this.scheme = scheme;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getControl() {
        return control;
    }

    public void setControl(int control) {
        this.control = control;
    }

    public int getShell() {
        return shell;
    }

    public void setShell(int shell) {
        this.shell = shell;
    }

    public int getStdin() {
        return stdin;
    }

    public void setStdin(int stdin) {
        this.stdin = stdin;
    }

    public int getHeartbeat() {
        return heartbeat;
    }

    public void setHeartbeat(int heartbeat) {
        this.heartbeat = heartbeat;
    }

    public int getIopub() {
        return iopub;
    }

    public void setIopub(int iopub) {
        this.iopub = iopub;
    }
}