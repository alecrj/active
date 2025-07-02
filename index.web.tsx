import '@expo/metro-runtime';
import { App } from 'expo-router/build/qualified-entry';
import { renderRootComponent } from 'expo-router/build/renderRootComponent';
import { LoadSkiaWeb } from '@shopify/react-native-skia/lib/module/web';

// Load Skia before rendering the app
LoadSkiaWeb().then(async () => {
  renderRootComponent(App);
}).catch((error) => {
  console.error('Failed to load Skia:', error);
  // Fallback: render app without Skia
  renderRootComponent(App);
});