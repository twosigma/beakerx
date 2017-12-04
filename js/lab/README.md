# BeakerX JupyterLab extension NPM module

BeakerX: Beaker Extensions for JupyterLab.
This NPM module has the BeakerX widgets.
See http://BeakerX.com

Install
-------

To install the experimental beakerx JupyterLab extension, install the
Python package, make sure the Jupyter widgets extension is installed,
and install the beakerx extension:

```
git clone https://github.com/twosigma/beakerx.git
conda create -y -n beakerx 'python>=3' nodejs pandas openjdk maven
source activate beakerx
conda install -c conda-forge jupyterlab
(cd beakerx; pip install -e . --verbose)
beakerx-install
cd js/lab
jupyter labextension install @jupyter-widgets/jupyterlab-manager
jupyter labextension install .
```
