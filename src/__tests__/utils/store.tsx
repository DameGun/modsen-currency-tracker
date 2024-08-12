import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { render, RenderOptions, RenderResult } from '@testing-library/react';

import { AppStore, type RootState, setupStore } from '@/store';
import { ColorMode } from '@/types/theme';

const preloadedState: Partial<RootState> = {
  theme: {
    mode: ColorMode.Dark,
  },
  currencies: {
    data: {
      fiat: [
        {
          code: 'USD',
          value: 1,
          iconUrl: '',
        },
        {
          code: 'EUR',
          value: 1.09,
          iconUrl: '',
        },
        {
          code: 'RUB',
          value: 0.5,
          iconUrl: '',
        },
        {
          code: 'CZK',
          value: 2,
          iconUrl: '',
        },
      ],
      crypto: [
        {
          code: 'BTC',
          value: 15000,
          iconUrl: '',
        },
        {
          code: 'ETH',
          value: 10000,
          iconUrl: '',
        },
      ],
      isEmpty: false,
    },
  },
};

type RenderWithProvidersResult = RenderResult & { store: AppStore };

export function renderWithProviders(
  ui: React.ReactElement,
  renderOptions?: Omit<RenderOptions, 'queries'>
): RenderWithProvidersResult {
  const store = setupStore(preloadedState);
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  const renderResult = render(ui, { wrapper: Wrapper, ...renderOptions });

  return { store, ...renderResult } as RenderWithProvidersResult;
}
