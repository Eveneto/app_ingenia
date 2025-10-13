#!/bin/bash

echo "🚀 Configurando Ambiente de Desenvolvimento React Native"
echo "=================================================="

# Verificar dependências
echo "📋 Verificando dependências..."

# Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js: $(node --version)"
else
    echo "❌ Node.js não encontrado"
    exit 1
fi

# npm
if command -v npm &> /dev/null; then
    echo "✅ npm: $(npm --version)"
else
    echo "❌ npm não encontrado"
    exit 1
fi

# Java
if command -v java &> /dev/null; then
    echo "✅ Java: $(java -version 2>&1 | head -n 1)"
else
    echo "❌ Java não encontrado"
    echo "📦 Instale o Java 17:"
    echo "sudo apt update && sudo apt install openjdk-17-jdk"
    exit 1
fi

# Verificar Android SDK
if [ -z "$ANDROID_HOME" ]; then
    echo "⚠️  ANDROID_HOME não configurado"
    echo "📦 Para desenvolvimento Android, você precisa:"
    echo "1. Instalar Android Studio"
    echo "2. Configurar ANDROID_HOME no ~/.bashrc:"
    echo "   export ANDROID_HOME=\$HOME/Android/Sdk"
    echo "   export PATH=\$PATH:\$ANDROID_HOME/emulator"
    echo "   export PATH=\$PATH:\$ANDROID_HOME/tools"
    echo "   export PATH=\$PATH:\$ANDROID_HOME/tools/bin"
    echo "   export PATH=\$PATH:\$ANDROID_HOME/platform-tools"
else
    echo "✅ ANDROID_HOME: $ANDROID_HOME"
fi

# Verificar Watchman
if command -v watchman &> /dev/null; then
    echo "✅ Watchman: $(watchman --version)"
else
    echo "⚠️  Watchman não encontrado (recomendado para performance)"
    echo "📦 Instalar Watchman:"
    echo "sudo apt update && sudo apt install watchman"
fi

echo ""
echo "🔧 Dependências de desenvolvimento recomendadas:"
echo "=================================================="

# Instalar dependências úteis de desenvolvimento
echo "📦 Instalando dependências de desenvolvimento..."

# React Navigation
npm install @react-navigation/native react-native-screens react-native-safe-area-context

# Dependências comuns
npm install react-native-vector-icons @react-native-async-storage/async-storage

# DevDependencies
npm install --save-dev reactotron-react-native flipper-plugin-reactotron

echo ""
echo "🎨 Configuração de desenvolvimento concluída!"
echo "=================================================="
echo ""
echo "📱 Para rodar o projeto:"
echo "• Android: npx react-native run-android"
echo "• iOS: npx react-native run-ios (apenas macOS)"
echo "• Metro: npx react-native start"
echo ""
echo "🔍 Ferramentas úteis:"
echo "• Flipper: Debugger visual"
echo "• Reactotron: Debug e monitoramento"
echo "• React Native DevTools"
echo ""
echo "📚 Próximos passos:"
echo "1. Configure o Android Studio se necessário"
echo "2. Inicie um emulador Android"
echo "3. Execute: npx react-native run-android"
