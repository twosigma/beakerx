from IPython import get_ipython
import logging

def comm_msg(stream, ident, msg):
    content = msg['content']
    comm_id = content['comm_id']
    comm_manager = get_ipython().kernel.comm_manager
    comm = comm_manager.comms.get('comm_id')
    if comm is None:
        magic_registry = comm_manager.kernel.shell.magics_manager.registry
        for magic in magic_registry.values():
            if (hasattr(magic, 'pass_message') and comm_id in magic.comms):
                try:
                    magic.pass_message(msg)
                    return
                except Exception:
                    comm_manager.log.error('Exception in comm_msg for %s', comm_id, exc_info=True)
        comm_manager.log.warn("No such comm: %s", comm_id)
        if comm_manager.log.isEnabledFor(logging.DEBUG):
            comm_manager.log.debug("Current comms: %s", list(comm_manager.comms.keys()))
    else:
        try:
            comm.handle_msg(msg)
        except Exception:
            comm_manager.log.error('Exception in comm_msg for %s', comm_id, exc_info=True)


def load_ipython_extension(ipython):
    ipython.kernel.shell_handlers['comm_msg'] = comm_msg
