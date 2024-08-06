import { ReactNode, useState } from 'react';
import cn from 'classnames';

import './styles.scss';
import { ArrowDown } from '@/assets/icons';

interface DropdownProps {
  className?: string;
  headerClassName?: string;
  listClassName?: string;
  title: string;
  children: ReactNode;
}

export default function Collapsible({
  className,
  headerClassName,
  listClassName,
  title,
  children,
}: DropdownProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  function handleCollapse() {
    setIsCollapsed((value) => !value);
  }

  return (
    <div className={cn('collapsible-container', className)}>
      <div className={cn('collapsible', headerClassName)} onClick={handleCollapse}>
        <h2>{title}</h2>
        <ArrowDown className={cn('arrow-down', { rotate: !isCollapsed })} />
      </div>
      <div className={cn({ collapsed: isCollapsed })}>
        <ul className={listClassName}>{children}</ul>
      </div>
    </div>
  );
}
