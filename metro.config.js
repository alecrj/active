const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Basic WASM support for Skia
config.resolver.assetExts.push('wasm');

// Basic optimization for current Metro version
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: false,
  },
});

// Enable platform extensions
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;