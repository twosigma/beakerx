package com.twosigma.beaker.jupyter.handler;

import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.util.Collection;
import java.util.Map;

import org.lappsgrid.jupyter.groovy.GroovyKernel;
import org.lappsgrid.jupyter.groovy.handler.AbstractHandler;
import org.lappsgrid.jupyter.groovy.msg.Message;
import org.slf4j.LoggerFactory;

import com.twosigma.beaker.jupyter.Comm;

public class CommMsgHandler extends AbstractHandler<Message> {

  public static final String COMM_ID = "comm_id";
  public static final String TARGET_NAME = "target_name";
  public static final String DATA = "data";
  public static final String TARGET_MODULE = "target_module";

  public CommMsgHandler(GroovyKernel kernel) {
    super(kernel);
    logger = LoggerFactory.getLogger(CommMsgHandler.class);
  }

  // TODO remove System.out.println
  public void handle(Message message) throws NoSuchAlgorithmException {
    Map<String, Serializable> commMap = message.getContent();

    Comm comm = kernel.getComm(getString(commMap, COMM_ID));
    comm.setData(commMap.get(DATA));
    if (comm.getData() != null) {
      hangleData(comm.getData());
    } else {
      System.out.println("Comm message contend is null");
    }
  }

  public static String getString(Map<String, Serializable> map, String name) {
    String ret = null;
    if (map != null && name != null && map.containsKey(name)) {
      ret = (String) map.get(name);
    }
    return ret;
  }

  // TODO read and handle comm message
  // TODO remove System.out.println
  public void hangleData(Object data) {
    System.out.println("Handing comm messahe content:");
    if (data instanceof Map<?, ?>) {
      System.out.println("Comm content is map, key list:");
      for (Object key : ((Map<?, ?>) data).keySet()) {
        System.out.println(key);
      }
    } else if (data instanceof Collection<?>) {
      System.out.println("Comm content is Collection, content is:");
      for (Object value : ((Collection<?>) data)) {
        System.out.println(value);
      }
    } else {
      System.out.println("Comm mesage content Class is:");
      System.out.println(data.getClass().getName());
      System.out.println("Comm mesage content value toString():");
      System.out.println(data);
    }
    System.out.println("Handing comm messahe content END");
  }

}