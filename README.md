# Разработка

## Требования

Окружение для сборки

- React Native v0.7+
- NodeJS v9+
- JDK11
- Android Studio
  - Android SDK Platform 33
  - Google APIs Intel x86 Atom System Image

## Install Dependencies

```bash
# using npm
npm install

# OR using Yarn
yarn install
```
| Название                                                                                  | Версия | Описание                               |
|:------------------------------------------------------------------------------------------|--------|----------------------------------------|
| [Mobx](https://www.npmjs.com/package/mobx)| 6.10.0 | State-manager                          |
| [axios](https://www.npmjs.com/package/axios)| 1.4.0  | Для запросов                           |
| [react-native-pinchable](https://www.npmjs.com/package/react-native-pinchable)| 0.2.1  | Для приближения фотографии             |
| [react-navigation/native](https://www.npmjs.com/package/@react-navigation/native)| 6.1.7  | Для навигации                          |
| [react-navigation/native-stack](https://www.npmjs.com/package/@react-navigation/native-stack)| 6.9.13 | Для навигации                          |
| [react-native-select-dropdown](https://www.npmjs.com/package/react-native-select-dropdown)| 3.3.4  | Для выпадающего меню                   |
| [rn-fetch-blob](https://www.npmjs.com/package/rn-fetch-blob)| 0.12.0 | Для загрузки изображения на устройство |
| [react-native-camera-roll/camera-roll](https://www.npmjs.com/package/@react-native-camera-roll/camera-roll)| 5.7.2  | Для загрузки изображения на устройство |



## Запуск Metro Server

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Запуск приложения

### Для андроид

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### Для IOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```
* [Server Requirements](#install-dependencies)

## Структура проекта
```
.
├── src
|   ├── components
|   |   ├── Loading.jsx
|   |   ├── LogoTitle.jsx
|   |   └── SaveLoader.jsx
|   ├── misc
|   |   ├── imageApi.js
|   |   └── usersApi.js
|   ├── screens
|   |   ├── FullPin.jsx
|   |   ├── PinList.jsx
|   |   └── Navigation
|   └── store
|       ├── limitImageStore.js
|       ├── searchTextStore.js
|       └── toggleColStore.js
```


# Документация


- [React Native Website](https://reactnative.dev)
- [React Navigation Website](https://reactnavigation.org/)
- [Mobx Website](https://mobx.js.org/README.html)
