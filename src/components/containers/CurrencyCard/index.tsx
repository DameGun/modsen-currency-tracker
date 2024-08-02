import './styles.scss';
import { CurrencyData } from '@/types/currencies';

interface CurrencyCardProps extends CurrencyData {}

export default function CurrencyCard({ code, value, iconUrl }: CurrencyCardProps) {
  return (
    <div className='currency-card'>
      <img className='currency-card__icon' src={iconUrl} alt={`${name}-icon`} />
      <div className='currency-card__info'>
        <h4 className='currency-card__info__name'>{code}</h4>
        <p className='currency-card__info__rate'>$ {value}</p>
      </div>
    </div>
  );
}
