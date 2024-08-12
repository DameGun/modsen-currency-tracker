import Layout from '@/components/common/Layout';
import { ROUTES } from '@/constants/routes';
import BanksMap from '@/pages/BanksMap';
import ContactPage from '@/pages/Contact';
import Home from '@/pages/Home';
import NotFoundPage from '@/pages/NotFound';
import Timeline from '@/pages/Timeline';

export const routesConfig = [
  {
    path: ROUTES.home,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES.timeline,
        element: <Timeline />,
      },
      {
        path: ROUTES.banksMap,
        element: <BanksMap />,
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
];
