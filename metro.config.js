// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

if (!config.resolver.sourceExts.includes('cjs')) {
    config.resolver.sourceExts.push('cjs');
}

// Firebase ke internal .cjs files Metro ke naye package-exports resolution ke sath conflict karte hain
// Isko disable karne se Firebase Auth sahi se register ho pata hai (Expo SDK 53+ issue)
config.resolver.unstable_enablePackageExports = false;

module.exports = config;