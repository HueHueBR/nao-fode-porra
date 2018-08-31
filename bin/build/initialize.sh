#!/bin/bash

echo 'Starting up...';

set -e
source .env_build
if [ "$ENV" = "BUILD" ]; then source .env_dev; fi;

# Install dependencies
npm install

# Preparing paths
if [ -d "build/" ]; then rm -Rf build/; fi
mkdir -p build/raw-data

