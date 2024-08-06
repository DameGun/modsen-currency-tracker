import { Component } from 'react';
import { FinancialDataPoint } from 'chart.js';
import { DateTime } from 'luxon';

import './styles.scss';
import { CloseIcon } from '@/assets/icons';
import IconButton from '@/components/ui/IconButton';
import { FinancialDataPointToRemove } from '@/types/chart';

interface ListPointProps {
  point: FinancialDataPoint;
  datasetId: number;
  pointId: number;
  onClick(value: FinancialDataPointToRemove): void;
}

export default class ListPoint extends Component<ListPointProps> {
  constructor(props: ListPointProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick({
      datasetId: this.props.datasetId,
      pointId: this.props.pointId,
    });
  }

  render() {
    return (
      <div className='point'>
        <div className='point__info'>
          <h5 className='point__info__date'>
            Date: {DateTime.fromMillis(this.props.point.x).toLocaleString()}
          </h5>
          <p className='point__info__values'>
            O: {this.props.point.o} H: {this.props.point.h} L: {this.props.point.l} C:{' '}
            {this.props.point.c}
          </p>
        </div>
        <IconButton
          IconComponent={<CloseIcon className='point__icon' />}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}
