import { Component } from 'react';

import './styles.scss';
import { CloseIcon } from '@/assets/icons';
import { IconButton } from '@/components/ui';
import { NOTIFICATION_TIMEOUT } from '@/constants/misc';
import type { IObservable, IObserver } from '@/types/observable';
import { ObserveableActionType } from '@/types/observable';

interface ChartNotificationProps extends IObservable<string> {}

interface ChartNotificationState {
  isVisible: boolean;
  timeoutId?: NodeJS.Timeout;
  currencyLabel: string;
}

export default class ChartNotification
  extends Component<ChartNotificationProps, ChartNotificationState>
  implements IObserver<string>
{
  constructor(props: ChartNotificationProps) {
    super(props);
    this.state = {
      isVisible: false,
      currencyLabel: '',
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
    if (action === ObserveableActionType.completed) {
      const timeoutId = setTimeout(() => {
        this.setState({
          isVisible: false,
        });
      }, NOTIFICATION_TIMEOUT);

      this.setState({
        isVisible: true,
        timeoutId,
        currencyLabel: data,
      });
    }
  }

  render() {
    return (
      this.state.isVisible && (
        <div className='chart-notification'>
          <p>
            Chart for <b>{this.state.currencyLabel}</b> currency has been created for 30 days!
          </p>
          <IconButton
            IconComponent={<CloseIcon className='chart-notification__icon' />}
            onClick={this.handleClose}
          />
        </div>
      )
    );
  }
}
