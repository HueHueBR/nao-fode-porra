import pandas as pd
import glob
from os import path

dir = path.realpath(path.dirname(__file__))
df = pd.DataFrame({})
files = glob.glob(path.join(dir, '../../build/raw-data/*.csv'))
for file in files:
    df = df.append(pd.read_csv(file, sep=';'))

df[['txtCNPJCPF', 'sgPartido', 'vlrLiquido']] \
    .groupby(['txtCNPJCPF', 'sgPartido']) \
    .sum() \
    .to_csv(path.join(dir, '../../build/data/receita-por-partido.csv'), sep=';')
