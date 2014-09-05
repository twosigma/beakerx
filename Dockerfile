# sudo docker build -t ubuntu/beaker .
# sudo docker run -p 8800:8800 -t ubuntu/beaker
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
RUN apt-get install -y python-pip
RUN apt-get install -y python-dev
RUN pip install ipython jinja2 tornado
RUN pip install pyzmq

# And some useful libraries:
RUN apt-get install -y python-matplotlib python-scipy python-pandas


#######
#  R  #
#######


RUN apt-get install -y r-base r-base-dev
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
RUN chown -R beaker:beaker /home/beaker
ENV HOME /home/beaker
RUN su -m beaker -c "cd /home/beaker/src  && gradle build"
EXPOSE 8800
WORKDIR /home/beaker/src
CMD su -m beaker -c "export PATH=$PATH:/usr/sbin && /home/beaker/src/core/beaker.command --public-server"
