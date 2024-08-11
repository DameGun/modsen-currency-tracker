import { getIconForCurrency } from './getIconForCurrency';

import type { CurrenciesCache } from '@/types/cache';
import { CryptoCurrencies, type CurrenciesResponse, type CurrencyData } from '@/types/currencies';

export function mapCurrenciesResponse(currenciesResponse: CurrenciesResponse): CurrenciesCache {
  const { ratesResponse, iconsResponse } = currenciesResponse;
  const crypto: CurrencyData[] = [];
  const fiat: CurrencyData[] = [];

  for (const key in ratesResponse.data) {
    const icon = getIconForCurrency(key, iconsResponse);

    if (icon) {
      const currencyWithIcon: CurrencyData = { ...ratesResponse.data[key], iconUrl: icon.url };

      if (Object.keys(CryptoCurrencies).includes(key)) {
        crypto.push(currencyWithIcon);
      } else {
        fiat.push(currencyWithIcon);
      }
    }
  }

  return { fiat, crypto, isEmpty: false, lastUpdatedAt: ratesResponse.meta.last_updated_at };
}
