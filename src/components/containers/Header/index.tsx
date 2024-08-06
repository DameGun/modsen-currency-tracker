import { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import './styles.scss';
import { BurgerMenuIcon, CloseIcon, LogoIcon } from '@/assets/icons';
import { IconButton, ThemeSwitch } from '@/components/ui';
import { ROUTES } from '@/constants/routes';

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <header>
      <LogoIcon className='logo-icon' />
      <nav className={cn('navbar', { isMenu: isOpen }, { 'prevent-overflow': isOpen })}>
        <ul className={cn('navbar__links-list', { isMenu: isOpen })}>
          <li>
            <Link className='navbar__link' to={ROUTES.home} onClick={handleClose}>
              Home
            </Link>
          </li>
          <li>
            <Link className='navbar__link' to={ROUTES.timeline} onClick={handleClose}>
              Timeline
            </Link>
          </li>
          <li>
            <Link className='navbar__link' to={ROUTES.banksMap} onClick={handleClose}>
              Banks map
            </Link>
          </li>
          <li>
            <Link className='navbar__link' to={ROUTES.contact} onClick={handleClose}>
              Contacts
            </Link>
          </li>
        </ul>
      </nav>
      <ThemeSwitch />
      {isOpen ? (
        <IconButton
          IconComponent={<CloseIcon className='navbar__burger-menu-button__icon' />}
          className='navbar__burger-menu-button'
          onClick={handleClose}
        />
      ) : (
        <IconButton
          IconComponent={<BurgerMenuIcon className='navbar__burger-menu-button__icon' />}
          className='navbar__burger-menu-button'
          onClick={handleOpen}
        />
      )}
    </header>
  );
}
