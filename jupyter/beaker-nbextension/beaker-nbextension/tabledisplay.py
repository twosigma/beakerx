import ipywidgets as widgets
from traitlets import Unicode


@widgets.register('beaker-nbextension.TableDisplay')
class TableDisplay(widgets.DOMWidget):
    """"""
    _view_name = Unicode('TableDisplayView').tag(sync=True)
    _model_name = Unicode('TableDisplayModel').tag(sync=True)
    _view_module = Unicode('beaker-nbextension').tag(sync=True)
    _model_module = Unicode('beaker-nbextension').tag(sync=True)
