#!/bin/bash

set -e
source .env_build
if [ "$ENV" = "BUILD" ]; then source .env_dev; fi;

# @todo -> separar este script para rodar apenas um ano por vez e botar todos pra rodar em paralelo
node bin/separar-candidatos.js

