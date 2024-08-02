import { Outlet } from 'react-router-dom';

import Banner from '@/components/containers/Banner';
import Footer from '@/components/containers/Footer';
import Header from '@/components/containers/Header';
import Status from '@/components/containers/Status';

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
