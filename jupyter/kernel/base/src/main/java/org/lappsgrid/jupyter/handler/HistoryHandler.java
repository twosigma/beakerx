package org.lappsgrid.jupyter.handler;

import org.lappsgrid.jupyter.Kernel;
import org.lappsgrid.jupyter.msg.Message;

/**
 * Does nothing right now.
 *
 * @author Keith Suderman
 */
public class HistoryHandler extends AbstractHandler<Message> {
    public HistoryHandler(Kernel kernel) {
        super(kernel);
    }

    @Override
    public void handle(Message message) {
        //TODO Handle history messages.
    }

}