<!--
    Copyright 2014 TWO SIGMA OPEN SOURCE, LLC

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
-->

To run beaker with spark cluster:
1. build beaker docker image as beakernotebook/beaker
2. build beaker_spark cluster docker image as beakernotebook/beaker-spark
3. run "docker-compose up" from spark_docker_image

Configure Master URL in beaker:
1. run scala plugin from language manager and in scala tab check "Use Apache Spark in this notebook"
2. click "Spark Cluster" on navigator bar and choose "configure"
3. in Master URL write destination of your spark cluster "spark://master:7077"
4. click "start" button
5. now you can execute spark tasks
