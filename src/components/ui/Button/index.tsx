import { ButtonHTMLAttributes, Component } from 'react';
import cn from 'classnames';

import './styles.scss';

export default class Button extends Component<ButtonHTMLAttributes<HTMLButtonElement>> {
  constructor(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    super(props);
  }

  render() {
    return <button {...this.props} className={cn('custom-button', this.props.className)} />;
  }
}
