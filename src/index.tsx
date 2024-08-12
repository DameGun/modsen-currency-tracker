import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import '@/styles/index.scss';
import { ThemeProvider } from '@/components/common';
import { setupStore } from '@/store';
import { router } from '@/utils/router';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
