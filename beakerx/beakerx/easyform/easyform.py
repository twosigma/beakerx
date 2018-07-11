# Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#        http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from beakerx.utils import getValue
from beakerx.beakerx_widgets import *
from ipykernel.comm import Comm
from traitlets import Bool, Unicode


class EasyForm(BeakerxBox):
    _view_name = Unicode('EasyFormView').tag(sync=True)
    _model_name = Unicode('EasyFormModel').tag(sync=True)
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    easyFormName = Unicode(default_value='Form default').tag(sync=True)
    test = ""
    HORIZONTAL = 1
    VERTICAL = 2

    def __init__(self, *args, **kwargs):
        super(EasyForm, self).__init__(**kwargs)
        self.easyFormName = getValue(kwargs, 'title', "")
        if self.easyFormName == "" and len(args) > 0:
            self.easyFormName = args[0]

    def _handle_msg(self, msg):
        print(msg)

    def addTextField(self, *args, **kwargs):
        text = BeakerxText(description=self.getDescription(args, kwargs))
        text.size = getValue(kwargs, 'width', -1)
        self.children += (text,)
        self.components[text.description] = text
        return text

    def addPasswordField(self, *args, **kwargs):
        password = BeakerxPassword(description=self.getDescription(args, kwargs))
        password.size = getValue(kwargs, 'width', -1)
        self.children += (password,)
        self.components[password.description] = password
        return password

    def addTextArea(self, *args, **kwargs):
        textarea = BeakerxTextArea(
            description=self.getDescription(args, kwargs))
        textarea.cols = getValue(kwargs, 'width', -1)
        textarea.rows = getValue(kwargs, 'height', -1)
        textarea.value = getValue(kwargs, 'value', "")
        textarea.placeholder = getValue(kwargs, 'placeholder', "")
        self.children += (textarea,)
        self.components[textarea.description] = textarea
        return textarea

    def addButton(self, *args, **kwargs):
        button = BeakerxButton(description=self.getDescription(args, kwargs))
        button.tag = getValue(kwargs, 'tag', "")
        button.on_click(self.buttonCallback)
        self.children += (button,)
        return button

    def buttonCallback(self, *args):
        if len(args) > 0:
            args[0].actionPerformed()
            arguments = dict(target_name='beakerx.tag.run')
            comm = Comm(**arguments)
            msg = {'runByTag': args[0].tag}
            state = {'state': msg}
            comm.send(data=state, buffers=[])

    def addList(self, *args, **kwargs):
        multi_select = getValue(kwargs, 'multi', True)
        if multi_select:
            list = SelectMultipleWithRows(
                description=self.getDescription(args, kwargs))
        else:
            list = SelectMultipleSingle(
                description=self.getDescription(args, kwargs))
        list.options = self.getOptions(args, kwargs)
        list.size = getValue(kwargs, 'rows', len(list.options))

        self.children += (list,)
        self.components[list.description] = list
        return list

    def addDatePicker(self, *args, **kwargs):
        data_picker = DatePicker(description=self.getDescription(args, kwargs))
        data_picker.value = getValue(kwargs, 'value', '')
        self.children += (data_picker,)
        self.components[data_picker.description] = data_picker
        return data_picker

    def addComboBox(self, *args, **kwargs):
        dropdown = BeakerxComboBox(description=self.getDescription(args, kwargs))
        dropdown.options = self.getOptions(args, kwargs)
        dropdown.original_options = self.getOptions(args, kwargs)
        dropdown.editable = getValue(kwargs, 'editable', False)
        self.children += (dropdown,)
        self.components[dropdown.description] = dropdown
        return dropdown

    def addCheckBox(self, *args, **kwargs):
        checkbox = BeakerxCheckbox(description=self.getDescription(args, kwargs))
        checkbox.value = getValue(kwargs, 'value', False)
        self.children += (checkbox,)
        self.components[checkbox.description] = checkbox
        return checkbox

    def addCheckBoxes(self, *args, **kwargs):
        layout = BeakerxHBox()
        orientation = getValue(kwargs, 'orientation', EasyForm.VERTICAL)
        if orientation == EasyForm.HORIZONTAL:
            
            box = BeakerxHBox()
        else:
            box = BeakerxVBox()
        checkbox = BeakerxCheckboxGroup()

        for checkBoxItem in self.getOptions(args, kwargs):
            children = BeakerxCheckbox(description=checkBoxItem)
            checkbox.addChildren(children)
            box.children += (children,)

        layout.children += (BeakerxLabel(value=self.getDescription(args, kwargs)), box,)
        self.children += (layout,)
        self.components[self.getDescription(args, kwargs)] = checkbox
        return layout

    def addRadioButtons(self, *args, **kwargs):
        orientation = getValue(kwargs, 'orientation', EasyForm.VERTICAL)
        radio_buttons = RadioButtons(options=self.getOptions(args, kwargs),
                                     description=self.getDescription(args,
                                                                     kwargs))
        radio_buttons.index = None
        if orientation == EasyForm.VERTICAL:
            self.children += (radio_buttons,)
        else:
            box = BeakerxHBox()
            box.children += (radio_buttons,)
            self.children += (box,)
        self.components[radio_buttons.description] = radio_buttons
        return radio_buttons

    def addWidget(self, name, widget):
        EasyFormComponent.add_interface_to(widget)
        self.children += (widget,)
        self.components[name] = widget
        return widget

    def __iter__(self):
        return iter(self.components)

    def __getitem__(self, key):
        return self.get(key)

    def __setitem__(self, key, value):
        self.put(key, value)

    def get(self, key):
        if key in self.components:
            return self.components[key].value
        else:
            return ""

    def put(self, key, value):
        self.components[key].set_value(value)

    @staticmethod
    def getDescription(args, kwargs):
        if len(args) > 0:
            return args[0]
        else:
            return getValue(kwargs, 'description', "")

    @staticmethod
    def getOptions(args, kwargs):
        if len(args) > 1:
            return args[1][:]
        else:
            return getValue(kwargs, 'options', [])
