import { ConfigContext, ExpoConfig } from '@expo/config';

const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.maestro.maestrochat.dev';
  }

  if (IS_PREVIEW) {
    return 'com.maestro.maestrochat.preview';
  }

  return 'com.maestro.maestrochat';
};

const getIOSUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.maestro.maestrochat.dev';
  }

  return 'com.maestro.maestrochat';
};



const getAppName = () => {
  if (IS_DEV) {
    return 'Maestro Chat (Dev)';
  }

  if (IS_PREVIEW) {
    return 'Maestro Chat (Preview)';
  }

  return 'Maestro Chat';
};



export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: config.slug || 'maestrochat',
  ios: {
    ...config.ios,
    bundleIdentifier: getIOSUniqueIdentifier(),
  },
  android: {
    ...config.android,
    package: getUniqueIdentifier(),
  },
});
