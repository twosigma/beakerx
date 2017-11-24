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
