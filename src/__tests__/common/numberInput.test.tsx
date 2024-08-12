import { ReactElement } from 'react';
import { screen } from '@testing-library/dom';
import { renderWithProviders } from '../utils/store';

export const commonNumberInputTests = (name: string, subject: ReactElement) => {
  const symbols = "~{}[]|`_^/\\@?>=<:;/-+*()&'$#@%*&";
  const letters = 'ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  describe(`Common test for ${name}`, () => {
    it('should not allow input symbols or text', () => {
      renderWithProviders(subject);

      const input = screen.getByRole('spinbutton') as HTMLInputElement;

      input.setAttribute('value', symbols);
      input.setAttribute('value', '12345');

      expect(input.value).not.toContainEqual(symbols);

      input.setAttribute('value', letters);

      expect(input.value).not.toContainEqual(letters);
    });
  });
};
