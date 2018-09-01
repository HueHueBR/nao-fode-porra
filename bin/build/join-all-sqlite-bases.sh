#!/bin/bash

set -e
source .env_build

if [ "$ENV" != "BUILD" ]; then source .env_dev; fi;

SQL="CREATE TABLE 'expenses' (\
  'codLegislatura' varchar(255),\
  'datEmissao' varchar(255),\
  'ideDocumento' varchar(255),\
  'idecadastro' varchar(255),\
  'indTipoDocumento' varchar(255),\
  'nuCarteiraParlamentar' varchar(255),\
  'nuDeputadoId' varchar(255),\
  'nuLegislatura' varchar(255),\
  'numAno' varchar(255),\
  'numEspecificacaoSubCota' varchar(255),\
  'numLote' varchar(255),\
  'numMes' varchar(255),\
  'numParcela' varchar(255),\
  'numRessarcimento' varchar(255),\
  'numSubCota' varchar(255),\
  'sgPartido' varchar(255),\
  'sgUF' varchar(255),\
  'txNomeParlamentar' varchar(255),\
  'txtCNPJCPF' varchar(255),\
  'txtDescricao' varchar(255),\
  'txtDescricaoEspecificacao' varchar(255),\
  'txtFornecedor' varchar(255),\
  'txtNumero' varchar(255),\
  'txtPassageiro' varchar(255),\
  'txtTrecho' varchar(255),\
  'vlrDocumento' varchar(255),\
  'vlrGlosa' varchar(255),\
  'vlrLiquido' varchar(255),\
  'vlrRestituicao' varchar(255)\
);"

sqlite3 ./build/raw.sqlite3 "$SQL"

SQL=''
for i in `seq $FIRST_YEAR $LAST_YEAR`; do
  SQL="$SQL attach './build/$i.sqlite3' as data_$i;"
done

SELECT=''
for i in `seq $FIRST_YEAR $LAST_YEAR`; do
  if [ "$i" -ne "$FIRST_YEAR" ]; then
    SELECT="$SELECT UNION "
  fi
  SELECT="$SELECT select * from data_$i.expenses "
done

SQL="$SQL INSERT INTO expenses $SELECT"

sqlite3 ./build/raw.sqlite3 "$SQL"

