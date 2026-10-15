# App Ingenia

Aplicativo do INGENIA 2026.

## Instagram Stories

O botão de story está oculto. O Instagram só aceita a arte enviada pelo app se houver um **Facebook App ID** da Meta em `source_application`. Sem esse ID, o story não abre.

Para liberar o story:

1. Crie um app em [developers.facebook.com](https://developers.facebook.com/). Não precisa de revisão da Meta para esse fluxo.
2. Copie o App ID para `FACEBOOK_APP_ID` em `src/config/instagram.ts`.
3. Mude `MOSTRAR_STORY` para `true` no mesmo arquivo.

A arte de exemplo sai em 1080 × 1920 px. Quando o PNG final chegar, aponte `STORY_ART` para o arquivo em `assets/images/2026/`. O miolo útil da arte é 920 × 1350 px: deixe 250 px livres no topo, 320 px na base e 80 px em cada lateral.

O botão de feed não depende desse ID. Ele copia as hashtags e abre o Instagram para a pessoa colar na legenda.
