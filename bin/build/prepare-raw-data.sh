#!/bin/bash

set -e
source .env_build
if [ "$ENV" != "BUILD" ]; then source .env_dev; fi;

echo 'Changing CWD to build/'
cd build/

for year in `seq $FIRST_YEAR $LAST_YEAR`;
do
  echo "Processing year $year"
  wget -q http://www.camara.leg.br/cotas/Ano-$year.json.zip -O raw-data/$year.zip
  unzip raw-data/$year.zip
done;

echo 'Changing CWD to root path'
cd ../
