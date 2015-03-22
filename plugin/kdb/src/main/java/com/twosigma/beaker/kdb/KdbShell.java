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

import com.google.common.primitives.*;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.object.TableDisplay;
import com.twosigma.beaker.jvm.serialization.BasicObjectSerializer;
import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import kx.c;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.ClassUtils;
import org.apache.http.client.fluent.Request;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;

import static kx.c.Dict;
import static kx.c.Flip;

/**
 * Wraps a kdb process and manages communication with it.
 */
public class KdbShell {
    private final static Logger logger = Logger.getLogger(KdbShell.class.getName());

    // Shell configuration.
    private final String                shellId;
    private final String                sessionId;
    private final int                   corePort;
    private final BeakerObjectConverter objConv;

    // The kdb process.
    private final int        kdbPort;
    private final KdbProcess kdbProcess;

    // The kdb client.
    private final KdbClient kdbClient;

    public KdbShell(String shellId, String sessionId, int corePort, BeakerObjectConverter objConv) throws Exception {
        this.shellId   = shellId;
        this.sessionId = sessionId;
        this.corePort  = corePort;
        this.objConv   = objConv;

        kdbPort = getPortFromCore();
        kdbProcess = new KdbProcess(sessionId, kdbPort);
        kdbProcess.start();

        kdbClient = new KdbClient("localhost", kdbPort);
    }

    /**
     * Pass a string to kdb for evaluation.
     */
    public void evaluate(SimpleEvaluationObject obj, String code) {
        try {
            Object result = kdbClient.execute(code);
            obj.finished(convert(result));
        } catch (Exception e) {
            obj.error(e);
        }
    }

    /**
     * Is this character part of a valid kdb name?
     */
    private boolean isQName(char c) {
        return
            ((c >= 'A') && (c <= 'Z')) ||
            ((c >= 'a') && (c <= 'z')) ||
            ((c >= '0') && (c <= '9')) ||
             (c == '_');
    }

    /**
     * Autocomplete a kdb expression.
     */
    public List<String> autocomplete(String code, int caretPosition) {
        if (code.isEmpty()) return null;

        // Go back build the longest name string we can.
        int s = caretPosition - 1;
        while ((s >= 0) && isQName(code.charAt(s))) { --s; }

        try {
            return Arrays.asList(
                (String[]) kdbClient.execute(".bk.ac[\"" + code.substring(s + 1, caretPosition) + "\"]")
            );
        } catch (Exception ex) {
            return null;
        }
    }

    /**
     * Try and stop the current kdb query.
     */
    public void cancelExecution() {
        try {
            kdbClient.interruptQuery();
        } catch (Exception e) {
            logger.log(Level.WARNING, "Interrupt failed", e);
        }
    }

    /**
     * So long, farewell.
     */
    public void exit() {
        try {
            kdbClient.close();
        } catch (IOException e) {
            //
        }
        kdbProcess.interrupt();
        try {
            kdbProcess.join(5000);
        } catch (InterruptedException e) {
            //
        }
    }

    /**
     * kdb result conversions to standard beaker types.
     *
     * TODO it would be better if this was handled by customizing a
     * serializer module, but I don't see a clean way of doing that.
     */
    private Object convert(Object o) {
        // Convert flips of simple lists into TableDisplays.
        if (c.t(o) == 98) to_tabledisplay: {
            Flip f = (Flip)o;

            // Make sure each column is an array and a type we can handle.
            List<String>  columns  = Arrays.asList(f.x);
            List<String>  classes  = new ArrayList<>();
            List<List<?>> colLists = new ArrayList<>();
            for (Object c : f.y) {
                List<?> values = toList(c);
                if (values == null) {
                    break to_tabledisplay;
                }
                String type = objConv.convertType(
                    ClassUtils.primitiveToWrapper(
                        c.getClass().getComponentType()
                    ).getName()
                );
                if (type == null) {
                    break to_tabledisplay;
                }

                // Special case - convert Dates to nanosecond times.
                if (BasicObjectSerializer.TYPE_TIME.equals(type)) {
                    List<Long> timestamps = new ArrayList<>(values.size());
                    for (Object d : values) {
                        timestamps.add(TimeUnit.NANOSECONDS.convert(((Date) d).getTime(), TimeUnit.MILLISECONDS));
                    }
                    values = timestamps;
                }

                classes.add(type);
                colLists.add(values);
            }

            // Columns to rows.
            int rows = colLists.get(0).size();
            List<List<?>> values = new ArrayList<>();
            for (int row = 0; row < rows; ++row) {
                List<Object> rowValues = new ArrayList<>();
                for (List<?> col : colLists) {
                    rowValues.add(col.get(row));
                }
                values.add(rowValues);
            }

            return new TableDisplay(values, columns, classes);
        }

        // Convert Dicts to maps.
        if (c.t(o) == 99) to_map: {
            Dict f = (Dict)o;

            // Special case - keyed tables are dicts of flips.
            if ((c.t(f.x) == 98) && (c.t(f.y) == 98)) to_table:{
                Flip keys = (Flip) f.x;
                Flip cols = (Flip) f.y;
                return convert(new Flip(new Dict(
                    ArrayUtils.addAll(keys.x, cols.x),
                    ArrayUtils.addAll(keys.y, cols.y)
                )));
            }

            List<?> keys   = toList(f.x); if (keys   == null) break to_map;
            List<?> values = toList(f.y); if (values == null) break to_map;
            Map<Object, Object> map = new HashMap<>();
            for (int i = 0; i < values.size(); ++i) {
                map.put(keys.get(i), values.get(i));
            }
            return map;
        }

        // No conversion.
        return o;
    }

    /**
     * Try and convert an object to a List.
     */
    private List<?> toList(Object o) {
        Class<?> c = o.getClass();
        if (!c.isArray()) {
            return null;
        }
        if (c.getComponentType().isPrimitive()) {
            if (o instanceof boolean[]) {
                return Booleans.asList((boolean[]) o);
            } else if (o instanceof byte[]) {
                return Bytes.asList((byte[]) o);
            } else if (o instanceof short[]) {
                return Shorts.asList((short[]) o);
            } else if (o instanceof int[]) {
                return Ints.asList((int[]) o);
            } else if (o instanceof long[]) {
                return Longs.asList((long[]) o);
            } else if (o instanceof float[]) {
                return Floats.asList((float[]) o);
            } else if (o instanceof double[]) {
                return Doubles.asList((double[]) o);
            } else if (o instanceof char[]) {
                return Chars.asList((char[]) o);
            } else {
                throw new RuntimeException("Unhandled primitive type");
            }
        } else {
            return Arrays.asList((Object[]) o);
        }
    }

    /**
     * Query the beaker server to get an available port.
     */
    private int getPortFromCore() throws IOException {
        String password = System.getenv("beaker_core_password");
        String auth     = Base64.encodeBase64String(("beaker:" + password).getBytes("ASCII"));
        String response = Request.Get("http://127.0.0.1:" + corePort + "/rest/plugin-services/getAvailablePort")
            .addHeader("Authorization", "Basic " + auth)
            .execute().returnContent().asString();
        return Integer.parseInt(response);
    }
}
