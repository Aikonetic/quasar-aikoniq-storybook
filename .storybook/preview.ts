import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import { Quasar } from 'quasar';
import { createPinia } from 'pinia';

import 'quasar/src/css/index.sass';
import '@quasar/extras/material-icons/material-icons.css';

setup((app) => {
  // 1) Pinia erzeugen
  const pinia = createPinia();

  // 2) Pinia und Quasar als Plugins registrieren
  app.use(pinia);
  app.use(Quasar, {});

  // Optional: hier könntest du global Komponenten oder Mocks registrieren
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
