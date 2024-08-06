import { CurrencyData } from './currencies';

enum CacheNames {
  currencies = 'currencies',
}

enum CurrenciesCacheFields {
  fiat = 'fiat',
  crypto = 'crypto',
}

type CacheMeta = {
  lastUpdatedAt?: string;
};

type CurrenciesCache = {
  [key in CurrenciesCacheFields]: CurrencyData[];
} & CacheMeta & {
    isEmpty: boolean;
  };

export { CacheNames, CurrenciesCacheFields };

export type { CacheMeta, CurrenciesCache };
