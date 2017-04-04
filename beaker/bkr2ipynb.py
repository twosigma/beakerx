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

"""Create a notebook containing code from a beaker notebook.

Run as:  python bkr2ipynb.py [notebook name].bkr
"""
import sys
import json
import nbformat
import argparse
from nbformat.v4 import new_notebook, new_code_cell, new_markdown_cell

parser = argparse.ArgumentParser()
parser.add_argument('notebooks', nargs='+',
                    help="beaker notebooks to be converted. Enter *.bkr in case you want to convert all notebooks at once.")
if len(sys.argv) == 1:
    parser.print_help()
args = parser.parse_args()


def setHeader(level, title):
    dash = ''
    while level != 0:
        dash += '#'
        level -= 1
    return '{0} {1}'.format(dash, title)


def convertNotebook(notebook):
    nb = new_notebook()
    with open(notebook) as data_file:
        data = json.load(data_file)
    evaluators = list((cell['evaluator']) for cell in data['cells'] if 'evaluator' in cell)
    kernel_name = max(evaluators, key=evaluators.count)
    if kernel_name in ['JavaScript', 'HTML', 'TeX']:
        kernel_name = 'IPython'
    if kernel_name == 'IPython':
        kernel_spec = {"kernelspec": {
            "display_name": "Python 2",
            "language": "python",
            "name": "python2"
        }}
    else:
        kernel_spec = {"kernelspec": {
            "display_name": kernel_name,
            "language": kernel_name.lower(),
            "name": kernel_name.lower()
        }}
    nb.metadata = kernel_spec
    for cell in data['cells']:
        if cell['type'] == 'code':
            metadata = {}
            if 'tags' in cell:
                tags = [cell['tags']]
                metadata = {"tags": tags}
            if cell['evaluator'] != kernel_name:
                if cell['evaluator'] == 'TeX':
                    nb.cells.append(new_markdown_cell("${0}$".format("\n".join(map(str, cell['input']['body'])))))
                else:
                    nb.cells.append(
                        new_code_cell(source='%%{0}\n{1}'.format(cell['evaluator'].lower(),
                                                                 "\n".join(map(str, cell['input']['body']))),
                                      metadata=metadata))
            else:
                nb.cells.append(new_code_cell(source="\n".join(map(str, cell['input']['body'])),
                                              metadata=metadata))
        if cell['type'] == 'markdown':
            nb.cells.append(new_markdown_cell("\n".join(map(str, cell['body']))))
        if cell['type'] == 'section':
            nb.cells.append(new_markdown_cell(setHeader(cell['level'], cell['title'])))
    nbformat.write(nb, notebook.partition('.')[0] + '.ipynb')


for notebook in args.notebooks:
    convertNotebook(notebook)
