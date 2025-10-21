#!/bin/bash

echo "📱 Monitorando autorização do dispositivo Android..."
echo "================================================="

while true; do
    DEVICE_STATUS=$(adb devices | grep "272f01ac" | awk '{print $2}')
    
    if [ "$DEVICE_STATUS" = "device" ]; then
        echo "✅ SUCESSO! Dispositivo autorizado e pronto!"
        echo ""
        echo "🚀 Agora você pode executar:"
        echo "cd /home/dev_pc/Documentos/app_ingenia/AppIngenia"
        echo "npx react-native run-android"
        echo ""
        break
    elif [ "$DEVICE_STATUS" = "unauthorized" ]; then
        echo "⏳ Dispositivo ainda não autorizado... ($(date +%H:%M:%S))"
        echo "📱 Verifique o popup no celular"
    else
        echo "❌ Dispositivo desconectado"
        echo "🔌 Verifique a conexão USB"
    fi
    
    sleep 3
done
