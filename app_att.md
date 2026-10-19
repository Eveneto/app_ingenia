# Ingenia 2026 — API de atualização do app

Documentação para o time do aplicativo Android.

Base de produção:

```
https://www.serdigital.com.br/ingenia/2026
```

| Recurso | URL |
|---|---|
| Verificar versão / atualização | `GET /api/app.php` |
| Registrar download + obter APK | `GET /api/app.php?acao=download` |
| Só registrar download (JSON) | `POST /api/app.php?acao=download` |
| Página pública de download | `/app/` |
| Política de privacidade | `/politica/` |

CORS liberado (`Access-Control-Allow-Origin: *`) para `GET`, `POST` e `OPTIONS`.

---

## 1. Verificar se há atualização

### Request

```http
GET /api/app.php
Accept: application/json
```

Exemplo completo:

```
https://www.serdigital.com.br/ingenia/2026/api/app.php
```

### Response (200)

```json
{
  "ok": true,
  "evento": "INGENIA 2026",
  "versao": "1.0.0",
  "versao_codigo": 1,
  "minima_versao_codigo": 1,
  "titulo_atualizacao": "Nova versão disponível",
  "mensagem_atualizacao": "Há uma atualização do aplicativo. Baixe a nova versão...",
  "obrigatoria": false,
  "ativo": true,
  "apk_disponivel": true,
  "apk_url": "https://www.serdigital.com.br/ingenia/2026/app/ingenia-2026.apk",
  "download_url": "https://www.serdigital.com.br/ingenia/2026/api/app.php?acao=download",
  "atualizado_em": "2026-10-19T15:00:00-03:00"
}
```

### Campos

| Campo | Tipo | Descrição |
|---|---|---|
| `ok` | boolean | Requisição bem-sucedida |
| `versao` | string | Versão legível (ex.: `1.0.1`) — só para exibição |
| `versao_codigo` | int | **Comparar com o `versionCode` do app** |
| `minima_versao_codigo` | int | Código mínimo aceito para continuar usando o app |
| `titulo_atualizacao` | string | Título do diálogo / banner |
| `mensagem_atualizacao` | string | Texto explicando a atualização |
| `obrigatoria` | boolean | Se `true`, trate como update forçado (mesmo que já esteja acima da mínima) |
| `ativo` | boolean | Canal de atualização ligado. Se `false`, não exiba prompt |
| `apk_disponivel` | boolean | Se o arquivo APK está publicado no servidor |
| `apk_url` | string | URL direta do APK (pode estar vazia se indisponível) |
| `download_url` | string | URL que **registra a métrica** e redireciona para o APK |
| `atualizado_em` | string\|null | ISO 8601 da última alteração de versão no painel |

---

## 2. Lógica recomendada no app

Guarde localmente o `versionCode` da build atual (ex.: `BuildConfig.VERSION_CODE` / equivalente).

Ao abrir o app (e, se quiser, periodicamente em background):

```text
1. Chamar GET /api/app.php
2. Se ok != true ou ativo == false → não mostrar nada
3. Se versao_codigo_local < minima_versao_codigo
      → atualização OBRIGATÓRIA (bloquear uso até atualizar)
4. Senão, se versao_codigo_api > versao_codigo_local
      → atualização DISPONÍVEL
      → se obrigatoria == true → tratar como obrigatória
      → senão → diálogo dispensável (“Agora” / “Depois”)
5. Exibir titulo_atualizacao + mensagem_atualizacao
6. Botão “Atualizar” → abrir download_url (preferencial)
   ou apk_url (se já registrou o download via POST)
```

### Pseudocódigo

```kotlin
val remoto = api.getAppInfo()
if (!remoto.ok || !remoto.ativo) return

val local = BuildConfig.VERSION_CODE
val precisaAtualizar = remoto.versao_codigo > local
val forcar = local < remoto.minima_versao_codigo || remoto.obrigatoria

if (local < remoto.minima_versao_codigo || precisaAtualizar) {
    mostrarDialogo(
        titulo = remoto.titulo_atualizacao,
        mensagem = remoto.mensagem_atualizacao,
        obrigatorio = forcar,
        urlDownload = remoto.download_url
    )
}
```

### Quando publicar uma nova build

1. Subir o novo `app/ingenia-2026.apk` no servidor  
2. No painel admin (**App**), incrementar `versao_codigo` (ex.: `1` → `2`) e ajustar `versao` (`1.0.0` → `1.0.1`)  
3. Atualizar título/mensagem se necessário  
4. Se a mudança for estrutural e crítica, marque **obrigatória** e/ou suba `minima_versao_codigo`

O app instalado passa a detectar a novidade no próximo `GET /api/app.php`.

---

## 3. Downloads e métricas

O painel admin conta **cliques no download**. Use sempre `download_url` quando o usuário for baixar o APK, para a métrica subir.

### Opção A — Abre no navegador / Intent (recomendado no botão “Atualizar”)

```http
GET /api/app.php?acao=download
```

- Registra +1 download  
- Responde `302` para o APK  
- Ideal para `Intent.ACTION_VIEW` / Custom Tabs / browser

### Opção B — O app baixa o arquivo sozinho

```http
POST /api/app.php?acao=download
Content-Type: application/json

{"acao":"download"}
```

Resposta:

```json
{
  "ok": true,
  "registrado": true,
  "downloads_total": 42,
  "apk_url": "https://www.serdigital.com.br/ingenia/2026/app/ingenia-2026.apk",
  "apk_disponivel": true
}
```

Depois faça o download HTTP do `apk_url`.

> **Importante:** não use só `apk_url` no botão de atualizar se quiser métrica correta. Ou use `download_url` (GET), ou registre com POST e só então baixe o `apk_url`.

---

## 4. Página web de download

URL mobile:

```
https://www.serdigital.com.br/ingenia/2026/app/
```

O botão **Baixar APK** já chama `api/app.php?acao=download` (conta no painel).

---

## 5. Tratamento de erros

| Situação | Comportamento sugerido |
|---|---|
| Sem rede / timeout | Silencioso; tentar de novo depois. Não bloquear o app. |
| `ativo: false` | Não exibir prompt de update |
| `apk_disponivel: false` | Mostrar mensagem, mas não iniciar download |
| HTTP 4xx/5xx | Ignorar nesta sessão; retry depois |

---

## 6. Exemplo rápido (cURL)

```bash
# Ver versão atual
curl -s "https://www.serdigital.com.br/ingenia/2026/api/app.php"

# Registrar download (JSON)
curl -s -X POST "https://www.serdigital.com.br/ingenia/2026/api/app.php?acao=download" \
  -H "Content-Type: application/json" \
  -d "{\"acao\":\"download\"}"
```

---

## 7. Resumo para implementação

1. No startup: `GET /api/app.php`  
2. Comparar `versao_codigo` e `minima_versao_codigo`  
3. Mostrar `titulo_atualizacao` + `mensagem_atualizacao`  
4. Atualizar via `download_url`  
5. Não hardcode version checks no app além do `versionCode` local — a decisão vem da API  

Painel para o time web/conteúdo: `api/admin/app.php` (login do admin).
