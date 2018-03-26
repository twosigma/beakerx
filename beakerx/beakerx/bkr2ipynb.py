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
import re
import sys
import json
import nbformat
import argparse
import os
from nbformat.v4 import new_notebook, new_code_cell, new_markdown_cell

def setHeader(level, title):
    dash = ''
    while level != 0:
        dash += '#'
        level -= 1
    return '{0} {1}'.format(dash, title)

def getFixedCodeText(cell):
    ret = '';
    body = cell['body']
    if isinstance(body, list):
        ret = "\n".join(body)
    else:
       ret = body
    ret = re.sub(r'\bbeaker\b', 'beakerx', ret)
    return ret;

def parseBkr(data):
    nb = new_notebook()
    evaluators = list((cell['evaluator']) for cell in data['cells'] if 'evaluator' in cell)
    kernel_name = max(evaluators, key=evaluators.count) if evaluators else 'IPython'
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
            if 'initialization' in cell:
                metadata['init_cell'] = True
            if 'tags' in cell:
                tags = [cell['tags']]
                metadata['tags'] = tags
            if cell['evaluator'] != kernel_name:
                if cell['evaluator'] == 'TeX':
                    nb.cells.append(new_markdown_cell("${0}$".format(getFixedCodeText(cell['input']))))
                else:
                    nb.cells.append(
                        new_code_cell(source='%%{0}\n{1}'.format(cell['evaluator'].lower(), getFixedCodeText(cell['input'])),
                                      metadata=metadata))
            else:
                nb.cells.append(new_code_cell(source=getFixedCodeText(cell['input']), metadata=metadata))
        if cell['type'] == 'markdown':
            nb.cells.append(new_markdown_cell(getFixedCodeText(cell)))
        if cell['type'] == 'section':
            nb.cells.append(new_markdown_cell(setHeader(cell['level'], cell['title'])))
    return nb

def convertNotebook(notebook):
    with open(notebook, encoding='utf-8') as data_file:
        data = json.load(data_file)
    nb = parseBkr(data)
    nbformat.write(nb, os.path.splitext(notebook)[0] + '.ipynb')

def main(args):
    for notebook in args.notebooks:
        convertNotebook(notebook)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('notebooks', nargs='+',
                    help="beaker notebooks to be converted. Enter *.bkr in case you want to convert all notebooks at once.")
    if len(sys.argv) == 1:
        parser.print_help()
    args = parser.parse_args()
    main(args)
