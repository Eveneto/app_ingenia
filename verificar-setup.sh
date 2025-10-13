#!/bin/bash

echo "🔍 Verificando Configuração Android + React Native"
echo "================================================="

# Verificar ADB
echo "📱 Verificando ADB..."
if command -v adb &> /dev/null; then
    echo "✅ ADB: $(adb version | head -n 1)"
    echo "📋 Dispositivos conectados:"
    adb devices
else
    echo "❌ ADB não encontrado"
fi

echo ""

# Verificar ANDROID_HOME
echo "📂 Verificando ANDROID_HOME..."
if [ -n "$ANDROID_HOME" ]; then
    echo "✅ ANDROID_HOME: $ANDROID_HOME"
    if [ -d "$ANDROID_HOME" ]; then
        echo "✅ Diretório existe"
        ls -la "$ANDROID_HOME" 2>/dev/null || echo "📁 Diretório vazio (normal na primeira instalação)"
    else
        echo "⚠️  Diretório não encontrado"
    fi
else
    echo "❌ ANDROID_HOME não configurado"
fi

echo ""

# Verificar Java
echo "☕ Verificando Java..."
if command -v java &> /dev/null; then
    echo "✅ Java: $(java -version 2>&1 | head -n 1)"
else
    echo "❌ Java não encontrado"
fi

echo ""

# Verificar Node.js
echo "🟢 Verificando Node.js..."
if command -v node &> /dev/null; then
    echo "✅ Node.js: $(node --version)"
    echo "✅ npm: $(npm --version)"
else
    echo "❌ Node.js não encontrado"
fi

echo ""

# Verificar React Native CLI
echo "⚛️  Verificando React Native..."
if command -v npx &> /dev/null; then
    echo "✅ npx disponível"
    cd /home/dev_pc/Documentos/app_ingenia/AppIngenia
    echo "📁 Projeto: $(pwd)"
    echo "📦 Dependências instaladas: $(ls node_modules | wc -l) pacotes"
else
    echo "❌ npx não encontrado"
fi

echo ""

# Verificar Metro Bundler
echo "🚇 Verificando Metro Bundler..."
if lsof -i :8081 &> /dev/null; then
    echo "✅ Metro rodando na porta 8081"
else
    echo "⚠️  Metro não está rodando"
    echo "💡 Execute: npx react-native start"
fi

echo ""
echo "🎯 STATUS GERAL:"
echo "==============="

# Resumo
if command -v adb &> /dev/null && [ -n "$ANDROID_HOME" ] && command -v java &> /dev/null && command -v node &> /dev/null; then
    echo "✅ Configuração base: COMPLETA"
    echo ""
    echo "🚀 PRÓXIMOS PASSOS:"
    echo "1. Complete a configuração do Android Studio"
    echo "2. Instale os SDKs via SDK Manager"
    echo "3. Crie um emulador AVD"
    echo "4. Execute: npx react-native run-android"
else
    echo "⚠️  Configuração base: INCOMPLETA"
    echo "Verifique os itens marcados com ❌ acima"
fi

echo ""
echo "📖 Consulte o arquivo ANDROID_SETUP_GUIA.md para instruções detalhadas"
