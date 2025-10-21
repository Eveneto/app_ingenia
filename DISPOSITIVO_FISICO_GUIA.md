# 📱 Configuração Dispositivo Físico Android

## ✅ **Status Atual:**
- **Dispositivo detectado**: `272f01ac`
- **Status**: `unauthorized` (normal na primeira conexão)
- **ADB funcionando**: ✅

## 🔧 **Próximos Passos:**

### 1. **Autorizar o Computador no Celular**
No seu celular Android deve aparecer um popup perguntando:
**"Permitir depuração USB?"**

- ✅ **Marque**: "Sempre permitir deste computador"
- ✅ **Toque**: "OK" ou "Permitir"

### 2. **Se o popup não aparecer:**
- Desconecte e reconecte o cabo USB
- Ou execute: `adb kill-server && adb start-server`

### 3. **Verificar autorização:**
```bash
adb devices
```
Deve mostrar: `272f01ac    device` (sem "unauthorized")

## 🚀 **Executar o App INGENIA 2025:**

Após autorizar o dispositivo:

```bash
cd /home/dev_pc/Documentos/app_ingenia/AppIngenia
npx react-native start
```

Em outro terminal:
```bash
cd /home/dev_pc/Documentos/app_ingenia/AppIngenia
npx react-native run-android
```

## 📱 **Vantagens do Dispositivo Físico:**
- ✅ **Performance real** do dispositivo
- ✅ **Menos consumo de RAM** no PC
- ✅ **Testes mais realistas**
- ✅ **Sensores reais** (acelerômetro, GPS, etc.)
- ✅ **Velocidade de desenvolvimento**

## 🔍 **Comandos Úteis:**

### Verificar dispositivos:
```bash
adb devices
```

### Reiniciar ADB:
```bash
adb kill-server
adb start-server
```

### Instalar APK diretamente:
```bash
adb install caminho/para/app.apk
```

### Ver logs do dispositivo:
```bash
adb logcat
```

## ⚠️ **Se houver problemas:**

### Dispositivo não aparece:
1. Verifique se **Depuração USB** está ativada
2. Troque o cabo USB
3. Troque a porta USB do computador
4. Reinicie o ADB: `adb kill-server && adb start-server`

### "Unauthorized" persiste:
1. Revogue autorizações: **Configurações > Opções do desenvolvedor > Revogar autorizações de depuração USB**
2. Desconecte e reconecte o dispositivo
3. Autorize novamente

---

**🎯 Próximo passo: Autorize o dispositivo no popup que deve aparecer no celular!**
