from ._version import version_info, __version__

from .example import *
from .tabledisplay import *

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'beaker-nbextension',
        'require': 'beaker-nbextension/extension'
    }]
