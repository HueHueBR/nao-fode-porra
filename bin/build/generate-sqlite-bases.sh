#!/bin/bash

set -e
source .env_build
if [ "$ENV" = "BUILD" ]; then source .env_dev; fi;

# @todo -> separar este script para rodar apenas um ano por vez e botar todos pra rodar em paralelo
TASKS_COMMAND=''
for i in `seq $FIRST_YEAR $LAST_YEAR`; do
  COMMAND="node bin/generate-sqlite-db.js $i"
  
  if [ "$i" = "$FIRST_YEAR" ]; then
    TASKS_COMMAND="$COMMAND"
  elif [ "$i" = "$LAST_YEAR" ]; then
    TASKS_COMMAND="$TASKS_COMMAND & $COMMAND & wait"
  else
    TASKS_COMMAND=" $TASKS_COMMAND & $COMMAND"
  fi
done

echo $($TASKS_COMMAND)

