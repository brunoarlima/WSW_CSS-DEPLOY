#!/usr/bin/env node

/**
 * Script de Deploy do NextyChat / WSW Redesign
 *
 * Modos de Uso:
 *   1. Deploy por Empresa (Padrão e Recomendado):
 *      Lê o comando cURL salvo em `bash.md`, injeta o CSS/JS na empresa e atualiza apenas ela.
 *      Ex: npm run deploy  ou  node deploy.js
 *
 *   2. Deploy Global (Todas as instâncias/empresas):
 *      Atualiza as configurações globais /settings/customCssFrontend e customJsFrontend.
 *      Ex: npm run deploy:global  ou  node deploy.js --global
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { buildCSS, buildJS } = require('./build.js');

const BASH_MD_PATH = path.join(__dirname, 'bash.md');
const CSS_PATH = path.join(__dirname, 'nextychat-redesign.css');
const JS_PATH = path.join(__dirname, 'nextychat-redesign.js');

// Configurações para Deploy Global (Legado / Fallback via variáveis de ambiente)
const GLOBAL_CONFIG = {
  baseUrl: process.env.NEXTY_BASE_URL || 'https://gestao.nextychat.com',
  bearerToken: process.env.NEXTY_TOKEN || '',
  cookie: process.env.NEXTY_COOKIE || ''
};

/**
 * Tokenizador de argumentos bash / shell
 * Suporta aspas simples, aspas duplas e ANSI-C quoting ($'...')
 */
function parseBashArgs(cmd) {
  const args = [];
  let current = '';
  let inSingle = false;
  let inDouble = false;
  let inDollarSingle = false;
  let escaped = false;

  for (let i = 0; i < cmd.length; i++) {
    const char = cmd[i];
    const nextChar = cmd[i + 1];

    if (escaped) {
      if (inDollarSingle) {
        if (char === 'n') current += '\n';
        else if (char === 'r') current += '\r';
        else if (char === 't') current += '\t';
        else if (char === '\'') current += '\'';
        else if (char === '\\') current += '\\';
        else if (char === '"') current += '"';
        else current += char;
      } else if (inDouble) {
        if (char === '$' || char === '`' || char === '"' || char === '\\') {
          current += char;
        } else {
          current += '\\' + char;
        }
      } else if (!inSingle) {
        if (char !== '\n') {
          current += char;
        }
      } else {
        current += '\\' + char;
      }
      escaped = false;
      continue;
    }

    if (char === '\\') {
      escaped = true;
      continue;
    }

    if (inSingle) {
      if (char === "'") inSingle = false;
      else current += char;
      continue;
    }

    if (inDollarSingle) {
      if (char === "'") inDollarSingle = false;
      else current += char;
      continue;
    }

    if (inDouble) {
      if (char === '"') inDouble = false;
      else current += char;
      continue;
    }

    if (char === '$' && nextChar === "'") {
      inDollarSingle = true;
      i++;
      continue;
    }

    if (char === "'") {
      inSingle = true;
      continue;
    }

    if (char === '"') {
      inDouble = true;
      continue;
    }

    if (/\s/.test(char)) {
      if (current.length > 0) {
        args.push(current);
        current = '';
      }
      continue;
    }

    current += char;
  }

  if (current.length > 0) {
    args.push(current);
  }

  return args;
}

/**
 * Parser de comando cURL extraído do bash.md
 */
function parseCurlCommand(rawBashText) {
  const args = parseBashArgs(rawBashText);
  let url = '';
  let method = 'PUT';
  const headers = {};
  let dataRaw = null;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === 'curl') continue;

    if (arg === '--url') {
      url = args[++i];
    } else if (arg === '-X' || arg === '--request') {
      method = (args[++i] || 'PUT').toUpperCase();
    } else if (arg === '-H' || arg === '--header') {
      const headerStr = args[++i] || '';
      const colonIdx = headerStr.indexOf(':');
      if (colonIdx > -1) {
        const k = headerStr.slice(0, colonIdx).trim().toLowerCase();
        const v = headerStr.slice(colonIdx + 1).trim();
        headers[k] = v;
      }
    } else if (arg === '-b' || arg === '--cookie') {
      const cookieVal = args[++i] || '';
      headers['cookie'] = headers['cookie'] ? `${headers['cookie']}; ${cookieVal}` : cookieVal;
    } else if (arg === '--data' || arg === '--data-raw' || arg === '--data-binary' || arg === '-d') {
      dataRaw = args[++i];
    } else if (!url && (arg.startsWith('http://') || arg.startsWith('https://'))) {
      url = arg;
    }
  }

  if (!url) {
    throw new Error('Não foi possível identificar a URL no comando cURL do bash.md.');
  }

  if (!dataRaw) {
    throw new Error('Não foi possível identificar o payload JSON (--data / --data-raw) no bash.md.');
  }

  let jsonData;
  try {
    jsonData = JSON.parse(dataRaw);
  } catch (err) {
    throw new Error(`Erro ao interpretar o JSON do payload no bash.md: ${err.message}`);
  }

  return { url, method, headers, jsonData };
}

/**
 * Executa requisição HTTP/HTTPS genérica
 */
