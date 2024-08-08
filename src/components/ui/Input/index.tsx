import { InputHTMLAttributes, ReactNode } from 'react';

import './styles.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  IconComponent?: ReactNode;
}

export default function Input({ IconComponent, ...otherProps }: InputProps) {
  return (
    <>
      <input className='custom-input' {...otherProps} />
      {IconComponent}
    </>
  );
}
