# Exemplo de comando cURL para Deploy por Empresa

> ⚠️ **ATENÇÃO / SEGURANÇA**:
> - Este arquivo é apenas um **modelo/exemplo**.
> - Ao criar o seu arquivo real `bash.md`, certifique-se de mantê-lo **exclusivamente local**.
> - **NUNCA faça commit ou envie o arquivo `bash.md` para repositórios públicos**, pois ele contém seus tokens e cookies privados de sessão.

### Como obter este comando:
1. No painel, vá em **Configurações → Empresas**.
2. Abra a empresa de teste e vá na aba **Configurações** do modal.
3. Pressione `F12` para abrir o DevTools e selecione a aba **Network (Rede)**.
4. Clique em **Salvar** no modal da empresa.
5. Na aba Network, clique com o botão direito na requisição com o ID da empresa (ex: `123`) → **Copy** → **Copy as cURL (bash)**.
6. Cole o conteúdo no seu arquivo local `bash.md`.

```bash
curl --url 'https://api.seudominio.com/companies/123' \
  -X 'PUT' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'authorization: Bearer SEU_TOKEN_AQUI' \
  -H 'content-type: application/json' \
  -b 'cf_clearance=...; jrt=...' \
  -H 'origin: https://app.seudominio.com' \
  -H 'referer: https://app.seudominio.com/' \
  --data-raw $'{"id":123,"name":"Sua Empresa","customCss":"","customJs":"","useCustomCss":false}'
```
