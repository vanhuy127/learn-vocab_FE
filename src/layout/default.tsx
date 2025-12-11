import React, { type PropsWithChildren, lazy } from 'react';

import { useOutlet } from 'react-router-dom';

const Header = lazy(() => import('@/components/header'));
const Footer = lazy(() => import('@/components/footer'));

export const DefaultLayout: React.FC<PropsWithChildren> = () => {
  const outlet = useOutlet();

  return (
    <div>
      <Header />
      <div>{outlet}</div>
      <Footer />
    </div>
  );
};
