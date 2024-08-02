import { useEffect } from 'react';
import { useAppDispatch } from './redux';

import { DEFAULT_REQUEST_POLLING_TIME } from '@/constants/cache';
import LocalStorageManager, { LocalStorageManagerProps } from '@/services/localStorageManager';
import { CacheNames } from '@/types/cache';

interface CacheWithPollingProps<TData, TResponse, Path extends string> {
  storageManagerOptions: Omit<LocalStorageManagerProps<TData, TResponse, Path>, 'dispatch'>;
  cacheName: CacheNames;
  polling?: boolean;
  requestInterval?: number;
}

export default function useCacheWithPolling<TData, TResponse, Path extends string>({
  storageManagerOptions,
  cacheName,
  requestInterval = DEFAULT_REQUEST_POLLING_TIME,
  polling = false,
}: CacheWithPollingProps<TData, TResponse, Path>) {
  const dispatch = useAppDispatch();
  const localStorageManager = new LocalStorageManager<TData, TResponse, Path>({
    ...storageManagerOptions,
    dispatch,
  });

  useEffect(() => {
    localStorageManager.retriveCache(cacheName);

    if (polling) {
      const intervalId = setInterval(() => {
        dispatch(storageManagerOptions.fetchAction());
      }, requestInterval);

      return () => clearInterval(intervalId);
    }
  }, []);

  return localStorageManager;
}
