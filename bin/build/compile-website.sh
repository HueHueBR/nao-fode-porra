#!/bin/bash

# Generating CNAME file
echo "naofodeporra.huehue.eu" > CNAME

# Generating website files
npm run prepare-deployment

