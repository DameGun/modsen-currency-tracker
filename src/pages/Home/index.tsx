import CurrencyCardList from '@/components/containers/CurrencyCardList';
import { CURRENCIES_REQUEST_POLLING_TIME } from '@/constants/cache';
import { useAppSelector } from '@/hooks/redux';
import { selectCurrencies, setCurrencies } from '@/store/currencies';
import { fetchCurrencies } from '@/store/currencies/thunks';
import { CacheNames, CurrenciesCache, CurrenciesCacheFields } from '@/types/cache';
import { ExchangeRatesResponse } from '@/types/currencies';
import withCache from '@/utils/withCache';

function BaseHomePage() {
  const currencies = useAppSelector(selectCurrencies);

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

export default withCache<
  object,
  CurrenciesCache,
  ExchangeRatesResponse,
  'currencies/setCurrencies'
>(BaseHomePage, {
  storageManagerOptions: {
    fetchAction: fetchCurrencies,
    setStateAction: setCurrencies,
  },
  cacheName: CacheNames.currencies,
  polling: true,
  requestInterval: CURRENCIES_REQUEST_POLLING_TIME,
});
