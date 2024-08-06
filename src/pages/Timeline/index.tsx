import { ReactNode } from 'react';

import ChartNotification from '@/components/containers/ChartNotification';
import CreateChartPoint from '@/components/containers/CreateChartPoint';
import CurrencyChart from '@/components/containers/CurrencyChart';
import PointsList from '@/components/containers/PointsList';
import { CURRENCIES_REQUEST_POLLING_TIME } from '@/constants/cache';
import Observable from '@/services/observable';
import { setCurrencies } from '@/store/currencies';
import { fetchCurrencies } from '@/store/currencies/thunks';
import { CacheNames, CurrenciesCache } from '@/types/cache';
import { FinancialDataPointToAdd, FinancialDataPointToRemove } from '@/types/chart';
import { ExchangeRatesResponse } from '@/types/currencies';
import withCache from '@/utils/withCache';

class TimelinePage extends Observable<
  FinancialDataPointToAdd | FinancialDataPointToRemove | string
> {
  constructor(props: object) {
    super(props);
  }

  render(): ReactNode {
    return (
      <div>
        <CurrencyChart attach={this.attach} detach={this.detach} />
        <CreateChartPoint notify={this.notify} />
        <PointsList attach={this.attach} detach={this.detach} notify={this.notify} />
        <ChartNotification attach={this.attach} detach={this.detach} />
      </div>
    );
  }
}

export default withCache<
  object,
  CurrenciesCache,
  ExchangeRatesResponse,
  'currencies/setCurrencies'
>(TimelinePage, {
  storageManagerOptions: {
    fetchAction: fetchCurrencies,
    setStateAction: setCurrencies,
  },
  cacheName: CacheNames.currencies,
  polling: true,
  requestInterval: CURRENCIES_REQUEST_POLLING_TIME,
});
