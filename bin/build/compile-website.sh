#!/bin/bash

echo 'Building up website...';

# Generating CNAME file
echo "naofodeporra.huehue.eu" > CNAME

# Generating home-page
bash web/generate-dummy-index-html.sh

