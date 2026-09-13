export default {
  expo: {
    name: 'Ecommerce App',
    slug: 'ecommerce-app',
    version: '1.0.11',
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
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: 'com.pedronun.ecommerceapp',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      [
        '@hot-updater/react-native',
        {
          channel: 'production',
        },
      ],
    ],
  },
};
