
NODE := $(shell ${TOOLS}/bin/makepath -H node ${TOP})

all: 

clean: realclean

realclean:
	rm -rf components built

%: ;
