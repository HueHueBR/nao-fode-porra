#!/bin/bash

set -e
source .env_build
if [ "$ENV" = "BUILD" ]; then source .env_dev; fi;

for i in `seq $FIRST_YEAR $LAST_YEAR`; do
  node bin/generate-sqlite-db.js $i &
done

wait

