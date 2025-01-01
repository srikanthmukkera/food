const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {withNativeWind} = require('nativewind/metro');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

const defaultConfig = getDefaultConfig(__dirname);

const config = mergeConfig(defaultConfig, {
  resolver: {
    assetExts: [...defaultConfig.resolver.assetExts, 'avif'],
  },
});

module.exports = withNativeWind(config, {input: './global.css'});
