import { CreateChartPoint, CurrencyChart, Notification, PointsList } from '@/components/containers';
import { CURRENCIES_REQUEST_POLLING_TIME } from '@/constants/cache';
import Observable from '@/services/observable';
import { setCurrencies } from '@/store/currencies';
import { fetchCurrencies } from '@/store/currencies/thunks';
import { CacheNames, CurrenciesCache } from '@/types/cache';
import type { FinancialDataPointToAdd, FinancialDataPointToRemove } from '@/types/chart';
import type { CurrenciesResponse } from '@/types/currencies';
import withCache from '@/utils/withCache';

class TimelinePage extends Observable<
  FinancialDataPointToAdd | FinancialDataPointToRemove | string
> {
  constructor(props: object) {
    super(props);
  }

  render() {
    return (
      <>
        <CurrencyChart attach={this.attach} detach={this.detach} />
        <CreateChartPoint notify={this.notify} />
        <PointsList attach={this.attach} detach={this.detach} notify={this.notify} />
        <Notification attach={this.attach} detach={this.detach} />
      </>
    );
  }
}

export default withCache<object, CurrenciesCache, CurrenciesResponse, 'currencies/setCurrencies'>(
  TimelinePage,
  {
    storageManagerOptions: {
      fetchAction: fetchCurrencies,
      setStateAction: setCurrencies,
    },
    cacheName: CacheNames.currencies,
    polling: true,
    requestInterval: CURRENCIES_REQUEST_POLLING_TIME,
  }
);
