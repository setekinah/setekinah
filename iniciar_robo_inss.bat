@echo off
setlocal

set "BASE_DIR=%~dp0"
set "INDEX_FILE=%BASE_DIR%index.html"

if not exist "%INDEX_FILE%" (
  echo [ERRO] Arquivo index.html nao encontrado em:
  echo %BASE_DIR%
  echo.
  echo Verifique se este .bat esta na mesma pasta do projeto.
  pause
  exit /b 1
)

echo Abrindo Rob^ô do INSS no navegador...
start "" "%INDEX_FILE%"

endlocal
