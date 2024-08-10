import { ReactNode } from 'react';
import cn from 'classnames';

import './styles.scss';

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ title, className, children }: SectionProps) {
  return (
    <div className={cn('section', { className })}>
      <h1 className='section__title'>{title}</h1>
      {children}
    </div>
  );
}
