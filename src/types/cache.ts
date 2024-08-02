import { CurrencyData } from './currencies';

enum CacheNames {
  currencies = 'currencies',
}

enum CurrenciesCacheFields {
  fiat = 'fiat',
  crypto = 'crypto',
}

type CurrenciesCache = {
  [key in CurrenciesCacheFields]: CurrencyData[];
} & {
  lastUpdatedAt?: string;
  isEmpty: boolean;
};

export { CacheNames, CurrenciesCacheFields };

export type { CurrenciesCache };
