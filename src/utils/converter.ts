import type { KeyboardEvent } from 'react';

export function blockInvalidCharacter(e: KeyboardEvent<HTMLInputElement>) {
  return ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
}
