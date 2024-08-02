import { MouseEventHandler, ReactNode } from 'react';
import cn from 'classnames';

import './styles.scss';

interface IconButtonProps {
  IconComponent: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function IconButton({ IconComponent, className, onClick }: IconButtonProps) {
  return (
    <button className={cn('icon-button', className)} onClick={onClick}>
      {IconComponent}
    </button>
  );
}
