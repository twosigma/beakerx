package org.lappsgrid.jupyter.groovy.handler;

import org.lappsgrid.jupyter.groovy.GroovyKernel;
import org.lappsgrid.jupyter.groovy.msg.Message;

/**
 * Does nothing right now.
 *
 * @author Keith Suderman
 */
public class HistoryHandler extends AbstractHandler {
    public HistoryHandler(GroovyKernel kernel) {
        super(kernel);
    }

    @Override
    public void handle(Message message) {
        //TODO Handle history messages.
    }

}