package org.lappsgrid.jupyter.groovy.threads;

import java.security.NoSuchAlgorithmException;

import org.lappsgrid.jupyter.groovy.GroovyKernel;
import org.lappsgrid.jupyter.groovy.msg.Message;
import org.zeromq.ZMQ;

import com.twosigma.beaker.jupyter.threads.AbstractNoSocketThread;

/**
 * @author Keith Suderman
 */
public abstract class AbstractThread extends AbstractNoSocketThread {

  private ZMQ.Socket socket;
  private GroovyKernel kernel;

  public AbstractThread(ZMQ.Socket socket, GroovyKernel kernel) {
    this.kernel = kernel;
    this.socket = socket;
  }

  public Message readMessage() {
    return getKernel().readMessage(socket);
  }

  public void send(Message message) throws NoSuchAlgorithmException {
    getKernel().send(socket, message);
  }

  public ZMQ.Socket getSocket() {
    return socket;
  }
  
  public GroovyKernel getKernel() {
    return kernel;
  }

}