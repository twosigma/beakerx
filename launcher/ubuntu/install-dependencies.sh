# install beaker dependencies on ubuntu 14.04

sudo apt-get install -y python g++ make
sudo apt-get install -y python-software-properties
sudo apt-get install -y git

# java
sudo add-apt-repository --yes ppa:webupd8team/java
sudo apt-get update
sudo apt-get install -y oracle-java7-installer # javac -v = 1.7.XXX

# gradle
sudo add-apt-repository --yes ppa:cwchien/gradle
sudo apt-get update
sudo apt-get install -y gradle-1.12

# nginx
sudo add-apt-repository --yes ppa:nginx/stable
sudo apt-get update
sudo apt-get install -y nginx # nginx -v = 1.6.0

# npm
sudo add-apt-repository --yes ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install -y nodejs # nodejs -v = 0.10.28

# for R
sudo add-apt-repository --yes ppa:marutter/rrutter
sudo apt-get update
sudo apt-get install -y r-base r-base-dev libcurl4-gnutls-dev # R -v = 3.1.0
sudo Rscript -e "install.packages('Rserve',,'http://cran.us.r-project.org')"
sudo Rscript -e "install.packages('ggplot2',,'http://cran.us.r-project.org')"
sudo Rscript -e "install.packages('devtools',,'http://cran.us.r-project.org')"
sudo Rscript -e "install.packages('RJSONIO',,'http://cran.us.r-project.org')"
sudo Rscript -e "install.packages('RCurl',,'http://cran.us.r-project.org')"

# for zmq, needed by ipython and iruby
sudo add-apt-repository --yes ppa:chris-lea/zeromq
sudo apt-get update
sudo apt-get install -y libzmq3-dbg libzmq3-dev libzmq3

# ipython
sudo apt-get install -y python-pip python-dev python-yaml
sudo pip install ipython jinja2 tornado
sudo pip install pyzmq python-pandas
sudo apt-get install -y python-matplotlib python-scipy

# ruby
sudo apt-get install -y ruby1.9.1 ruby1.9.1-dev
sudo gem install iruby

# julia
sudo add-apt-repository --yes ppa:staticfloat/juliareleases
sudo add-apt-repository --yes ppa:staticfloat/julia-deps
sudo apt-get update
sudo apt-get install -y julia
julia --eval 'Pkg.add("IJulia")'
julia --eval 'Pkg.add("Gadfly")'
