import './styles.scss';
import { LogoIcon } from '@/assets/icons';

export default function Banner() {
  return (
    <div className='banner'>
      <div className='banner__info'>
        <h1 className='banner__info__title'>Modsen Currency Tracker</h1>
        <p className='banner__info__quote'>
          Quotes for the dollar and other international currencies.
        </p>
      </div>
      <LogoIcon className='banner__logo' />
    </div>
  );
}
