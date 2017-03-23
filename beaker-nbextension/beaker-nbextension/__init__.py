from ._version import version_info, __version__

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'beaker-nbextension',
        'require': 'beaker-nbextension/extension'
    }]
