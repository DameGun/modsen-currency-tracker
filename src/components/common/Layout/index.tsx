import { Outlet } from 'react-router-dom';

import { Banner, Footer, Header, Status } from '@/components/containers';

export default function Layout() {
  return (
    <>
      <Header />
      <Banner />
      <Status />
      <Outlet />
      <Footer />
    </>
  );
}
