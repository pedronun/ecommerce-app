export default {
  expo: {
    name: 'Ecommerce App',
    slug: 'ecommerce-app',
    version: '1.0.12',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.pedronun.ecommerceapp',
      appleTeamId: 'NS3YGCXFN8',
      googleServicesFile: './GoogleService-Info.plist',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: 'com.pedronun.ecommerceapp',
      googleServicesFile: './google-services.json',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
            forceStaticLinking: ['RNFBApp', 'RNFBCrashlytics'],
          },
        },
      ],
      [
        '@react-native-firebase/app',
        {
          ios: {
            disableSPM: true,
          },
        },
      ],
      '@react-native-firebase/crashlytics',
      './plugins/withCrashlyticsDsym',
      [
        '@hot-updater/react-native',
        {
          channel: 'production',
        },
      ],
    ],
  },
};
