import { fireEvent, screen } from '@testing-library/react';

export function handleSelect(
  select: HTMLElement,
  clickValue: string,
  elementId: string
): HTMLElement {
  fireEvent.click(select);

  const option = screen
    .getAllByDisplayValue(clickValue)
    .filter((elem) => elem.id === elementId + clickValue);

  fireEvent.click(option[0]);

  return option[0];
}
