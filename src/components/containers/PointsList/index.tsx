import { Component } from 'react';
import { ChartDataset } from 'chart.js';
import ListPoint from '../ListPoint';

import './styles.scss';
import { Collapsible } from '@/components/ui';
import type { FinancialDataPointToAdd, FinancialDataPointToRemove } from '@/types/chart';
import type { INotifier, IObservable, IObserver } from '@/types/observable';
import { ObserveableActionType } from '@/types/observable';
import {
  createPointOrDataset,
  deletePointOrDataset,
  isFinancialDataPointToAdd,
  isFinancialDataPointToRemove,
} from '@/utils/chart';

interface PointsListProps
  extends IObservable<FinancialDataPointToAdd | FinancialDataPointToRemove>,
    INotifier<FinancialDataPointToAdd | FinancialDataPointToRemove | string> {}

interface PointsListState {
  data: ChartDataset<'candlestick'>[];
}

export default class PointsList
  extends Component<PointsListProps, PointsListState>
  implements IObserver<FinancialDataPointToAdd | FinancialDataPointToRemove>
{
  constructor(props: PointsListProps) {
    super(props);
    this.handleRemovePoint = this.handleRemovePoint.bind(this);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.props.attach(this);
  }

  componentWillUnmount() {
    this.props.detach(this);
  }

  update(
    data: FinancialDataPointToAdd | FinancialDataPointToRemove,
    action: ObserveableActionType
  ) {
    if (action === ObserveableActionType.created && isFinancialDataPointToAdd(data)) {
      const { updatedData, isCompleted } = createPointOrDataset(this.state.data, data);
      this.setState({ data: updatedData });

      if (isCompleted) {
        this.props.notify(data.datasetLabel, ObserveableActionType.completed);
      }
    }
    if (action === ObserveableActionType.deleted && isFinancialDataPointToRemove(data)) {
      this.setState({ data: deletePointOrDataset(this.state.data, data) });
    }
  }

  handleRemovePoint(value: FinancialDataPointToRemove) {
    this.props.notify(value, ObserveableActionType.deleted);
  }

  render() {
    return (
      <div className='points-list__container'>
        {this.state.data &&
          this.state.data.map((dataset, datasetId) => (
            <Collapsible
              key={dataset.label}
              title={dataset.label ? dataset.label : 'Undefined currency'}
              className='points-list__section'
              headerClassName='points-list__section__label'
              listClassName='points-list__section__points'
            >
              {dataset.data.map((point, pointId) => (
                <ListPoint
                  key={point.x}
                  point={point}
                  pointId={pointId}
                  datasetId={datasetId}
                  onClick={this.handleRemovePoint}
                />
              ))}
            </Collapsible>
          ))}
      </div>
    );
  }
}
