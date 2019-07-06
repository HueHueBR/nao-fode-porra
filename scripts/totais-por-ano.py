import pandas as pd
import glob
from os import path

dir = path.realpath(path.dirname(__file__))

# DataFrame vazio para iniciar
df = pd.DataFrame({'numAno': [], 'vlrLiquido': []})

# Lê todos os arquivos csv baixados
files = glob.glob(path.join(dir, '../build/raw-data/*.csv'))
for file in files:
    df = df.append(pd.read_csv(file, sep=';')[['numAno', 'vlrLiquido']])

# Agrega total e soma os valores anuais
groupedYearlyValues = df.groupby(['numAno']).sum()

# Remove decimais de numAno
groupedYearlyValues.index = groupedYearlyValues.index.astype('int64')

# Remove decimais de vlrLiquido
groupedYearlyValues = groupedYearlyValues.astype('int64')

# Gravando saída
groupedYearlyValues.to_csv(path.join(dir, '../build/data/total-por-ano.csv'), sep=';')
