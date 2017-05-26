from beakerx.groovy_magic import GroovyMagics

def load_ipython_extension(ipython):
    ipython.register_magics(GroovyMagics)

def unload_ipython_extension(ipython):
    pass