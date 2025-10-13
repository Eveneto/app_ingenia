#!/bin/bash

echo "🔧 Configuração Rápida do Android para React Native"
echo "================================================="

# Instalar ADB
echo "📦 Instalando ADB..."
sudo apt update
sudo apt install -y adb

# Verificar se Java está instalado
echo "☕ Verificando Java..."
java -version

echo ""
echo "📱 Configuração Manual Necessária:"
echo "=================================="
echo ""
echo "1. 📥 BAIXAR ANDROID STUDIO:"
echo "   https://developer.android.com/studio"
echo ""
echo "2. 🛠️ APÓS INSTALAÇÃO, configure:"
echo "   - Abra Android Studio"
echo "   - Configure SDK Manager"
echo "   - Instale Android SDK (API 30+)"
echo "   - Crie um AVD (Android Virtual Device)"
echo ""
echo "3. 🔧 CONFIGURAR VARIÁVEIS:"
echo "   export ANDROID_HOME=\$HOME/Android/Sdk"
echo "   export PATH=\$PATH:\$ANDROID_HOME/emulator"
echo "   export PATH=\$PATH:\$ANDROID_HOME/tools"
echo "   export PATH=\$PATH:\$ANDROID_HOME/platform-tools"
echo ""
echo "4. 📝 ADICIONAR AO ~/.bashrc:"
echo "   echo 'export ANDROID_HOME=\$HOME/Android/Sdk' >> ~/.bashrc"
echo "   echo 'export PATH=\$PATH:\$ANDROID_HOME/emulator' >> ~/.bashrc"
echo "   echo 'export PATH=\$PATH:\$ANDROID_HOME/tools' >> ~/.bashrc"
echo "   echo 'export PATH=\$PATH:\$ANDROID_HOME/platform-tools' >> ~/.bashrc"
echo "   source ~/.bashrc"
echo ""
echo "5. 🚀 EXECUTAR APLICAÇÃO:"
echo "   cd /home/dev_pc/Documentos/app_ingenia/AppIngenia"
echo "   npx react-native run-android"
echo ""
echo "📱 ALTERNATIVA - DISPOSITIVO FÍSICO:"
echo "===================================="
echo "1. Ative 'Opções do desenvolvedor' no Android"
echo "2. Ative 'Depuração USB'"
echo "3. Conecte via USB"
echo "4. Execute: adb devices"
echo "5. Execute: npx react-native run-android"
echo ""
echo "✅ Metro bundler já está rodando em http://localhost:8081"
