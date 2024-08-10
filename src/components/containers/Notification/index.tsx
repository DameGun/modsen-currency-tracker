import { Component } from 'react';

import './styles.scss';
import { CloseIcon } from '@/assets/icons';
import { IconButton } from '@/components/ui';
import { NOTIFICATION_TIMEOUT } from '@/constants/chart';
import type { IObservable, IObserver } from '@/types/observable';
import { ObserveableActionType } from '@/types/observable';

interface NotificationProps extends IObservable<string> {}

interface NotificationState {
  isVisible: boolean;
  timeoutId?: NodeJS.Timeout;
  data: string;
}

export default class Notification
  extends Component<NotificationProps, NotificationState>
  implements IObserver<string>
{
  constructor(props: NotificationProps) {
    super(props);
    this.state = {
      isVisible: false,
      data: '',
    };

    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.props.attach(this);
  }

  componentWillUnmount() {
    this.props.detach(this);
    clearTimeout(this.state.timeoutId);
  }

  handleClose() {
    clearTimeout(this.state.timeoutId);

    this.setState({
      isVisible: false,
    });
  }

  update(data: string, action: ObserveableActionType) {
    if (action === ObserveableActionType.notify) {
      const timeoutId = setTimeout(() => {
        this.setState({
          isVisible: false,
        });
      }, NOTIFICATION_TIMEOUT);

      this.setState({
        isVisible: true,
        timeoutId,
        data,
      });
    }
  }

  render() {
    return (
      this.state.isVisible && (
        <div className='chart-notification'>
          <p>{this.state.data}</p>
          <IconButton
            IconComponent={<CloseIcon className='chart-notification__icon' />}
            onClick={this.handleClose}
          />
        </div>
      )
    );
  }
}
