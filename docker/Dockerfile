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

MAINTAINER BeakerX Feedback <beakerx-feedback@twosigma.com>

ENV PATH /opt/conda/bin:$PATH
ENV CONDA_DIR /opt/conda
ENV SHELL /bin/bash
ENV NB_UID 1000
ENV HOME /home/$NB_USER

COPY docker/setup.sh /home/beakerx
COPY docker/start.sh /usr/local/bin/
COPY docker/start-notebook.sh /usr/local/bin/
COPY docker/start-singleuser.sh /usr/local/bin/
COPY docker/jupyter_notebook_config.py /etc/jupyter/

COPY / $HOME

RUN chown -R beakerx:beakerx /home/beakerx

USER $NB_USER
WORKDIR $HOME

###################
#      Build      #
###################
RUN /home/beakerx/setup.sh

EXPOSE 8888

CMD ["start-notebook.sh"]
