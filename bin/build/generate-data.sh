#!/bin/bash

set -e
source .env_build
if [ "$ENV" != "BUILD" ]; then source .env_dev; fi;

mkdir data/

# Home-page
npm run generate-home-data
