# Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

# to build: sudo docker build -t beakernotebook/beaker-base . # consider "build --no-cache" to sync network deps
# results hosted at: https://registry.hub.docker.com/u/beakernotebook/beaker/

FROM ubuntu:14.04

MAINTAINER Beaker Feedback <beaker-feedback@twosigma.com>

RUN useradd beaker --create-home

RUN apt-get update && apt-get dist-upgrade -y

RUN apt-get install -y software-properties-common python-software-properties

RUN add-apt-repository -y ppa:webupd8team/java && \
    add-apt-repository -y ppa:chris-lea/zeromq && \
    add-apt-repository -y ppa:marutter/rrutter && \
    add-apt-repository -y ppa:staticfloat/juliareleases && \
    add-apt-repository -y ppa:staticfloat/julia-deps  && \
    add-apt-repository -y ppa:chris-lea/node.js && \
    add-apt-repository -y ppa:cwchien/gradle && \
    add-apt-repository -y ppa:nginx/stable && \
    add-apt-repository -y ppa:brightbox/ruby-ng

RUN apt-get update && apt-get install -y nginx gradle-3.0 python g++ make git

##########
#  C++   #
##########

RUN apt-get install -y clang

##########
#  Java  #
##########

RUN echo debconf shared/accepted-oracle-license-v1-1 select true | debconf-set-selections
RUN apt-get install -y oracle-java8-installer

############
#  Python  #
############

RUN apt-get install -y libzmq3-dbg libzmq3-dev libzmq3 \
                       python-pip python-dev python-yaml \
                       python-matplotlib python-scipy

RUN pip install ipython jinja2 tornado pyzmq pandas jsonschema jupyter && \
    ipython kernel install

#############
#  Python3  #
#############

# https://bugs.launchpad.net/ubuntu/+source/python3.4/+bug/1290847
RUN apt-get install -y python-virtualenv python3-dev pkgconf libfreetype6-dev libfreetype6 \
    	    libxft-dev libblas-dev liblapack-dev gfortran libyaml-dev && \
    virtualenv /home/beaker/py3k -p python3 && \
    /home/beaker/py3k/bin/pip install ipython[notebook] jupyter && \
    /home/beaker/py3k/bin/pip install numpy matplotlib scipy jinja2 tornado pyzmq pandas pyaml && \
    /home/beaker/py3k/bin/ipython kernel install

#######
#  R  #
#######

RUN apt-get install -y r-base r-base-dev libxml2-dev libssl-dev libcurl4-gnutls-dev && \
    Rscript -e "install.packages('Rserve',,'http://cran.us.r-project.org')" && \
    Rscript -e "install.packages('ggplot2',,'http://cran.us.r-project.org')" && \
    Rscript -e "install.packages('devtools',,'http://cran.us.r-project.org')" && \
    Rscript -e "install.packages('RJSONIO',,'http://cran.us.r-project.org')" && \
    Rscript -e "install.packages('RCurl',,'http://cran.us.r-project.org')" && \
    Rscript -e "install.packages('jpeg',,'http://cran.us.r-project.org')" && \
    Rscript -e "install.packages('png',,'http://cran.us.r-project.org')" && \
    Rscript -e "install.packages('roxygen2',,'http://cran.us.r-project.org')" && \
    Rscript -e "install.packages('base64enc',,'http://cran.us.r-project.org')"
    

###########
#  Julia  #
###########

RUN apt-get install -y julia cmake && \
    julia --eval 'Pkg.add("IJulia")' && \
    julia --eval 'Pkg.add("Requests")' && \
    julia --eval 'Pkg.add("Gadfly")'

##########
#  Ruby  #
##########

# First install zmq3, as per Python instructions above. Then:
RUN apt-get install -y ruby2.1 ruby2.1-dev libtool && \
    gem install iruby && \
    gem install sass

##########
#  Node  #
##########

RUN apt-get install curl

# Note the new setup script name for Node.js v0.12
RUN curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash - 
RUN sudo apt-get install -y nodejs

###################
#      Setup      #
###################

RUN su -m beaker -c "HOME=/home/beaker iruby register"
