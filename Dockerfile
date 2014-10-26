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

RUN apt-get update
RUN apt-get dist-upgrade -y

RUN apt-get install -y software-properties-common python-software-properties

RUN add-apt-repository -y ppa:webupd8team/java
RUN add-apt-repository -y ppa:chris-lea/zeromq
RUN add-apt-repository -y ppa:marutter/rrutter
RUN add-apt-repository -y ppa:staticfloat/juliareleases
RUN add-apt-repository -y ppa:staticfloat/julia-deps 
RUN add-apt-repository -y ppa:chris-lea/node.js
RUN add-apt-repository -y ppa:cwchien/gradle

RUN apt-get update

RUN apt-get install -y nginx gradle-1.12 python g++ make git


##########
#  Java  #
##########

RUN echo debconf shared/accepted-oracle-license-v1-1 select true | debconf-set-selections
RUN apt-get install -y oracle-java7-installer

############
#  Python  #
############

# First install zmq3:
RUN apt-get install -y libzmq3-dbg libzmq3-dev libzmq3

# Then IPython proper:
RUN apt-get install -y python-pip python-dev python-yaml
RUN pip install ipython jinja2 tornado pyzmq pandas 

# And some useful libraries:
RUN apt-get install -y python-matplotlib python-scipy

#######
#  R  #
#######

RUN apt-get install -y r-base r-base-dev libcurl4-gnutls-dev
RUN Rscript -e "install.packages('Rserve',,'http://cran.us.r-project.org')"
RUN Rscript -e "install.packages('ggplot2',,'http://cran.us.r-project.org')"
RUN Rscript -e "install.packages('devtools',,'http://cran.us.r-project.org')"
RUN Rscript -e "install.packages('RJSONIO',,'http://cran.us.r-project.org')"
RUN Rscript -e "install.packages('RCurl',,'http://cran.us.r-project.org')"

###########
#  Julia  #
###########

RUN apt-get install -y julia
RUN julia --eval 'Pkg.add("IJulia")'
RUN julia --eval 'Pkg.add("Gadfly")'

##########
#  Ruby  #
##########

# First install zmq3, as per Python instructions above. Then:
RUN apt-get install -y ruby1.9.1 ruby1.9.1-dev
RUN gem install iruby

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

RUN useradd beaker --create-home
ADD . /home/beaker/src
ENV HOME /home/beaker

# Run these again. When they ran above, they installed in ~root but we
# need to find them in ~beaker.  Unfortunately we can't run just once
# here because in addition to those files, they also run some apt-gets
# which need to go as root.
RUN su -m beaker -c "julia --eval 'Pkg.add(\"IJulia\")'"
RUN su -m beaker -c "julia --eval 'Pkg.add(\"Gadfly\")'"

RUN chown -R beaker:beaker /home/beaker
RUN su -m beaker -c "cd /home/beaker/src  && gradle build"
EXPOSE 8800
WORKDIR /home/beaker/src
CMD su -m beaker -c "export PATH=$PATH:/usr/sbin && /home/beaker/src/core/beaker.command --public-server"
