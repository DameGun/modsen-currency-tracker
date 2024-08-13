import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '@/components/common';
import { ROUTES } from '@/constants/routes';

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <Layout />,
    children: [
      {
        index: true,
        lazy: async () => ({ Component: (await import('@/pages/Home')).default }),
      },
      {
        path: ROUTES.timeline,
        lazy: async () => ({ Component: (await import('@/pages/Timeline')).default }),
      },
      {
        path: ROUTES.banksMap,
        lazy: async () => ({ Component: (await import('@/pages/BanksMap')).default }),
      },
      {
        path: ROUTES.contact,
        lazy: async () => ({ Component: (await import('@/pages/Contact')).default }),
      },
      {
        path: ROUTES.notFound,
        lazy: async () => ({ Component: (await import('@/pages/NotFound')).default }),
      },
    ],
  },
]);
