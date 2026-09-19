# 📺 PearlStream TV — Android TV APK Packaging Guide

Your PearlStream TV application has been converted into a native **Android TV project** powered by **Capacitor** with full **Android TV Leanback Launcher** compatibility.

---

## 🚀 Option 1: 1-Click Cloud APK Build via GitHub (Easiest — No Android Studio Needed)

We have already set up a GitHub Actions workflow in `.github/workflows/build-apk.yml`.

1. In Google AI Studio, open the project menu and click **Export to GitHub** (or push to your GitHub repo).
2. Go to your repository on GitHub and click the **Actions** tab.
3. You will see the **Build Android TV APK** workflow running automatically.
4. When finished (typically ~2-3 minutes), click on the workflow run.
5. Under **Artifacts**, download `PearlStream-TV-AndroidTV-APK`.
6. Extract the zip to get your ready-to-install **`PearlStream-TV-v1.0.apk`**!

---

## 💻 Option 2: Build Locally Using Android Studio or Command Line

### A. Using Android Studio (Visual GUI)
1. Download this project (ZIP export from AI Studio) and extract it.
2. Open **Android Studio**.
3. Select **Open** and choose the `android` folder inside this project directory (`/android`).
4. Wait for Gradle to index and sync dependencies.
5. In the top menu, go to **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
6. When the popup appears in the bottom right, click **locate** to grab your `app-debug.apk` (or `app-release.apk`).

### B. Using Command Line (Terminal)
Ensure Java 17+ and Android SDK are installed, then run:

```bash
# 1. Build the web app & sync assets to Android
npm run cap:sync

# 2. Build the APK using Gradle
cd android
./gradlew assembleDebug
# (On Windows use: gradlew.bat assembleDebug)
```

Your compiled APK will be located at:
`android/app/build/outputs/apk/debug/app-debug.apk`

---

## 📺 Android TV Features Configured in this Project

1. **Android TV Leanback Launcher**:
   - `android.software.leanback` and `LEANBACK_LAUNCHER` intent filter configured in `AndroidManifest.xml`.
   - The app shows up directly in the native Android TV / Google TV home screen row.
2. **Custom 16:9 TV Banner**:
   - Vector banner asset at `android/app/src/main/res/drawable/tv_banner.xml`.
3. **Remote & D-Pad Navigation**:
   - Hardware acceleration and webview focus handling configured in `MainActivity.java` so remote arrow keys (`UP`, `DOWN`, `LEFT`, `RIGHT`, `CENTER/ENTER`, `BACK`, `PLAY/PAUSE`) navigate effortlessly.
4. **Touchscreen Requirement Disabled**:
   - `android.hardware.touchscreen` marked as `required="false"`, ensuring compatibility with smart TVs, streaming sticks (Chromecast, Fire TV, Mi Box), and set-top boxes.
5. **Offline & Fast Loading**:
   - All web application assets and media styling are bundled directly into the APK assets for instant startup without loading delays.

---

## 📲 Installing the APK onto your Android TV

1. **Via USB Drive**:
   - Copy `PearlStream-TV-v1.0.apk` to a USB flash drive.
   - Plug it into your Android TV or TV Box.
   - Open a file manager app on TV (e.g. *File Commander* or *FX File Explorer*) and click the APK to install.

2. **Via "Send files to TV" App (Wireless)**:
   - Install the free **Send files to TV** app on your phone/PC and on your Android TV from the Google Play Store.
   - Send the APK over Wi-Fi, then install it using a package installer on your TV.

3. **Via ADB (Developer Mode)**:
   ```bash
   adb connect <TV_IP_ADDRESS>:5555
   adb install -r PearlStream-TV-v1.0.apk
   ```
