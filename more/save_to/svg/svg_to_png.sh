#!/usr/bin/env bash
############################### BY GIBBONJOYEUX ################################

################################################################################
### FUNCTIONS
################################################################################

################################################################################
### MAIN
################################################################################

SRC=${1}
WIDTH=${2}
HEIGHT=${3}
OUTPUT=${4}

### FILE MODE
if [[ -f ${SRC} ]]; then
	inkscape -z -w ${WIDTH} -h ${HEIGHT} ${SRC} -e ${OUTPUT}
elif [[ -d ${SRC} ]]; then
	if [[ ! -d ${OUTPUT} ]]; then
		mkdir ${OUTPUT}
	fi
	for file in ${SRC}/*; do
		name="${file##*/}"
		name="${name%.*}"
		inkscape -z -w ${WIDTH} -h ${HEIGHT} "${file}" -e "${OUTPUT}/${name}.png"
	done
fi
