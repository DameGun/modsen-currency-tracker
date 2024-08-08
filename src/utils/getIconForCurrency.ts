import iconsPath from '@/assets/mock/icons.json';
import type { CurrencyIcon } from '@/types/currencies';

export async function getIcons(): Promise<CurrencyIcon[]> {
  const response = await fetch(iconsPath);

  return await response.json();
}

export function getIconForCurrency(
  currencyCode: string,
  icons: CurrencyIcon[]
): CurrencyIcon | undefined {
  return icons.find((value) => value.asset_id == currencyCode);
}
