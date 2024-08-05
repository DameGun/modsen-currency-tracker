import { getIconForCurrency } from './getIconForCurrency';

import { CurrenciesCache } from '@/types/cache';
import { CryptoCurrencies, CurrencyData, ExchangeRatesResponse } from '@/types/currencies';

export function mapCurrenciesResponse(response: ExchangeRatesResponse): CurrenciesCache {
  const crypto: CurrencyData[] = [];
  const fiat: CurrencyData[] = [];

  for (const key in response.data) {
    const icon = getIconForCurrency(key);

    if (icon) {
      const currencyWithIcon: CurrencyData = { ...response.data[key], iconUrl: icon.url };

      if (Object.keys(CryptoCurrencies).includes(key)) {
        crypto.push(currencyWithIcon);
      } else {
        fiat.push(currencyWithIcon);
      }
    }
  }

  return { fiat, crypto, isEmpty: false, lastUpdatedAt: response.meta.last_updated_at };
}
