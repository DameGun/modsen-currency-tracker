import { ReactNode, useEffect, useState } from 'react';

import './styles.scss';
import { LOADER_TIMEOUT } from '@/constants/misc';

interface LoadableProps {
  isLoading: boolean;
  children: ReactNode;
}

export default function Loader({ isLoading, children }: LoadableProps) {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setShow(true), LOADER_TIMEOUT);

    if (!isLoading) {
      setShow(false);
      clearTimeout(timeoutId);
    }

    return () => clearTimeout(timeoutId);
  }, [isLoading]);

  return show ? <div className='loader' /> : children;
}
