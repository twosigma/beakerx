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

import com.twosigma.beaker.core.rest.StreamGobbler;
import org.apache.commons.lang3.SystemUtils;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * Wraps a kdb process.
 */
public final class KdbProcess extends Thread {
    // Environment variable names.
    private static final String QHOME                = "QHOME";
    private static final String QLIC                 = "QLIC";
    private static final String BEAKER_CORE_PASSWORD = "beaker_core_password";
    private static final String BEAKER_CORE_PORT     = "beaker_core_port";
    private static final String SESSION_ID           = "session_id";

    // Kdb configuration.
    private final String qhome = System.getenv(QHOME);
    private final String qbin;

    // Session id.
    private final String sessionId;

    // The port to have kdb listen on.
    private final int kdbPort;

    /**
     * Create a new KdbProcess.
     *
     * @param sessionId  the session id (for namespace access).
     * @param kdbPort    the port for kdb to listen on.
     */
    public KdbProcess(String sessionId, int kdbPort) throws Exception {
        super("kdb-" + sessionId + ":" + kdbPort);
        this.sessionId = sessionId;
        this.kdbPort = kdbPort;

        // Try to find the q binary.
        if (qhome == null) {
            throw new Exception("QHOME is not set");
        }

        {
            // Get OS-specific candidates.
            List<String> binaries = new ArrayList<>();
            if (SystemUtils.IS_OS_WINDOWS) {
                binaries.add("q.exe");
            } else if (SystemUtils.IS_OS_MAC_OSX) {
                binaries.add("m64/q");
                binaries.add("m32/q");
            } else if (SystemUtils.IS_OS_LINUX) {
                binaries.add("l64/q");
                binaries.add("l32/q");
            } else {
                throw new Exception("Unsupported operating system");
            }

            String bin = null;
            for (String s : binaries) {
                String f = qhome + File.separator + s;
                if (new File(f).canExecute()) {
                    bin = f;
                    break;
                }
            }

            if (bin == null) {
                throw new Exception("Cannot find q binary");
            } else {
                qbin = bin;
            }
        }

        // Beaker calls destroy() on us, so add a shutdown hook to
        // cleanly shut down kdb at the end.
        Runtime.getRuntime().addShutdownHook(new Thread("kdb-killer") {
            @Override
            public void run() {
                KdbProcess.this.interrupt();
            }
        });
    }

    @Override
    public void run() {
        try {
            runImpl();
        } catch (Exception e) {
            // TODO
            e.printStackTrace();
        }
    }

    private void runImpl() throws Exception {
        // Guess at QLIC if it's not set.
        String qlic = System.getenv(QLIC);
        if (qlic == null) {
            qlic = qhome + File.separator + "k4.lic";
        }

        // Start kdb.
        Process kdbProcess = Runtime.getRuntime().exec(new String[] {
            qbin,
            "-p",
            Integer.toString(kdbPort)
        }, new String[] {
            QHOME + "=" + qhome,
            QLIC  + "=" + qlic,
            BEAKER_CORE_PASSWORD + "=" + System.getenv(BEAKER_CORE_PASSWORD),
            BEAKER_CORE_PORT + "=" + System.getenv(BEAKER_CORE_PORT),
            SESSION_ID + "=" + sessionId
        });

        // Wrap stdout.
        StreamGobbler stdout = new StreamGobbler(kdbProcess.getInputStream(), "stdout");
        stdout.start();

        // Wait until kdb exits or we're interrupted.
        while (true) {
            try {
                // Wait for kdb to exit.
                kdbProcess.waitFor();
                break;
            } catch (InterruptedException e) {
                // Interrupted - destroy the process.
                kdbProcess.destroy();
            }
        }
    }
}
