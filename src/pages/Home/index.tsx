import CurrencyCardList from '@/components/containers/CurrencyCardList';
import { CURRENCIES_REQUEST_POLLING_TIME } from '@/constants/cache';
import { useAppSelector } from '@/hooks/redux';
import useCacheWithPolling from '@/hooks/useCacheWithPolling';
import { selectCurrencies, setCurrencies } from '@/store/currencies';
import { fetchCurrencies } from '@/store/currencies/thunks';
import { CacheNames, CurrenciesCache, CurrenciesCacheFields } from '@/types/cache';
import { ExchangeRatesResponse } from '@/types/currencies';

export default function HomePage() {
  const currencies = useAppSelector(selectCurrencies);
  useCacheWithPolling<CurrenciesCache, ExchangeRatesResponse, 'currencies/setCurrencies'>({
    storageManagerOptions: {
      fetchAction: fetchCurrencies,
      setStateAction: setCurrencies,
    },
    cacheName: CacheNames.currencies,
    polling: false,
    requestInterval: CURRENCIES_REQUEST_POLLING_TIME,
  });

  return (
    !currencies.isEmpty && (
      <>
        <CurrencyCardList
          key={CurrenciesCacheFields.crypto}
          label={CurrenciesCacheFields.crypto}
          items={currencies.crypto}
        />
        <CurrencyCardList
          key={CurrenciesCacheFields.fiat}
          label={CurrenciesCacheFields.fiat}
          items={currencies.fiat}
        />
      </>
    )
  );
}
