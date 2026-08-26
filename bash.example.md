# Exemplo de comando cURL para Deploy por Empresa

Cole aqui o comando cURL copiado do navegador (DevTools -> Network -> Selecionar requisição PUT /companies/:id -> Copy as cURL (bash)).

```bash
curl --url 'https://gestao.nextychat.com/companies/2' \
  -X 'PUT' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'authorization: Bearer SEU_TOKEN_AQUI' \
  -H 'content-type: application/json' \
  -b 'cf_clearance=...; jrt=...' \
  -H 'origin: https://painel.nextychat.com' \
  -H 'referer: https://painel.nextychat.com/' \
  --data-raw $'{"id":2,"name":"Sua Empresa","customCss":"","customJs":"","useCustomCss":false}'
```
