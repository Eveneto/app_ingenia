#!/bin/bash

# Script para configurar variáveis de ambiente Android
# Execute: source configure-android-env.sh

echo "🔧 Configurando variáveis de ambiente Android..."

# Configurar JAVA_HOME
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
echo "✅ JAVA_HOME configurado: $JAVA_HOME"

# Configurar ANDROID_HOME (já existente)
export ANDROID_HOME=/home/dev_pc/Android/Sdk
echo "✅ ANDROID_HOME configurado: $ANDROID_HOME"

# Adicionar ferramentas Android ao PATH
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
export PATH=$PATH:$ANDROID_HOME/build-tools/34.0.0

echo "✅ PATH atualizado com ferramentas Android"

# Verificar configuração
echo ""
echo "📋 Verificação das configurações:"
echo "Node.js: $(node --version)"
echo "Java: $(java --version | head -1)"
echo "JAVA_HOME: $JAVA_HOME"
echo "ANDROID_HOME: $ANDROID_HOME"

# Verificar se ferramentas estão disponíveis
echo ""
echo "🛠️ Verificando ferramentas Android:"
which adb > /dev/null && echo "✅ ADB disponível" || echo "❌ ADB não encontrado"
which emulator > /dev/null && echo "✅ Emulator disponível" || echo "❌ Emulator não encontrado"

echo ""
echo "🎯 Configuração concluída! Agora você pode executar 'npm run android'"
