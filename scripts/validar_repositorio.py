#!/usr/bin/env python3
"""Validação estrutural simples do repositório acadêmico.

Este script não atribui nota e não verifica qualidade conceitual. Ele apenas ajuda o
grupo a identificar arquivos obrigatórios ausentes e campos de preenchimento ainda
presentes antes da entrega final.
"""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

REQUIRED = [
    'README.md',
    'GUIA_RAPIDO.md',
    'CONTRIBUTING.md',
    'CHECKLIST_ENTREGA_FINAL.md',
    'docs/visao-geral.md',
    'docs/backlog-produto.md',
    'docs/rastreabilidade.md',
    'docs/uso-de-ia.md',
    'docs/requisitos/requisitos.md',
    'docs/modelagem/modelagem.md',
    'docs/projeto/decisoes-de-projeto.md',
    'docs/padroes/padroes-de-projeto.md',
    'docs/arquitetura/arquitetura.md',
    'docs/testes/plano-de-testes.md',
    'docs/testes/evidencias-testes.md',
    'docs/entrega-final.md',
    'src/README.md',
    'tests/README.md',
] + [f'docs/sprints/sprint-{n:02d}.md' for n in range(1, 9)]

missing = [p for p in REQUIRED if not (ROOT / p).exists()]
placeholders = []
for rel in REQUIRED:
    path = ROOT / rel
    if path.exists() and path.suffix.lower() == '.md':
        text = path.read_text(encoding='utf-8', errors='replace')
        count = text.count('[PREENCHER]') + text.count('[COLAR LINK]')
        if count:
            placeholders.append((rel, count))

print('Validação estrutural do Trabalho Final')
print('=' * 42)

if missing:
    print('\nArquivos obrigatórios ausentes:')
    for rel in missing:
        print(f'  - {rel}')
else:
    print('\nOK: todos os arquivos estruturais obrigatórios existem.')

if placeholders:
    print('\nCampos que ainda parecem não preenchidos:')
    for rel, count in placeholders:
        print(f'  - {rel}: {count} ocorrência(s)')
else:
    print('\nOK: não foram encontrados marcadores principais de preenchimento.')

print('\nLembretes que exigem conferência manual:')
print('  - links do GitHub Project, Issues, PRs, commits, tags e vídeo')
print('  - compatibilidade entre documentação e código')
print('  - execução da aplicação e dos testes')
print('  - ausência de segredos e dados pessoais')

if missing:
    sys.exit(1)
