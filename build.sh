#!/bin/bash

set -e
if [ -d "build/" ]; then rm -Rf build/; fi
mkdir build/
cd build/

# Download files to be processed
mkdir -p raw-data/

wget -q http://www.camara.leg.br/cotas/Ano-2017.json.zip -O raw-data/2017.zip

# Unzip files to be processed
unzip raw-data/*.zip

# Process files
cd ../

node bin/separar-candidatos.js build/Ano-2017.json

# Clean up
rm -rf build/raw-data
rm -rf build/Ano-20{0*,1*}.json

