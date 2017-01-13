# Groovy Jupyter Kernel

A native [Jupyter](http://jupyter.org) kernel for the [Apache Groovy](http://www.groovy-lang.org) language. By "native" we mean the kernel is written in Groovy and handles the ZeroMQ message queues directly.

## Documentation

The Maven generate site (API docs etc.) is available [here](https://lappsgrid-incubator.github.io/jupyter-groovy-kernel).

## Installation

### From Source

Building the Groovy Jupyter Kernel project requires Maven 3.x or higher.

```bash
$> git clone https://github.com/lappsgrid-incubator/jupyter-groovy-kernel.git 
$> cd jupyter-groovy-kernel
$> mvn package
$> ./install.sh <kernel directory>
```

Where *&lt;kernel directory&gt;* is a directory where the kernel jar file will be copied and can be any directory on your system.

### Manually

Download and expand the [Groovy Kernel archive](http://www.lappsgrid.org/downloads/jupyter-groovy-kernel-latest.tgz) and then run the *install.sh* script.

```bash
$> wget http://www.lappsgrid.org/downloads/jupyter-groovy-kernel-latest.tgz
$> tar xzf jupyter-groovy-kernel-latest.tgz
$> cd jupyter-groovy-kernel
$> ./install.sh <kernel directory>
```

Where *&lt;kernel directory&gt;* is a directory where the kernel jar file will be copied and can be any directory on your system.

### Notes

By default the *install.sh* script will install the Jupyter kernel to  the system kernel directory. This is typically */usr/local/share/juptyer* on Linux/MacOS systems and %PROGRAMDATA%\jupyter\kernels on Windows systems. To install the Jupyter kernel to the User's directory you must either:

* Edit the *install.script* and add the *--user* option to the `kernelspec` command, or
* Edit the kernel.json file to set the *argv* paramater to the location of the Jupyter Groovy kernel and then run the `jupyter kernelspec install` command.

## Creating a Kernel for a Groovy DSL

### The short version

To create a Jupyter kernel for a Groovy DSL you will need to:

1. Add the Groovy Jupyter kernel project as a dependency.
1. Implement the `GroovyContext` interface to provide a CompilerConfiguration,
base script, and/or MetaClass object for compiling user code.
1. Pass your `GroovyContext` to the `GroovyKernel` constructor

### The long version

The Groovy kernel uses objects that implement the `org.lappsgrid.jupyter.groovy.context.GroovyContext` interface to configure the Groovy compiler and to obtain `MetaClass` instances that are attached to the compiled script objects.  

```java
interface GroovyContext {
    CompilerConfiguration getCompilerConfiguration();
    MetaClass getMetaClass(Class aClass);
}
```

There is also a `DefaultGroovyContext` class that implements both methods and returns a default `CompilerConfiguration` object and default `ExapandoMetaClass`.  You can use the `DefaultGroovyContext` class if you only want/need to implement one of the `GroovyContext` methods.

To create a Jupyter kernel for a Groovy DSL implement the `GroovyContext` interface and pass that object to the *GroovyKernel*  constructor.

```java
class CustomContext extends DefaultGroovyContext {
    ...
}

class CustomJupyterKernel {
    static void main(String[] args) {
        GroovyContext context = new CustomContext()
        GroovyKernel kernel = new GroovyKernel(context)
        kernel.connectionFile = new File(args[0])
        kernel.run()
}
```

See the [Lappsgrid Services DSL Jupyter kernel](https://github.com/lappsgrid-incubator/jupyter-lsd-kernel) for an example of implementing a Jupyter kernel for a Groovy DSL using the Groovy Jupyter kernel.
