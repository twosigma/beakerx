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

# to build: sudo docker build -t ubuntu/beaker . # consider "build --no-cache" to sync network deps
# to run:   sudo docker run -p 8800:8800 -t ubuntu/beaker
# results hosted at: https://registry.hub.docker.com/u/scottdraves/beaker/

FROM ubuntu:14.04

MAINTAINER Beaker Feedback <beaker-feedback@twosigma.com>

RUN apt-get update && apt-get dist-upgrade -y

RUN apt-get install -y software-properties-common python-software-properties

RUN add-apt-repository -y ppa:webupd8team/java && \
    add-apt-repository -y ppa:chris-lea/zeromq && \
    add-apt-repository -y ppa:marutter/rrutter && \
    add-apt-repository -y ppa:staticfloat/juliareleases && \
    add-apt-repository -y ppa:staticfloat/julia-deps  && \
    add-apt-repository -y ppa:chris-lea/node.js && \
    add-apt-repository -y ppa:cwchien/gradle && \
    add-apt-repository -y ppa:nginx/stable

RUN apt-get update && apt-get install -y nginx gradle-1.12 python g++ make git

RUN useradd beaker --create-home

##########
#  Java  #
##########

RUN echo debconf shared/accepted-oracle-license-v1-1 select true | debconf-set-selections
RUN apt-get install -y oracle-java7-installer

############
#  Python  #
############

RUN apt-get install -y libzmq3-dbg libzmq3-dev libzmq3 \
                       python-pip python-dev python-yaml \
                       python-matplotlib python-scipy

RUN pip install ipython==2.4.1 jinja2 tornado pyzmq pandas 

#############
#  Python3  #
#############

# https://bugs.launchpad.net/ubuntu/+source/python3.4/+bug/1290847
RUN apt-get install -y python-virtualenv python3-dev pkgconf libfreetype6-dev libfreetype6 libxft-dev libblas-dev liblapack-dev gfortran libyaml-dev && \
    virtualenv /home/beaker/py3k -p python3 && \
    /home/beaker/py3k/bin/pip install ipython[notebook]==2.4.1 && \
    /home/beaker/py3k/bin/pip install numpy matplotlib scipy jinja2 tornado pyzmq pandas pyaml

#######
#  R  #
#######

RUN apt-get install -y r-base r-base-dev libcurl4-gnutls-dev && \
    Rscript -e "install.packages('Rserve',,'http://cran.us.r-project.org')" && \
    Rscript -e "install.packages('ggplot2',,'http://cran.us.r-project.org')" && \
    Rscript -e "install.packages('devtools',,'http://cran.us.r-project.org')" && \
    Rscript -e "install.packages('RJSONIO',,'http://cran.us.r-project.org')" && \
    Rscript -e "install.packages('RCurl',,'http://cran.us.r-project.org')"

###########
#  Julia  #
###########

RUN apt-get install -y julia && \
    julia --eval 'Pkg.add("IJulia")' && \
    julia --eval 'Pkg.add("Gadfly")'

##########
#  Ruby  #
##########

# First install zmq3, as per Python instructions above. Then:
RUN apt-get install -y ruby1.9.1 ruby1.9.1-dev && \
    gem install iruby

##########
#  Node  #
##########

RUN apt-get install -y nodejs

ENV NODE_PATH /usr/local/lib/node_modules
RUN npm config --global set cache /home/beaker/.npm && \
    npm config --global set registry http://registry.npmjs.org/

###################
#  Build and Run  #
###################

ADD . /home/beaker/src
ENV HOME /home/beaker

# Run these again. When they ran above, they installed in ~root but we
# need to find them in ~beaker.  Unfortunately we can't run just once
# here because in addition to those files, they also run some apt-gets
# which need to go as root.
RUN su -m beaker -c "julia --eval 'Pkg.add(\"IJulia\")'" && \
    su -m beaker -c "julia --eval 'Pkg.add(\"Gadfly\")'"

RUN mkdir -p /home/beaker/.beaker/v1/config && \
    echo '{"pref-format" : "1", "languages" : {"Python3" : {"path": "/home/beaker/py3k/bin"}}}' > /home/beaker/.beaker/v1/config/beaker.pref.json

RUN chown -R beaker:beaker /home/beaker && \
    su -m beaker -c "cd /home/beaker/src  && gradle build"
EXPOSE 8800
WORKDIR /home/beaker/src
CMD su -m beaker -c "export PATH=$PATH:/usr/sbin && /home/beaker/src/core/beaker.command --public-server"
