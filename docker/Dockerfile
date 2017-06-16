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

FROM beakerx-base:latest

MAINTAINER Beaker Feedback <beaker-feedback@twosigma.com>

ENV PATH /opt/conda/bin:/opt/gradle/gradle-3.5/bin:$PATH
ENV JAVA_HOME /usr/lib/jvm/java-8-oracle
ENV CONDA_DIR /opt/conda
ENV SHELL /bin/bash
ENV NB_USER beakerx
ENV NB_UID 1000
ENV HOME /home/$NB_USER
ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

COPY setup.sh /home/beakerx
RUN chmod +x /home/beakerx/setup.sh

COPY start.sh /usr/local/bin/
COPY start-notebook.sh /usr/local/bin/
COPY start-singleuser.sh /usr/local/bin/
COPY jupyter_notebook_config.py /etc/jupyter/
RUN chmod +x /usr/local/bin/*

WORKDIR /home/beakerx

RUN chown -R beakerx:users /home/beakerx

###################
#      Build      #
###################
RUN git clone https://github.com/twosigma/beakerx.git
RUN chown -R beakerx:users /home/beakerx

WORKDIR /home/beakerx/beakerx

USER $NB_USER

RUN /home/beakerx/setup.sh

EXPOSE 8888

CMD ["start-notebook.sh"]
