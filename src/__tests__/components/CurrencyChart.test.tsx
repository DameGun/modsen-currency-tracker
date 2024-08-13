// src/__tests__/components/CurrencyChart.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';

import '../mocks/chartMocks';
import CurrencyChart from '@/components/containers/CurrencyChart';

describe('CurrencyChart', () => {
  const mockAttach = jest.fn();
  const mockDetach = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<CurrencyChart attach={mockAttach} detach={mockDetach} />);
    expect(screen.getByTestId('chart-container')).toBeInTheDocument();
  });

  it('attaches the observer on mount', () => {
    render(<CurrencyChart attach={mockAttach} detach={mockDetach} />);
    expect(mockAttach).toHaveBeenCalledTimes(1);
  });

  it('detaches the observer on unmount', () => {
    const { unmount } = render(<CurrencyChart attach={mockAttach} detach={mockDetach} />);
    unmount();
    expect(mockDetach).toHaveBeenCalledTimes(1);
  });
});
