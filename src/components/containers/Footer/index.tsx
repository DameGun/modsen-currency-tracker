import Dropdown from '../Dropdown';

import './styles.scss';
import LogoIcon from '@/assets/icons/logo.svg';

export default function Footer() {
  return (
    <footer>
      <div className='footer-container'>
        <div className='footer-container__info'>
          <div className='footer-container__info__header'>
            <LogoIcon className='footer-container__info__logo' />
            <h3>Modsen Currency Tracker</h3>
          </div>
          <p>
            Since then, the company has grown organically to. Starsup is the world&apos;s largest
            trading platform, with $12 billion worth of currency trading and 500,000 tickets sold
            daily to tens of thousands of traders worldwide.
          </p>
        </div>
        <div className='footer-container__nav'>
          <Dropdown
            className='footer-container__nav__section'
            headerClassName='footer-container__nav__section__header'
            listClassName='footer-container__nav__section__list'
            title='General'
          >
            <li>Market</li>
            <li>Service</li>
          </Dropdown>
          <Dropdown
            className='footer-container__nav__section'
            headerClassName='footer-container__nav__section__header'
            listClassName='footer-container__nav__section__list'
            title='Product'
          >
            <li>Sparks</li>
            <li>Snaps</li>
          </Dropdown>
          <Dropdown
            className='footer-container__nav__section'
            headerClassName='footer-container__nav__section__header'
            listClassName='footer-container__nav__section__list'
            title='Community'
          >
            <li>Ideas</li>
            <li>Streams</li>
          </Dropdown>
        </div>
        <h4 className='footer-container__copyright'>Modsen © 2023-2024, All Rights Reserved</h4>
      </div>
    </footer>
  );
}
