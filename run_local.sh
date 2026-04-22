#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-5500}"

if ! command -v python3 >/dev/null 2>&1; then
  echo "[ERRO] python3 não encontrado. Instale Python 3 para iniciar o servidor local."
  exit 1
fi

echo "Iniciando Robô do INSS em http://127.0.0.1:${PORT}/index.html"
echo "Pressione Ctrl+C para encerrar."
python3 -m http.server "${PORT}"
