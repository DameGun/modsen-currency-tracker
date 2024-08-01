import { ReactNode, useState } from 'react';

import './styles.scss';
import ArrowDown from '@/assets/icons/arrow-down.svg';

interface DropdownProps {
  className?: string;
  headerClassName?: string;
  listClassName?: string;
  title: string;
  children: ReactNode;
}

export default function Dropdown({
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
    <div className={`collapsible-container ${className}`}>
      <div className={`${headerClassName} collapsible`} onClick={handleCollapse}>
        <h2>{title}</h2>
        <ArrowDown className={`arrow-down ${!isCollapsed ? 'rotate' : ''}`} />
      </div>
      <div className={isCollapsed ? 'collapsed' : ''}>
        <ul className={listClassName}>{children}</ul>
      </div>
    </div>
  );
}
