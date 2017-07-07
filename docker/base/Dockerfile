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

MAINTAINER BeakerX Feedback <beakerx-feedback@twosigma.com>

RUN useradd beakerx --create-home

ENV NB_USER beakerx
ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

RUN apt-get update && apt-get dist-upgrade -y
RUN apt-get install -y sudo curl unzip software-properties-common apt-transport-https git bzip2 wget locales
RUN add-apt-repository ppa:cwchien/gradle
RUN apt-get update
RUN locale-gen en_US.UTF-8

##########
#  Node  #
##########
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN apt-get install -y nodejs

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
    wget --quiet https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda.sh && \
    /bin/bash ~/miniconda.sh -b -p /opt/conda && \
    rm ~/miniconda.sh

##########
#  Java  #
##########
RUN conda install -y -c conda-forge openjdk

############
#  Gradle  #
############
RUN apt-get install -y gradle
