import 'dotenv/config';

export default {
  name: 'NiceOut',
  slug: 'niceout',
  privacy: 'public',
  sdkVersion: '41.0.0',
  platforms: ['ios', 'android', 'web'],
  version: '1.0.0',
  orientation: 'portrait',
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  extra: {
    API_KEY: process.env.API_KEY,
  },
};
