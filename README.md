# Robô do INSS

MVP web para triagem inteligente de leads previdenciários.

## O que esta versão faz

- Cadastro rápido do lead
- Seleção de fluxo de atendimento
- Perguntas sequenciais com navegação automática
- Resultado final com status:
  - Qualificado
  - Em revisão
  - Desqualificado
- Histórico da sessão de atendimento

## Fluxos incluídos

- Auxílio-Acidente
- Aposentadoria
- BPC/LOAS

## Estrutura

- `index.html`: interface principal
- `styles.css`: visual do sistema
- `flows.js`: regras e fluxos de decisão
- `app.js`: estado da aplicação e navegação

## Como usar

1. Abra o arquivo `index.html` no navegador.
2. Preencha os dados básicos do lead.
3. Escolha o fluxo.
4. Clique em `Iniciar fluxo`.
5. Responda às perguntas para obter o encaminhamento.


## Rodar local no Codex (Linux/macOS)

1. No terminal, entre na pasta do projeto.
2. Execute:

```bash
./run_local.sh
```

3. Abra no navegador: `http://127.0.0.1:5500/index.html`.

Opcional: para outra porta, use por exemplo `./run_local.sh 8080`.

## Execução rápida no Windows

1. Garanta que `index.html`, `styles.css`, `flows.js`, `app.js` e `iniciar_robo_inss.bat` estejam na mesma pasta.
2. Dê duplo clique em `iniciar_robo_inss.bat`.
3. O navegador será aberto automaticamente no MVP.

## Próximas evoluções sugeridas

- Persistência em banco de dados
- Login de atendentes
- Painel administrativo para editar fluxos sem mexer em código
- Integração com WhatsApp, CRM ou planilhas
- Exportação do atendimento em PDF
- Logs e métricas de conversão por fluxo

## Observação

Os fluxos implementados nesta versão representam uma tradução inicial para MVP e não substituem validação jurídica. Antes de usar em operação real, revise as regras de qualificação com o time jurídico.
