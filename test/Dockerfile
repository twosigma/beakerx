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

# to build: sudo docker build -f ./test/Dockerfile -t beaker/tests .
# to run:   sudo docker run beaker/tests

FROM beakernotebook/beaker-base:latest

MAINTAINER Beaker Feedback <beaker-feedback@twosigma.com>

###################
#      Build      #
###################

RUN wget https://launchpad.net/~ubuntu-security-proposed/+archive/ubuntu/ppa/+build/7767831/+files/firefox_39.0.3+build2-0ubuntu0.14.04.1_amd64.deb && sudo dpkg -i --force-depends firefox_39.0.3+build2-0ubuntu0.14.04.1_amd64.deb && apt-get install -fy
RUN apt-get install -y xvfb
RUN cd /home/beaker
RUN curl -Lo chrome.zip https://download-chromium.appspot.com/dl/Linux_x64 && unzip chrome.zip
RUN curl -Lo chromedriver.zip http://chromedriver.storage.googleapis.com/2.16/chromedriver_linux64.zip && unzip chromedriver.zip

ADD . /home/beaker/src

ENV HOME /home/beaker

RUN chown -R beaker:beaker /home/beaker

RUN su -m beaker -c "cd /home/beaker/src"

###################
#       Run       #
###################

EXPOSE 8800
WORKDIR /home/beaker/src
CMD su -m beaker -c "./test/run_in_docker"
