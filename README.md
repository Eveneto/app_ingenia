# App Ingenia - React Native

Um projeto React Native criado para demonstrar o desenvolvimento mobile moderno.

## 🚀 Configuração do Ambiente

### Pré-requisitos

- ✅ Node.js v20.19.3
- ✅ npm v10.8.2
- ✅ Java 17 (OpenJDK)
- ⚠️ Android Studio (recomendado)
- ⚠️ Watchman (para melhor performance)

### Instalação

1. **Clone o projeto** (se necessário):
   ```bash
   cd /home/dev_pc/Documentos/app_ingenia/AppIngenia
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure o Android Studio** (se necessário):
   - Baixe e instale o [Android Studio](https://developer.android.com/studio)
   - Configure as variáveis de ambiente:
   
   ```bash
   # Adicione ao ~/.bashrc
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

4. **Instale o Watchman** (opcional, mas recomendado):
   ```bash
   sudo apt update && sudo apt install watchman
   ```

## 📱 Executando o Projeto

### Metro Bundler
Primeiro, inicie o Metro bundler:
```bash
npx react-native start
```

### Android
Em um novo terminal:
```bash
npx react-native run-android
```

### iOS (apenas macOS)
```bash
npx react-native run-ios
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
