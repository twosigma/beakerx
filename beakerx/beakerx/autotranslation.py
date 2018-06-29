from ipykernel.zmqshell import ZMQInteractiveShell
from beakerx.runtime import autotranslation_update

def on_open_comm_msg(comm, msg):
    comm.on_msg(on_msg_handler)

def on_msg_handler(msg):
    content = msg['content']['data']
    val = content['value']
    var = content['name']
    autotranslation_update(var, val)

def load_ipython_extension(ipython):
    if isinstance(ipython, ZMQInteractiveShell):
        ipython.kernel.comm_manager.register_target('beakerx.autotranslation', on_open_comm_msg)
