#!/usr/bin/env bash

set -e
source .env_build
if [ "$ENV" != "BUILD" ]; then source .env_dev; fi;

# Make "site/" current working dir
cd site/

composer install
yarn install

yarn run $JIGSAW_ENV

# Moves build results to docs/ so it gets presented on Github Pages
mv build_$JIGSAW_ENV/* ../docs/
