#!/usr/bin/env node

/**
 * ============================================================================
 * BUILD & CONCATENAÇÃO MODULAR - WSW REDESIGN
 * ============================================================================
 * Concatena todos os módulos de `src/css/` e `src/js/` gerando os arquivos
 * de distribuição finais `wsw-redesign.css` e `wsw-redesign.js`.
 */

const fs = require('fs');
const path = require('path');

const CSS_SRC_DIR = path.join(__dirname, 'src', 'css');
const JS_SRC_DIR = path.join(__dirname, 'src', 'js');
const CSS_DIST_FILE = path.join(__dirname, 'wsw-redesign.css');
const JS_DIST_FILE = path.join(__dirname, 'wsw-redesign.js');

function buildCSS() {
  console.log('📦 Concatenando módulos CSS...');
  if (!fs.existsSync(CSS_SRC_DIR)) {
    console.error('❌ Diretório src/css não encontrado!');
    return;
  }

  const files = fs.readdirSync(CSS_SRC_DIR)
    .filter(f => f.endsWith('.css'))
    .sort();

  let combinedCss = `/**\n * ============================================================================\n * WSW - REDESIGN SAAS (COMPATÍVEL COM MATERIAL-UI)\n * ARQUIVO GERADO AUTOMATICAMENTE VIA BUILD - NÃO EDITE DIRETAMENTE\n * Edite os módulos individuais em src/css/\n * ============================================================================\n */\n\n`;

  files.forEach(file => {
    const filePath = path.join(CSS_SRC_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8').trim();
    combinedCss += `/* --- [Módulo: ${file}] --- */\n` + content + '\n\n';
    console.log(`  + ${file}`);
  });

  fs.writeFileSync(CSS_DIST_FILE, combinedCss, 'utf8');
  const stats = fs.statSync(CSS_DIST_FILE);
  console.log(`✅ CSS compilado com sucesso -> ${path.basename(CSS_DIST_FILE)} (${(stats.size / 1024).toFixed(2)} KB)\n`);
}

function buildJS() {
  console.log('📦 Concatenando módulos JavaScript...');
  if (!fs.existsSync(JS_SRC_DIR)) {
    console.error('❌ Diretório src/js não encontrado!');
    return;
  }

  const files = fs.readdirSync(JS_SRC_DIR)
    .filter(f => f.endsWith('.js'))
    .sort();

  let combinedJsBody = '';

  files.forEach(file => {
    const filePath = path.join(JS_SRC_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8').trim();
    combinedJsBody += `  // --- [Módulo: ${file}] ---\n` + content.split('\n').map(l => '  ' + l).join('\n') + '\n\n';
    console.log(`  + ${file}`);
  });

  const finalJs = `/**\n * ============================================================================\n * WSW - CUSTOM JS (TOPBAR, TICKET ACTIONS & MOBILE FIXES)\n * ARQUIVO GERADO AUTOMATICAMENTE VIA BUILD - NÃO EDITE DIRETAMENTE\n * Edite os módulos individuais em src/js/\n * ============================================================================\n */\n\n(function () {\n  'use strict';\n\n${combinedJsBody}})();\n`;

  // Validação de sintaxe
  try {
    new Function(finalJs);
  } catch (err) {
    console.error('❌ Erro de sintaxe no JavaScript compilado:', err.message);
    process.exit(1);
  }

  fs.writeFileSync(JS_DIST_FILE, finalJs, 'utf8');
  const stats = fs.statSync(JS_DIST_FILE);
  console.log(`✅ JS compilado e validado com sucesso -> ${path.basename(JS_DIST_FILE)} (${(stats.size / 1024).toFixed(2)} KB)\n`);
}

function main() {
  console.log('🚀 Iniciando Build do WSW Redesign...\n');
  buildCSS();
  buildJS();
  console.log('✨ Build concluído com sucesso!');
}

if (require.main === module) {
  main();
}

module.exports = { buildCSS, buildJS, main };
