const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add WASM support for React Native Skia
config.resolver.assetExts.push('wasm');

// Optimize for Skia performance
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

// Support for React Native Skia web
config.resolver.alias = {
  ...config.resolver.alias,
  '@shopify/react-native-skia/lib/module/web': '@shopify/react-native-skia/lib/module/web/index.js',
};

// Enable platform-specific extensions
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;