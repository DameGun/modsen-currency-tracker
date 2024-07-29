import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/components/common/Layout';
import { ROUTES } from '@/constants/routes';
import BanksMapPage from '@/pages/BanksMap';
import ContactPage from '@/pages/Contact';
import HomePage from '@/pages/Home';
import NotFoundPage from '@/pages/NotFound';
import TimelinePage from '@/pages/Timeline';

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.timeline,
        element: <TimelinePage />,
      },
      {
        path: ROUTES.banksMap,
        element: <BanksMapPage />,
      },
      {
        path: ROUTES.contact,
        element: <ContactPage />,
      },
      {
        path: ROUTES.notFound,
        element: <NotFoundPage />,
      },
    ],
  },
]);
