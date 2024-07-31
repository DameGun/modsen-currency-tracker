import { MouseEventHandler, ReactNode } from 'react';

import './styles.scss';

interface IconButtonProps {
  IconComponent: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function IconButton({ IconComponent, className, onClick }: IconButtonProps) {
  return (
    <button className={`icon-button ${className ? className : ''}`} onClick={onClick}>
      {IconComponent}
    </button>
  );
}
