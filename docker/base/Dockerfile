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

FROM ubuntu:16.04

MAINTAINER Beaker Feedback <beaker-feedback@twosigma.com>

RUN useradd beakerx --create-home

ENV JAVA_VER 8
ENV JAVA_HOME /usr/lib/jvm/java-8-oracle

RUN apt-get update && apt-get dist-upgrade -y

RUN apt-get install -y sudo curl unzip software-properties-common apt-transport-https git clang bzip2

RUN add-apt-repository -y ppa:webupd8team/java

RUN apt-get update

##########
#  Java  #
##########
RUN echo debconf shared/accepted-oracle-license-v1-1 select true | debconf-set-selections
RUN apt-get install -y oracle-java8-installer


##########
#  Node  #
##########
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN apt-get install -y nodejs

##################
#     Gradle     #
##################
RUN wget https://services.gradle.org/distributions/gradle-3.5-bin.zip && \
mkdir /opt/gradle && \
unzip -d /opt/gradle gradle-3.5-bin.zip && \
rm -f gradle-3.5-bin.zip

##################
#      Yarn      #
##################
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
apt-get update && apt-get install yarn -y && \
apt-get clean

##################
#    MiniConda   #
##################
RUN echo 'export PATH=/opt/conda/bin:$PATH' > /etc/profile.d/conda.sh && \
    wget --quiet https://repo.continuum.io/miniconda/Miniconda2-4.3.21-Linux-x86_64.sh -O ~/miniconda.sh && \
    /bin/bash ~/miniconda.sh -b -p /opt/conda && \
    rm ~/miniconda.sh

ENV PATH /opt/conda/bin:$PATH
