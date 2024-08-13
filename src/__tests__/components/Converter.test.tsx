import { fireEvent, screen, waitFor } from '@testing-library/react';
import { commonNumberInputTests } from '../common/numberInput.test';
import { handleSelect } from '../utils/converter';
import { renderWithProviders } from '../utils/store';

import Converter from '@/components/containers/Converter';

describe('Converter Component', () => {
  const mockTargetCurrency = 'USD';
  const mockSelectedCurrency = 'EUR';

  it('should render the converter modal with the correct target currency', async () => {
    renderWithProviders(<Converter targetCurrency={mockTargetCurrency} />);

    const allCodeOccurencies = screen.getAllByText(mockTargetCurrency);

    expect(allCodeOccurencies[0]).toBeInstanceOf(HTMLSpanElement);
  });

  it('should allow selecting a different FROM currency using the Select component', async () => {
    const { container } = renderWithProviders(<Converter targetCurrency={mockTargetCurrency} />);
    const toSection = container.querySelector('#from-select') as HTMLElement;

    expect(toSection).toBeInTheDocument();

    expect(handleSelect(toSection, mockSelectedCurrency, 'from-select')).toBeChecked();

    const button = screen.getAllByRole('combobox');

    expect(button[0].children[0].textContent).toEqual(mockSelectedCurrency);
  });

  it('should allow selecting a different TO currency using the Select component', () => {
    const { container } = renderWithProviders(<Converter targetCurrency={mockTargetCurrency} />);
    const toSection = container.querySelector('#to-select') as HTMLElement;

    expect(toSection).toBeInTheDocument();

    expect(handleSelect(toSection, mockSelectedCurrency, 'to-select')).toBeChecked();

    const button = screen.getAllByRole('combobox');

    expect(button[1].children[0].textContent).toEqual(mockSelectedCurrency);
  });

  commonNumberInputTests('Converter', <Converter targetCurrency={mockTargetCurrency} />);

  it('should convert big number correctly', async () => {
    const { container } = renderWithProviders(<Converter targetCurrency={mockTargetCurrency} />);
    const toSection = container.querySelector('#to-select') as HTMLElement;

    expect(handleSelect(toSection, mockSelectedCurrency, 'to-select')).toBeChecked();

    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    fireEvent.change(input, { target: { value: `${Number.MAX_SAFE_INTEGER * 2}` } });

    await waitFor(() => {
      const result = screen.getByRole('textbox') as HTMLInputElement;
      expect(result.value).toContain('e');
    });
  });
});
