#!/usr/bin/env bash

set -e
source .env_build
if [ "$ENV" != "BUILD" ]; then source .env_dev; fi;

ARCHIVE=$1
DATE=$2

if [ -z "$DATE" ]; then
  DATE=$(date +%F);
fi;

S3_BUCKET=$BUILD_S3_UPLOAD_BUCKET

URL=$S3_REST_BASE_URL/$S3_BUCKET/archive_"$DATE"_$(basename "$ARCHIVE")

curl "$URL" \
  --upload-file "$ARCHIVE" \
  --header "authorization: LOW $S3_ACCESS_KEY:$S3_SECRET_KEY"
