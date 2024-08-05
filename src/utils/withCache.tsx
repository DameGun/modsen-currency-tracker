import { ComponentType, useEffect } from 'react';

import { useAppDispatch } from '@/hooks/redux';
import LocalStorageManager, { LocalStorageManagerProps } from '@/services/localStorageManager';
import { CacheMeta, CacheNames } from '@/types/cache';

interface CacheWithPollingProps<TData extends CacheMeta, TResponse, Path extends string> {
  storageManagerOptions: Omit<LocalStorageManagerProps<TData, TResponse, Path>, 'dispatch'>;
  cacheName: CacheNames;
  polling?: boolean;
  requestInterval?: number;
}

export default function withCache<
  P extends object,
  TData extends CacheMeta,
  TResponse,
  Path extends string,
>(WrappedComponent: ComponentType<P>, cacheOptions: CacheWithPollingProps<TData, TResponse, Path>) {
  const ComponentWithCache = (props: P) => {
    const dispatch = useAppDispatch();
    const localStorageManager = new LocalStorageManager<TData, TResponse, Path>({
      ...cacheOptions.storageManagerOptions,
      dispatch,
    });

    useEffect(() => {
      localStorageManager.retriveCache(cacheOptions.cacheName);

      if (cacheOptions.polling) {
        const intervalId = setInterval(() => {
          dispatch(cacheOptions.storageManagerOptions.fetchAction());
        }, cacheOptions.requestInterval);

        return () => clearInterval(intervalId);
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithCache;
}
