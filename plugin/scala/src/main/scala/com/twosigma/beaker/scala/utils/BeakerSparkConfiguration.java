/*
 *      Copyright (c) 2014 Two Sigma Investments, LLC.
 *      All Rights Reserved
 *
 *      THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF
 *      Two Sigma Investments, LLC.
 *
 *      The copyright notice above does not evidence any
 *      actual or intended publication of such source code.
 */

package com.twosigma.beaker.scala.utils;

import java.util.HashMap;
import java.util.Map;
import java.util.Arrays;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@JsonAutoDetect
public class BeakerSparkConfiguration {

  private final static Logger log = LoggerFactory.getLogger(BeakerSparkConfiguration.class.getName());

  private boolean persistent = false;
  private String sparkContextAlias = "sc";
  private String sqlContextAlias = "sqlContext";
  private String datacenter = "cook://codete@localhost:12321";
  private Map<String, String> sparkConf = new HashMap<>();

  public BeakerSparkConfiguration() {}

  private static final String EMPTY_STRING = "";

  public boolean isPersistent() {
    return persistent;
  }
  public void setPersistent(boolean b) {
    persistent = b;
  }

  public String getSparkContextAlias() {
    return sparkContextAlias;
  }
  public void setSparkContextAlias(String s) {
    sparkContextAlias = s;
  }

  public String getSqlContextAlias() {
    return sqlContextAlias;
  }
  public void setSqlContextAlias(String s) {
    sqlContextAlias = s;
  }

  public String getDatacenter() {
    return datacenter;
  }
  public void setDatacenter(String s) {
    datacenter = s;
  }

  public Map<String, String> getSparkConf() {
    return sparkConf;
  }
  public void setSparkConf(Map<String, String> m) {
    sparkConf.putAll(m);
    persistent = false;
    datacenter = "cook://codete@localhost:12321";
  }

  public String validate() {
    if (sparkContextAlias.equals(sqlContextAlias))
      return "SparkContext and SQLContext have the same alias";
    return EMPTY_STRING;
  }

  public void updateSparkConfProperty(String key, String value) {
    sparkConf.put(key, value);
  }

  public static BeakerSparkConfiguration fromJSON(String json) {
    ObjectMapper objectMapper = new ObjectMapper();
    Map<String, String> config = new HashMap<>();
    BeakerSparkConfiguration configuration = new BeakerSparkConfiguration();
    try {
      config = objectMapper.readValue(
        json,
        objectMapper.getTypeFactory().constructMapType(HashMap.class, String.class, String.class));
      log.info("Configuration:\n" + Arrays.toString(config.entrySet().toArray()));
      for (Map.Entry<String, String> entry : config.entrySet()) {
        switch (entry.getKey()) {
          case "persistent":
            configuration.setPersistent(entry.getValue().equals("true"));
            break;
          case "sparkContextAlias":
            configuration.setSparkContextAlias(entry.getValue());
            break;
          case "sqlContextAlias":
            configuration.setSqlContextAlias(entry.getValue());
            break;
          case "datacenter":
            String master = "cook://codete@localhost:12321";
            configuration.sparkConf.put("spark.master", master);
          default:
            if (entry.getKey().startsWith("spark.")) {
              // SparkConf property
              configuration.sparkConf.put(entry.getKey(), entry.getValue());
            }
        }
      }

      if (configuration.persistent) {
        String master = configuration.sparkConf.get("spark.master");
        if (master.startsWith("cook://")) {
          master = "persistent-" + master;
          configuration.sparkConf.put("spark.master", master);
        }
      }

      String validation = configuration.validate();
      if (!validation.equals(EMPTY_STRING)) {
        throw new Exception(String.format("Spark configuration is invalid: %s", validation));
      }
    } catch (Exception e) {
      log.error("Error while deserializing Spark configuration.", e);
    }
  
    return configuration;
  }

  @Override
  public String toString() {
    String r = "{}";
    ObjectMapper mapper = new ObjectMapper(); 
    try {
      r = mapper.writeValueAsString(this);
    } catch (Exception e) {
      log.error("Error while serializing Spark configuration.", e);
    }
    return r;
  }
}
