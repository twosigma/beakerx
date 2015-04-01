/*
 *  Copyright 2015 Michael Pymm
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
package com.twosigma.beaker.kdb;

import kx.c;
import org.apache.commons.lang3.SystemUtils;

import java.io.IOException;

/**
 * Wraps kx.c to a) manage reconnections etc. b) hide the horrible.
 */
public class KdbClient implements AutoCloseable {
    // kdb commands.
    public static final String PID_CMD  = ".z.i";

    // kdb server.
    private final String hostname;
    private final int    port;

    // kdb client.
    private kx.c c;

    // The kdb pid (retrieved after successful connection).
    private Integer pid;

    /**
     * Create a new kdb client.
     *
     * @param hostname  the host the server is running on.
     * @param port      the port to connect to.
     */
    public KdbClient(String hostname, int port) {
        this.hostname = hostname;
        this.port = port;
    }

    public synchronized Object execute(String query) throws IOException, kx.c.KException {
        // Connect if necessary.
        if (c == null) {
            c = new c(hostname, port);
            pid = (Integer) c.k(PID_CMD);
        }

        // Run the query.
        try {
            return c.k(query);
        } catch (IOException | kx.c.KException e) {
            c   = null;
            pid = null;
            throw e;
        }
    }

    /**
     * Interrupt the currently running query.
     */
    public synchronized void interruptQuery() throws Exception {
        // TODO - this is Linux/Mac only.
        if (SystemUtils.IS_OS_LINUX || SystemUtils.IS_OS_MAC_OSX) {
            if (pid != null) {
                Runtime.getRuntime().exec("kill -2 " + pid);
            }
        } else {
            throw new Exception("Not implemented on this operating system");
        }
    }

    @Override
    public synchronized void close() throws IOException {
        if (c != null) {
            c.close();
            c   = null;
            pid = null;
        }
    }
}
