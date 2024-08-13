import { defineConfig } from 'cypress';
import { initPlugin } from 'cypress-plugin-snapshots/plugin';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:9000',
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      initPlugin(on, config);
    },
  },
});