function makeHttpRequest(targetUrl, method, headers, payload) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(targetUrl);
    const isHttps = parsedUrl.protocol === 'https:';
    const client = isHttps ? https : http;

    const requestHeaders = { ...headers };
    requestHeaders['content-length'] = Buffer.byteLength(payload);

    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (isHttps ? 443 : 80),
      path: parsedUrl.pathname + parsedUrl.search,
      method: method,
      headers: requestHeaders
    };

    const req = client.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => responseBody += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ statusCode: res.statusCode, body: responseBody });
        } else {
          reject(new Error(`HTTP ${res.statusCode} (${res.statusMessage}): ${responseBody}`));
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.write(payload);
    req.end();
  });
}

/**
 * Deploy Isolado por Empresa (baseado no bash.md)
 */
async function deployCompany() {
  if (!fs.existsSync(BASH_MD_PATH)) {
    console.error(`❌ Arquivo '${BASH_MD_PATH}' não encontrado!`);
    console.log(`💡 Crie o arquivo 'bash.md' colando o comando cURL copiado do painel (veja o modelo em bash.example.md).`);
    process.exit(1);
  }

  const rawBash = fs.readFileSync(BASH_MD_PATH, 'utf8').trim();
  if (!rawBash) {
    console.error(`❌ Arquivo '${BASH_MD_PATH}' está vazio! Cole o comando cURL nele.`);
    process.exit(1);
  }

  console.log('🔍 Analisando chamada cURL em bash.md...');
  const { url, method, headers, jsonData } = parseCurlCommand(rawBash);

  const companyId = jsonData.id || 'Desconhecido';
  const companyName = jsonData.name || jsonData.namecomplete || 'Empresa';

  console.log(`🎯 Alvo do Deploy:`);
  console.log(`   - Empresa ID: ${companyId}`);
  console.log(`   - Nome:       ${companyName}`);
  console.log(`   - Endpoint:   ${method} ${url}\n`);

  // Lê os arquivos compilados
  const cssContent = fs.existsSync(CSS_PATH) ? fs.readFileSync(CSS_PATH, 'utf8') : '';
  const jsContent = fs.existsSync(JS_PATH) ? fs.readFileSync(JS_PATH, 'utf8') : '';

  if (!cssContent) {
    console.warn(`⚠️ Aviso: ${CSS_PATH} está vazio ou não foi encontrado.`);
  }
  if (!jsContent) {
    console.warn(`⚠️ Aviso: ${JS_PATH} está vazio ou não foi encontrado.`);
  }

  // Atualiza estritamente os campos necessários
  jsonData.customCss = cssContent;
  jsonData.customJs = jsContent;
  jsonData.useCustomCss = true;

  const payload = JSON.stringify(jsonData);

  process.stdout.write(`📦 Enviando atualização isolada para ${companyName} (ID: ${companyId})... `);
  const result = await makeHttpRequest(url, method, headers, payload);
  console.log(`✅ SUCESSO! (HTTP ${result.statusCode})`);
  console.log(`\n✨ Redesign atualizado com sucesso exclusivamente na empresa ${companyName}!`);
}

/**
 * Deploy Global (legado / todas as instâncias)
 */
async function deployGlobal() {
  console.log('🌐 Modo Deploy Global selecionado (/settings/*)...\n');

  function sendGlobalUpdate(endpoint, key, content) {
    const url = new URL(`${GLOBAL_CONFIG.baseUrl}/settings/${endpoint}`);
    const payload = JSON.stringify({ key, value: content });
    const headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GLOBAL_CONFIG.bearerToken}`,
      'Origin': 'https://painel.nextychat.com',
      'Referer': 'https://painel.nextychat.com/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
    };
    if (GLOBAL_CONFIG.cookie) {
      headers['Cookie'] = GLOBAL_CONFIG.cookie;
    }
    return makeHttpRequest(url.toString(), 'PUT', headers, payload);
  }

  if (fs.existsSync(CSS_PATH)) {
    const cssContent = fs.readFileSync(CSS_PATH, 'utf8');
    process.stdout.write('📦 Enviando CSS Global (nextychat-redesign.css)... ');
    await sendGlobalUpdate('customCssFrontend', 'customCssFrontend', cssContent);
    console.log('✅ SUCESSO!');
  }

  if (fs.existsSync(JS_PATH)) {
    const jsContent = fs.readFileSync(JS_PATH, 'utf8');
    process.stdout.write('📦 Enviando JS Global (nextychat-redesign.js)... ');
    await sendGlobalUpdate('customJsFrontend', 'customJsFrontend', jsContent);
    console.log('✅ SUCESSO!');
  }

  console.log('\n🎉 Deploy Global concluído com sucesso!');
}

async function main() {
  const isGlobal = process.argv.includes('--global') || process.argv.includes('-g');

  console.log('🚀 Iniciando pipeline de Deploy do NextyChat Redesign...\n');

  // 1. Compila os módulos
  console.log('🔨 Compilando CSS e JS...');
  buildCSS();
  buildJS();
  console.log('');

  try {
    if (isGlobal) {
      await deployGlobal();
    } else {
      await deployCompany();
    }
  } catch (error) {
    console.error('\n❌ Erro durante o deploy:', error.message);
    if (error.message.includes('401') || error.message.includes('403')) {
      console.log('\n💡 Dica: A autenticação expirou. Copie novamente o comando cURL do painel para o arquivo bash.md.');
    }
    process.exit(1);
  }
}

main();
