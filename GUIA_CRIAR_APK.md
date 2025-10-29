# Guia Completo: Como Criar um APK do AppIngenia

Este guia fornece as instruções passo a passo para criar um arquivo APK (Android Package) do aplicativo AppIngenia.

## Pré-requisitos

Antes de começar, certifique-se de que você possui:

1. **Node.js e npm** instalados
   ```bash
   node --version
   npm --version
   ```

2. **Android SDK** instalado
   - Pode ser instalado via Android Studio ou manualmente

3. **Java Development Kit (JDK)** versão 11 ou superior
   ```bash
   java -version
   ```

4. **Git** instalado
   ```bash
   git --version
   ```

5. **Variáveis de ambiente configuradas:**
   - `ANDROID_HOME` apontando para o diretório do Android SDK
   - `JAVA_HOME` apontando para o diretório do JDK
   - `PATH` incluindo `$ANDROID_HOME/platform-tools` e `$ANDROID_HOME/tools`

## Passo 1: Preparar o Ambiente de Desenvolvimento

### 1.1 Instalar dependências do projeto

```bash
cd /home/dev_pc/Documentos/app_ingenia/AppIngenia
npm install
```

### 1.2 Instalar dependências do Gradle

```bash
cd android
./gradlew clean
cd ..
```

## Passo 2: Configurar Variáveis de Ambiente (se necessário)

Se as variáveis de ambiente não estão configuradas, adicione ao seu `~/.bashrc` ou `~/.zshrc`:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export JAVA_HOME=/path/to/java/jdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools
```

Depois, recarregue o arquivo:

```bash
source ~/.bashrc
# ou
source ~/.zshrc
```

## Passo 3: Gerar o APK de Debug

Para criar um APK em modo debug (usado para testes e desenvolvimento):

```bash
cd /home/dev_pc/Documentos/app_ingenia/AppIngenia
npx react-native build-android
```

Ou usando gradle diretamente:

```bash
cd android
./gradlew assembleDebug
cd ..
```

O APK de debug será gerado em:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## Passo 4: Gerar o APK de Release (Produção)

Para criar um APK otimizado para release/produção:

### 4.1 Criar um Keystore (primeira vez)

```bash
keytool -genkey -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

Você será solicitado a:
- Definir uma senha para o keystore
- Fornecer informações pessoais
- Confirmar a senha

**Salve o keystore em um local seguro!**

### 4.2 Configurar o gradle.properties

Edite o arquivo `android/gradle.properties` e adicione (se não existir):

```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_STORE_PASSWORD=sua_senha_keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_KEY_PASSWORD=sua_senha_chave
```

### 4.3 Editar o build.gradle

Verifique se o `android/app/build.gradle` contém (deve estar presente):

```gradle
signingConfigs {
    release {
        if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

### 4.4 Compilar o APK de Release

```bash
cd /home/dev_pc/Documentos/app_ingenia/AppIngenia
cd android
./gradlew assembleRelease
cd ..
```

O APK de release será gerado em:
```
android/app/build/outputs/apk/release/app-release.apk
```

## Passo 5: Gerar um Bundle AAB (Google Play Store)

Se você planeja publicar no Google Play Store, gere um App Bundle:

```bash
cd /home/dev_pc/Documentos/app_ingenia/AppIngenia
cd android
./gradlew bundleRelease
cd ..
```

O bundle será gerado em:
```
android/app/build/outputs/bundle/release/app-release.aab
```

## Passo 6: Testar o APK

### 6.1 Listar dispositivos conectados

```bash
adb devices
```

### 6.2 Instalar o APK em um dispositivo

Para instalar o APK de debug:

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

Para instalar o APK de release:

```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

### 6.3 Desinstalar o aplicativo

```bash
adb uninstall com.appingenia
```

### 6.4 Ver logs da aplicação

```bash
adb logcat
```

## Passo 7: Troubleshooting Comum

### Erro: "ANDROID_HOME not set"

```bash
export ANDROID_HOME=$HOME/Android/Sdk
```

### Erro: "Java not found"

```bash
export JAVA_HOME=/path/to/jdk
export PATH=$PATH:$JAVA_HOME/bin
```

### Erro: "Gradle build failed"

```bash
cd android
./gradlew clean
./gradlew assembleDebug
cd ..
```

### Erro: "Certificate signature verification failed"

Verifique se o keystore está correto e as senhas estão corretas em `gradle.properties`.

### Problema: Aplicação lenta ou não responsiva

- Teste com `assembleDebug` primeiro
- Verifique se o ProGuard está habilitado em release
- Verifique logs com `adb logcat`

## Passo 8: Otimização para Release

Antes de gerar o APK final:

1. **Versão do app**: Edite `android/app/build.gradle`
   ```gradle
   versionCode 1
   versionName "1.0"
   ```

2. **Remover logs de debug**: Verifique se há `console.log` em produção

3. **Testar em múltiplos dispositivos**: Use emuladores de diferentes tamanhos

4. **Verificar permissões**: Abra `android/app/src/main/AndroidManifest.xml`

## Passo 9: Publicar no Google Play Store

1. Crie uma conta de desenvolvedor no [Google Play Console](https://play.google.com/console)

2. Crie um novo aplicativo

3. Faça upload do arquivo `.aab` gerado no passo 5

4. Preencha as informações do aplicativo (descrição, screenshots, etc.)

5. Configure o preço e distribuição

6. Envie para análise

## Resumo dos Comandos Principais

```bash
# Instalar dependências
npm install

# APK Debug
npx react-native build-android
# ou
cd android && ./gradlew assembleDebug && cd ..

# APK Release
cd android && ./gradlew assembleRelease && cd ..

# Bundle AAB (Google Play)
cd android && ./gradlew bundleRelease && cd ..

# Instalar em dispositivo
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Listar dispositivos
adb devices

# Ver logs
adb logcat
```

## Recursos Adicionais

- [Documentação React Native](https://reactnative.dev/docs/android-setup)
- [Android Developer Guide](https://developer.android.com/)
- [Google Play Console](https://play.google.com/console)

## Notas Importantes

⚠️ **Segurança:**
- Nunca compartilhe o arquivo keystore
- Nunca compartilhe as senhas do keystore
- Guarde o keystore em um local seguro (como um repositório privado)

⚠️ **Versionamento:**
- Sempre incremente `versionCode` antes de fazer upload de uma nova versão
- Mantenha um histórico de versões

⚠️ **Testes:**
- Sempre teste o APK em múltiplos dispositivos antes de publicar
- Verifique a compatibilidade com diferentes versões do Android

---

**Última atualização:** 29 de outubro de 2025

Para mais informações, consulte a documentação oficial do React Native para Android.
