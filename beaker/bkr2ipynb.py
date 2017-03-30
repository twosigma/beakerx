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
from nbformat.v4 import new_notebook, new_code_cell, new_markdown_cell

nb = new_notebook()

with open(sys.argv[1]) as data_file:
  data = json.load(data_file)

evaluators = list((cell['evaluator']) for cell in data['cells'] if 'evaluator' in cell)
kernel_name = max(evaluators, key=evaluators.count)

if kernel_name == 'IPython':
  kernel_spec = {"kernelspec": {
    "display_name": "Python 3",
    "language": "python",
    "name": "python3"
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
    if cell['evaluator'] != kernel_name:
      nb.cells.append(new_code_cell("%%" + cell['evaluator'] + "\n" + "\n".join(map(str, cell['input']['body']))))
    nb.cells.append(new_code_cell("\n".join(map(str, cell['input']['body']))))
  if cell['type'] == 'markdown':
    nb.cells.append(new_markdown_cell("\n".join(map(str, cell['body']))))
  if cell['type'] == 'section':
    nb.cells.append(new_markdown_cell('# ' + cell['title']))

nbformat.write(nb, sys.argv[1].partition('.')[0] + '.ipynb')
