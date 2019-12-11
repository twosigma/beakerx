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

ARG VCS_REF
ARG VERSION

LABEL org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.name="BeakerX" \
      org.label-schema.description="BeakerX is a collection of kernels and extensions to the Jupyter interactive computing environment. It provides JVM support, interactive plots, tables, forms, publishing, and more." \
      org.label-schema.url="http://beakerx.com/" \
      org.label-schema.vcs-ref=$VCS_REF \
      org.label-schema.vcs-url="https://github.com/twosigma/beakerx" \
      org.label-schema.version=$VERSION \
      org.label-schema.schema-version="1.0"

MAINTAINER BeakerX Feedback <beakerx-feedback@twosigma.com>


###################
#      Setup      #
###################

RUN useradd beakerx --create-home

ENV CONDA_DIR /opt/conda
ENV PATH /opt/conda/bin:$PATH
ENV NB_USER beakerx
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get install -y --no-install-recommends apt-utils sudo curl unzip software-properties-common apt-transport-https git bzip2 wget locales
RUN apt-get dist-upgrade -y
RUN locale-gen en_US.UTF-8

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
	echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
	apt-get update && apt-get install yarn -y

# Install Conda
RUN echo 'export PATH=/opt/conda/bin:$PATH' > /etc/profile.d/conda.sh && \
    wget --quiet https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda.sh && \
    /bin/bash ~/miniconda.sh -b -p /opt/conda && \
    rm ~/miniconda.sh

RUN apt-get clean

COPY configuration.yml /home/beakerx/
RUN conda env create -n beakerx -f /home/beakerx/configuration.yml
RUN conda install -y -n beakerx -c conda-forge jupyterhub jupyterlab pyzmq pytest

ENV LANG=en_US.UTF-8
ENV LC_CTYPE=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8
ENV REMOVE_DASH_LINECOMMENT="true"
ENV SHELL /bin/bash
ENV NB_UID 1000
ENV HOME /home/$NB_USER

COPY beakerx jitpack.yml js kernel test /home/beakerx/
COPY docker/setup.sh / $HOME/
COPY docker/start.sh docker/start-notebook.sh docker/start-singleuser.sh /usr/local/bin/
COPY docker/jupyter_notebook_config.py /etc/jupyter/

WORKDIR $HOME

###################
#      Build      #
###################
RUN chown -R beakerx:beakerx /home/beakerx /opt/conda/envs/beakerx  && \
    /home/beakerx/setup.sh

# Add documentation
COPY NOTICE README.md StartHere.ipynb doc /home/beakerx/

USER $NB_USER

EXPOSE 8888

CMD ["start-notebook.sh"]
