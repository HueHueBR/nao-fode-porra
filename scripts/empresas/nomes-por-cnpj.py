import pandas as pd
import glob
from os import path

dir = path.realpath(path.dirname(__file__))
df = pd.DataFrame({})
files = glob.glob(path.join(dir, '../../build/raw-data/*.csv'))
for file in files:
    df = df.append(pd.read_csv(file, sep=';'))

name_separator = ',,,'

companies = df[['txtCNPJCPF', 'txtFornecedor']].drop_duplicates()

# Remove os fillers em casos onde o documento é um CPF
companies['txtCNPJCPF'] = companies['txtCNPJCPF'].map(lambda x: x.replace('  -', ''))

companies.groupby('txtCNPJCPF', as_index=True) \
    .agg(lambda col: name_separator.join(col)) \
    .to_csv(path.join(dir, '../../build/data/nomes-por-cod-pessoa.csv'), sep=';')
