import pandas as pd
import glob
from os import path

dir = path.realpath(path.dirname(__file__))
df = pd.DataFrame({})
files = glob.glob(path.join(dir, '../../build/raw-data/*.csv'))
for file in files:
    df = df.append(pd.read_csv(file, sep=';'))

df[['txtCNPJCPF', 'vlrLiquido', 'numMes', 'numAno']] \
    .groupby(['txtCNPJCPF', 'numMes', 'numAno']) \
    .sum() \
    .to_csv(path.join(dir, '../../build/data/receita-por-cnpj.csv'), sep=';')
