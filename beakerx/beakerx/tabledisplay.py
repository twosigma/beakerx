import ipywidgets as widgets
from traitlets import Unicode


@widgets.register('beakerx.TableDisplay')
class TableDisplay(widgets.DOMWidget):
    """"""
    _view_name = Unicode('TableDisplayView').tag(sync=True)
    _model_name = Unicode('TableDisplayModel').tag(sync=True)
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
