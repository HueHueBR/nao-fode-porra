#!/bin/bash

# Generating CNAME file
echo "naofodeporra.huehue.eu" > CNAME

# Generating home-page
npm run build
