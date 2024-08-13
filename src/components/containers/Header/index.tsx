import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import './styles.scss';
import { BurgerMenuIcon, CloseIcon, LogoIcon } from '@/assets/icons';
import { IconButton, ThemeSwitch } from '@/components/ui';
import { ROUTES } from '@/constants/routes';

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const linksClassName = ({ isActive }: { isActive: boolean }) =>
    cn('navbar__link', { active: isActive });

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
            <NavLink className={linksClassName} to={ROUTES.home} onClick={handleClose}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={linksClassName} to={ROUTES.timeline} onClick={handleClose}>
              Timeline
            </NavLink>
          </li>
          <li>
            <NavLink className={linksClassName} to={ROUTES.banksMap} onClick={handleClose}>
              Banks map
            </NavLink>
          </li>
          <li>
            <NavLink className={linksClassName} to={ROUTES.contact} onClick={handleClose}>
              Contacts
            </NavLink>
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
