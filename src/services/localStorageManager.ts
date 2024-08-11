import { ActionCreatorWithPayload, AsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';

import { AppDispatch } from '@/store';
import { CacheMeta, CacheNames } from '@/types/cache';
import isOneDayPassed from '@/utils/isOneDayPassed';

export interface LocalStorageManagerProps<TData, TResponse, Path extends string> {
  dispatch: AppDispatch;
  fetchAction: AsyncThunk<TResponse, void, AsyncThunkConfig>;
  setStateAction: ActionCreatorWithPayload<TData, Path>;
}

interface ILocalStorageManager {
  retriveCache(cacheName: CacheNames): void;
}

export default class LocalStorageManager<TData extends CacheMeta, TResponse, Path extends string>
  implements ILocalStorageManager
{
  constructor({
    dispatch,
    fetchAction,
    setStateAction,
  }: LocalStorageManagerProps<TData, TResponse, Path>) {
    this.dispatch = dispatch;
    this.fetchAction = fetchAction;
    this.setStateAction = setStateAction;
  }

  dispatch: AppDispatch;
  fetchAction: AsyncThunk<TResponse, void, AsyncThunkConfig>;
  setStateAction: ActionCreatorWithPayload<TData, Path>;

  static setCache<T>(cacheName: CacheNames, cache: T): void {
    localStorage.setItem(cacheName, JSON.stringify(cache));
  }

  async retriveCache(cacheName: CacheNames): Promise<void> {
    const cache = localStorage.getItem(cacheName);

    if (cache === null) {
      await this.dispatch(this.fetchAction());
    } else {
      const mappedCache: TData = JSON.parse(cache);

      if (
        mappedCache.lastUpdatedAt &&
        isOneDayPassed(new Date(), new Date(mappedCache.lastUpdatedAt))
      ) {
        await this.dispatch(this.fetchAction());
      } else {
        this.dispatch(this.setStateAction(mappedCache));
      }
    }
  }

  static retriveCache<T>(cacheName: CacheNames): T | null {
    const cache = localStorage.getItem(cacheName);

    if (cache === null) {
      return null;
    } else {
      const mappedCache: T = JSON.parse(cache);
      return mappedCache;
    }
  }
}
