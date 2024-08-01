import './styles.scss';

export default function CurrencyCard() {
  return (
    <div className='currency-card'>
      <h1>icon</h1>
      <div className='currency-card__info'>
        <h4 className='currency-card__info__name'>BoveSpa Index</h4>
        <p className='currency-card__info__rate'>0.15%</p>
      </div>
    </div>
  );
}
