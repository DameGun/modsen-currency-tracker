import CurrencyCard from '../CurrencyCard';

import './styles.scss';
import { CurrenciesCacheFields } from '@/types/cache';
import type { CurrencyData } from '@/types/currencies';

interface CurrenctCardListProps {
  label: CurrenciesCacheFields;
  items: CurrencyData[];
}

export default function CurrencyCardList({ label, items }: CurrenctCardListProps) {
  return (
    <div className='currency-card-list__container'>
      <div className='currency-card-list__label'>
        <h2>{label}</h2>
      </div>
      <div className='currency-card-list__items'>
        {items.map((currency) => (
          <CurrencyCard key={currency.code} {...currency} />
        ))}
      </div>
    </div>
  );
}
