#!/bin/bash

set -e
source .env_build
if [ "$ENV" != "BUILD" ]; then source .env_dev; fi;

ATTACH="attach './build/raw.sqlite3' as raw;"

CREATE_TABLE="CREATE TABLE deputies(\
  'id' INTEGER PRIMARY KEY,\
  'wallet' INTEGER,\
  'name' VARCHAR(30),\
  'uf' VARCHAR(2)\
);";

SELECT="select distinct\
  nuDeputadoId as id, nuCarteiraParlamentar as wallet, txNomeParlamentar as name, sgUF as uf\
  from raw.expenses\
  order by nuDeputadoId asc;"

INSERT="INSERT INTO deputies $SELECT;"

sqlite3 ./build/derived.sqlite3 "$ATTACH $CREATE_TABLE $INSERT"

