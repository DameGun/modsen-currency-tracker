import { useMemo } from 'react';

import './styles.scss';
import { useAppSelector } from '@/hooks/redux';
import { selectLastUpdatedAt } from '@/store/currencies';

export default function Status() {
  const lastUpdatedAt = useAppSelector(selectLastUpdatedAt);
  const lastUpdatedAtLocal = useMemo<string | undefined>(
    () => (lastUpdatedAt ? new Date(lastUpdatedAt).toLocaleString() : undefined),
    [lastUpdatedAt]
  );

  return (
    <div className='status'>
      {lastUpdatedAt && (
        <>
          <span className='status__badge' />
          <h4 className='status__text'>Last updated at {lastUpdatedAtLocal}</h4>
        </>
      )}
    </div>
  );
}
