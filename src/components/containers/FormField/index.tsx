import { Component, ReactNode } from 'react';
import cn from 'classnames';

import './styles.scss';

interface FormFieldProps {
  className?: string;
  isValidationFailed: boolean;
  errorText: string;
  children: ReactNode;
}

export default class FormField extends Component<FormFieldProps> {
  constructor(props: FormFieldProps) {
    super(props);
  }

  render() {
    return (
      <div className={cn('form-field', this.props.className)}>
        {this.props.children}
        <p
          className={cn('form-field__error-text', {
            invalid: this.props.isValidationFailed,
          })}
        >
          {this.props.errorText}
        </p>
      </div>
    );
  }
}
