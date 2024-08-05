import { InputHTMLAttributes } from 'react';

import './styles.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: InputProps) {
  return <input className='custom-input' {...props} />;
}
