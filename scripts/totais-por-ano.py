import pandas as pd
import glob
import os.path as path

# DataFrame vazio para iniciar
df = pd.DataFrame({'numAno': [], 'vlrLiquido': []})

# Lê todos os arquivos csv baixados
files = glob.glob('build/raw-data/*.csv')
for file in files:
    df = df.append(pd.read_csv(file, sep=';')[['numAno', 'vlrLiquido']])

# Agrega total e soma os valores anuais
groupedYearlyValues = df.groupby(['numAno']).sum()

# Remove decimais de numAno
groupedYearlyValues.index = groupedYearlyValues.index.astype('int64')

# Remove decimais de vlrLiquido
groupedYearlyValues = groupedYearlyValues.astype('int64')

# Gravando saída
groupedYearlyValues.to_csv('build/data/total-por-ano.csv', sep=';')
