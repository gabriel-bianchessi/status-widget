# Status Widget

Widget Electron sempre visivel para acompanhar uso do Claude e Codex/OpenAI.

## Requisitos

- Node.js instalado para desenvolvimento.
- Credenciais do Claude no `.env`.
- Arquivo JSON com token OpenAI/Codex para o `OPENAI_JSON_PATH`.

## Configuracao

Crie um arquivo `.env` na pasta do projeto durante desenvolvimento:

```env
CARDS=claude,codex
CLAUDE_ORGANIZATION_ID=cole_aqui_o_id_da_organizacao
CLAUDE_COOKIE=cole_aqui_o_cookie_do_claude
OPENAI_JSON_PATH=C:\Users\seu_usuario\AppData\Local\opencode\auth.json
```

Para usar o `.exe`, crie o mesmo `.env` ao lado do executavel:

```text
dist-release/Status Widget-win32-x64/.env
```

## Cards

Use `CARDS` para escolher quais cards aparecem.

Mostrar Claude e Codex:

```env
CARDS=claude,codex
```

Mostrar somente Claude:

```env
CARDS=claude
```

Mostrar somente Codex:

```env
CARDS=codex
```

Se `CARDS` nao for informado ou vier invalido, o app mostra os dois cards.

## Rodar em desenvolvimento

```bash
npm install
npm run dev
```

## Gerar executavel

```bash
npm run dist
```

O executavel sera criado em:

```text
dist-release/Status Widget-win32-x64/Status Widget.exe
```

Copie ou crie o `.env` dentro da pasta `dist-release/Status Widget-win32-x64/` antes de abrir o app.

## Scripts

- `npm run build`: compila o TypeScript.
- `npm run dev`: compila e abre o Electron.
- `npm start`: abre o Electron usando os arquivos ja compilados.
- `npm run dist`: gera a pasta com o `.exe` para Windows.

## Observacoes

- A janela fica sempre visivel por cima das outras.
- A janela nao tem borda, pode ser arrastada clicando no fundo do widget e pode ser redimensionada pelas bordas.
- O texto dos cards ajusta o tamanho junto com a janela.
- Ao fechar no `x`, o app fica oculto no tray icon. Use o menu do tray para mostrar/ocultar ou sair.
- O app atualiza os cards a cada 5 segundos.
- Se uma credencial estiver ausente ou expirada, o card correspondente mostra erro.
