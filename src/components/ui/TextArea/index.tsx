import { TextareaHTMLAttributes } from 'react';
import cn from 'classnames';

import './styles.scss';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  resizable?: boolean;
}

export default function TextArea({ resizable = true, ...otherProps }: TextAreaProps) {
  return <textarea className={cn('custom-textarea', { resizable })} {...otherProps} />;
}
