import iconsFile from '@/assets/mock/icons.json';
import type { CurrencyIcon } from '@/types/currencies';

const icons: CurrencyIcon[] = JSON.parse(iconsFile);

export function getIconForCurrency(currencyCode: string): CurrencyIcon | undefined {
  return icons.find((value) => value.asset_id == currencyCode);
}
