import { RouterProvider } from 'react-router-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import '../mocks/commonMocks';
import '../mocks/chartMocks';
import { renderWithProviders } from '@/__tests__/utils/store';
import { router } from '@/utils/router';

describe('Navigation', () => {
  test('navigates to different pages', async () => {
    renderWithProviders(<RouterProvider router={router} />);

    expect(screen.getByTestId('home-page')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Banks map'));
    await waitFor(() => {
      expect(screen.getByTestId('banks-map-page')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Contacts'));
    await waitFor(() => {
      expect(screen.getByTestId('contact-page')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Home'));
    await waitFor(() => {
      expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });
  });
});
