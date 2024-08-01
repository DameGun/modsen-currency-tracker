import CurrencyCard from '../CurrencyCard';

import './styles.scss';

interface CurrenctCardListProps {
  label: string;
}

export default function CurrencyCardList({ label }: CurrenctCardListProps) {
  return (
    <div className='currency-card-list__container'>
      <div className='currency-card-list__label'>
        <h2>{label}</h2>
      </div>
      <div className='currency-card-list__items'>
        <CurrencyCard key={1} />
        <CurrencyCard key={2} />
        <CurrencyCard key={3} />
        <CurrencyCard key={4} />
        <CurrencyCard key={5} />
        <CurrencyCard key={6} />
        <CurrencyCard key={7} />
      </div>
    </div>
  );
}
