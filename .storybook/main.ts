import { type StorybookConfig } from '@storybook/vue3-vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import path from 'path';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  stories: ['../src/**/*.stories.@(js|ts|jsx|tsx)'],
  async viteFinal(config) {
    config.plugins = [
      vue({ template: { transformAssetUrls } }),
      quasar(),
      ...(config.plugins || []),
    ];

    config.resolve = {
      ...(config.resolve || {}),
      alias: {
        ...(config.resolve?.alias || {}),
        src: path.resolve(__dirname, '../src'),
        boot: path.resolve(__dirname, '../src/boot'),
      },
    };

    return config;
  },
};

export default config;
