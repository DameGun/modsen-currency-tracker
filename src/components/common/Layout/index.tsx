import { Outlet } from 'react-router-dom';

import Header from '@/components/containers/Header';

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
