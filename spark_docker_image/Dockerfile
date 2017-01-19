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

# to build: sudo docker build -t beakernotebook/beaker-spark .
# results hosted at: https://registry.hub.docker.com/u/beakernotebook/beaker/

FROM beakernotebook/beaker-base:latest

MAINTAINER Beaker Feedback <beaker-feedback@twosigma.com>

###################
#      Build      #
###################
ENV SPARK_VERSION 1.6.1
RUN apt-get install git
WORKDIR /usr
RUN git clone  --depth 1 --branch v${SPARK_VERSION} https://github.com/apache/spark.git

WORKDIR /usr/spark

RUN ./dev/change-scala-version.sh 2.11
RUN ./build/mvn -Pyarn -Phadoop-2.4 -Dscala-2.11 -DskipTests clean package

CMD su -m -c './sbin/start-master.sh && tail -f /usr/spark/logs/spark--org.apache.spark.deploy.master.Master-1-master.out'

