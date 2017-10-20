## Dependencies

Running the e2e tests from its GitHub source code requires Chrome browser version 58+.

## Setting Up a Test Environment

Create a [notebook configuration file](http://jupyter-notebook.readthedocs.io/en/latest/public_server.html#prerequisite-a-notebook-configuration-file):
```
$ jupyter notebook --generate-config
```

[Prepare a hashed password:](http://jupyter-notebook.readthedocs.io/en/latest/public_server.html#preparing-a-hashed-password)
Set up password as 'beakerx'.
``` 
$ jupyter notebook password
Enter password: beakerx 
Verify password: beakerx
[NotebookPasswordApp] Wrote hashed password to /Users/you/.jupyter/jupyter_notebook_config.json
```

## Run the tests

```
source activate beakerx && python ./run_tests.py
```
