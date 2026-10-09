# Visualizar o AppIngenia em um celular Android

## Requisitos no computador

- Node.js 20 ou superior.
- JDK 17.
- Android Studio com Android SDK Platform 36, Android SDK Build-Tools 36.0.0, Android SDK Platform-Tools e NDK 29.0.14206865.
- Cabo USB e depuração USB habilitada no celular.

No Android Studio, instale os componentes em **Tools > SDK Manager**. O **Android SDK Platform-Tools** inclui o ADB; não é necessário instalá-lo pelo Chocolatey. Configure `ANDROID_HOME` para a pasta do SDK e `JAVA_HOME` para o JDK 17. O Gradle usa essas variáveis; o projeto não deve fixar o caminho local do Java. Para usar `adb` em qualquer terminal, inclua `%ANDROID_HOME%\platform-tools` no `Path` do Windows e abra um terminal novo. Para adicionar somente à sessão atual do PowerShell:

```powershell
$env:Path += ";$env:ANDROID_HOME\platform-tools"
```

## Executar diretamente no celular (desenvolvimento)

1. No celular, habilite **Opções do desenvolvedor > Depuração USB** e conecte-o ao computador. Aceite a autorização exibida no aparelho.
2. Abra o PowerShell na pasta `app_ingenia` e confira se o dispositivo aparece como `device`:

   ```powershell
   & "$env:ANDROID_HOME\platform-tools\adb.exe" devices
   ```

3. Instale as dependências (somente na primeira vez) e inicie o app:

   ```powershell
   npm install
   npm run android-dev
   ```

O comando compila e instala a versão de desenvolvimento e o React Native CLI encaminha a porta do Metro pelo ADB do Android SDK. Não é necessário instalar ADB com npm ou Chocolatey nem adicioná-lo ao `Path` para executar esse comando. Mantenha o terminal do Metro aberto enquanto usa o app; essa versão precisa dele para carregar o JavaScript.

Se o celular aparecer como `unauthorized`, aceite a solicitação no aparelho. Para verificar o dispositivo sem adicionar o ADB ao `Path`, execute `& "$env:ANDROID_HOME\platform-tools\adb.exe" devices` no PowerShell. Se o app não conseguir se conectar ao Metro, execute `& "$env:ANDROID_HOME\platform-tools\adb.exe" reverse tcp:8081 tcp:8081` e recarregue o app.

## Gerar um APK para abrir sem o Metro

Na pasta `app_ingenia`, execute no PowerShell:

```powershell
Push-Location .\android
.\gradlew.bat assembleRelease
Pop-Location
```

O APK ficará em `android\app\build\outputs\apk\release\app-release.apk`. Para instalar por USB:

```powershell
& "$env:ANDROID_HOME\platform-tools\adb.exe" install -r .\android\app\build\outputs\apk\release\app-release.apk
```

Também é possível copiar esse APK para o celular e abri-lo lá; talvez seja necessário permitir a instalação de apps dessa origem nas configurações do Android. Este APK usa a assinatura de debug do projeto e serve para teste/sideload, não para publicação na Play Store.

## Problemas comuns

- **Nenhum dispositivo aparece:** confira o cabo, o modo USB e a depuração USB; execute `adb devices` novamente.
- **`adb` não é reconhecido no terminal:** confirme que `ANDROID_HOME` aponta para o SDK. O comando `npm run android-dev` usa o ADB detectado pelo React Native CLI; para executar o ADB manualmente sem alterar o `Path`, use `& "$env:ANDROID_HOME\platform-tools\adb.exe" devices` no PowerShell.
- **Chocolatey informa `Access denied` ao instalar `adb`:** o erro significa que o processo não tem permissão para gravar em `C:\ProgramData\chocolatey`. Não é preciso instalar o ADB pelo Chocolatey; use o **Android SDK Platform-Tools** no SDK Manager. Se precisar instalar pacotes pelo Chocolatey, abra o PowerShell com **Executar como administrador** e repita o comando.
- **Falha de Java/Gradle:** confirme que `JAVA_HOME` aponta para um JDK 17 válido e abra um novo terminal.
- **SDK ou NDK ausente:** instale as versões listadas nos requisitos pelo SDK Manager do Android Studio.
- **Limpar os artefatos de build:** na pasta `app_ingenia`, execute `Push-Location .\android; .\gradlew.bat clean; Pop-Location`. Isso não é necessário a cada compilação.
