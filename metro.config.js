const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Skia 2.0 WASM support
config.resolver.assetExts.push('wasm');

// Modern Metro optimizations for SDK 53
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

// Skia 2.0 web support
config.resolver.alias = {
  ...config.resolver.alias,
  '@shopify/react-native-skia/lib/module/web': '@shopify/react-native-skia/lib/module/web/index.js',
};

// Enable all platforms
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Skia 2.0 specific resolver extensions
config.resolver.sourceExts.push('mjs');

module.exports = config;