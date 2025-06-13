import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import { Quasar } from 'quasar';

import 'quasar/src/css/index.sass';
import '@quasar/extras/material-icons/material-icons.css';

setup((app) => {
  app.use(Quasar, {});
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
