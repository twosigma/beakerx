package org.lappsgrid.jupyter.groovy.handler;

import java.security.NoSuchAlgorithmException;

import org.lappsgrid.jupyter.groovy.msg.Message;

/**
 * Defines objects that can respond to Jupyter messages. There will be one
 * handler for each ZMQ.Socket.
 *
 * @author Keith Suderman
 */
public interface IHandler {
    public abstract void handle(Message message) throws NoSuchAlgorithmException;
}
