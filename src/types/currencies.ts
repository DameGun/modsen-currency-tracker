import { CurrenciesCache } from './cache';

type CurrencyData = {
  code: string;
  value: number;
  iconUrl: string;
};

type MetaData = {
  last_updated_at: string;
};

type ExchangeRatesResponse = {
  meta: MetaData;
  data: {
    [key: string]: CurrencyData;
  };
};

type CurrenciesResponse = {
  ratesResponse: ExchangeRatesResponse;
  iconsResponse: CurrencyIcon[];
};

type CurrencyIcon = {
  asset_id: string;
  url: string;
};

type CurrenciesState = {
  data: CurrenciesCache;
};

type CurrencyCodes = {
  [key: string]: number;
};

enum CryptoCurrencies {
  ADA = 'ADA',
  ARB = 'ARB',
  BTC = 'BTC',
  DAI = 'DAI',
  DOT = 'DOT',
  ETH = 'ETH',
  LTC = 'LTC',
  USDT = 'USDT',
  XRP = 'XRP',
}

export { CryptoCurrencies };

export type {
  CurrenciesResponse,
  CurrenciesState,
  CurrencyCodes,
  CurrencyData,
  CurrencyIcon,
  ExchangeRatesResponse,
  MetaData,
};
