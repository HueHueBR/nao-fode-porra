#!/bin/bash

set -e

# Generates CNAME file
echo "naofodeporra.huehue.eu" > CNAME

# Install dependencies
npm install

if [ -d "build/" ]; then rm -Rf build/; fi
mkdir build/
cd build/

# Download files to be processed
mkdir -p raw-data/

FIRST_YEAR=2009
LAST_YEAR=2018
# ----> Parallel running syntax cmd1 & cmd2 & cmd..n & wait
for i in `seq $FIRST_YEAR $LAST_YEAR`;
do
    echo "Getting $i..."
    wget -q http://www.camara.leg.br/cotas/Ano-$i.json.zip -O raw-data/$i.zip
    unzip raw-data/$i.zip
done

# Process files
cd ../

node bin/separar-candidatos.js

# Clean up
rm -rf build/raw-data
rm -rf build/Ano-20{0*,1*}.json

