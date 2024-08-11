import { ComponentType, useEffect, useState } from 'react';

import { Loader } from '@/components/common';
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
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function getData() {
      await localStorageManager.retriveCache(cacheOptions.cacheName);
      setIsLoading(false);

      if (cacheOptions.polling) {
        const intervalId = setInterval(() => {
          dispatch(cacheOptions.storageManagerOptions.fetchAction());
        }, cacheOptions.requestInterval);

        return () => clearInterval(intervalId);
      }
    }

    useEffect(() => {
      getData();
    }, []);

    return (
      <Loader isLoading={isLoading}>
        <WrappedComponent {...props} />
      </Loader>
    );
  };

  return ComponentWithCache;
}
