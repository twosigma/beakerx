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

. install-runtime-core-dependencies.sh

# install beaker dependencies on ubuntu 14.04
sudo apt-get install -y python g++ make
sudo apt-get install -y python-software-properties
sudo apt-get install -y git


# gradle
sudo add-apt-repository --yes ppa:cwchien/gradle
sudo apt-get update
sudo apt-get install -y gradle-2.4

# npm
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs

# for cpp
sudo apt-get install -y clang

# for R
sudo add-apt-repository --yes ppa:marutter/rrutter
sudo apt-get update
sudo apt-get install -y r-base r-base-dev libxml2-dev libssl-dev libcurl4-gnutls-dev # R -v = 3.1.0
sudo Rscript -e "install.packages('Rserve',,'http://cran.us.r-project.org')"
sudo Rscript -e "install.packages('ggplot2',,'http://cran.us.r-project.org')"
sudo Rscript -e "install.packages('devtools',,'http://cran.us.r-project.org')"
sudo Rscript -e "install.packages('RJSONIO',,'http://cran.us.r-project.org')"
sudo Rscript -e "install.packages('RCurl',,'http://cran.us.r-project.org')"
sudo Rscript -e "install.packages('jpeg',,'http://cran.us.r-project.org')"
sudo Rscript -e "install.packages('png',,'http://cran.us.r-project.org')"
sudo Rscript -e "install.packages('base64enc',,'http://cran.us.r-project.org')"
sudo Rscript -e "install.packages('roxygen2',,'http://cran.us.r-project.org')"

# for zmq, needed by ipython and iruby
sudo add-apt-repository --yes ppa:chris-lea/zeromq
sudo apt-get update
sudo apt-get install -y libzmq3-dbg libzmq3-dev libzmq3

# ipython
sudo apt-get install -y python-pip python-dev python-yaml
sudo pip install ipython jinja2 tornado pyzmq pandas pandas-datareader jsonschema jupyter
sudo apt-get install -y python-matplotlib python-scipy

# python3

sudo apt-get install -y python-virtualenv python3-dev pkgconf libfreetype6-dev libfreetype6 libxft-dev libblas-dev liblapack-dev gfortran libyaml-dev
virtualenv ~/py3k -p python3
~/py3k/bin/pip install ipython[notebook] jupyter
~/py3k/bin/pip install numpy matplotlib scipy jinja2 tornado pyzmq pandas pandas-datareader pyaml
sudo ~/py3k/bin/ipython kernel install

# ruby
sudo add-apt-repository -y ppa:brightbox/ruby-ng
sudo apt-get update
sudo apt-get install -y ruby2.1 ruby2.1-dev libtool
sudo gem install iruby
sudo gem install sass
iruby register

# julia
sudo add-apt-repository --yes ppa:staticfloat/juliareleases
sudo add-apt-repository --yes ppa:staticfloat/julia-deps
sudo apt-get update
sudo apt-get install -y julia cmake
julia --eval 'Pkg.add("IJulia")'
julia --eval 'Pkg.add("Requests")'
julia --eval 'Pkg.add("Gadfly")'
# workaround bug in julia
julia --eval 'Pkg.rm("IJulia")'
julia --eval 'Pkg.add("IJulia")'
