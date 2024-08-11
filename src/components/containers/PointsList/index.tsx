import { Component } from 'react';
import { ChartDataset } from 'chart.js';
import { DateTime } from 'luxon';
import ListPoint from '../ListPoint';

import './styles.scss';
import { Collapsible } from '@/components/ui';
import { MAX_DATASETS, MAX_POINTS_PER_DATASET } from '@/constants/chart';
import {
  type FinancialDataPointToAdd,
  type FinancialDataPointToRemove,
  PointCreationResultType,
} from '@/types/chart';
import {
  type INotifier,
  type IObservable,
  type IObserver,
  ObserveableActionType,
} from '@/types/observable';
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
    this.state = {
      data: [],
    };

    this.handleRemovePoint = this.handleRemovePoint.bind(this);
    this.handlePointCreationNotification = this.handlePointCreationNotification.bind(this);
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
      const { updatedData, status } = createPointOrDataset(this.state.data, data);
      this.setState({ data: updatedData });

      this.handlePointCreationNotification(data, status);
    }
    if (action === ObserveableActionType.deleted && isFinancialDataPointToRemove(data)) {
      this.setState({ data: deletePointOrDataset(this.state.data, data) });
    }
  }

  handleRemovePoint(value: FinancialDataPointToRemove) {
    this.props.notify(value, ObserveableActionType.deleted);
  }

  handlePointCreationNotification(data: FinancialDataPointToAdd, status: PointCreationResultType) {
    switch (status) {
      case PointCreationResultType.isAleadyFilled: {
        this.props.notify(
          `Chart for ${data.datasetLabel} currency already filled!`,
          ObserveableActionType.notify
        );
        break;
      }
      case PointCreationResultType.isFilled: {
        this.props.notify(
          `Chart for ${data.datasetLabel} currency has been created for ${MAX_POINTS_PER_DATASET} days!`,
          ObserveableActionType.notify
        );
        break;
      }
      case PointCreationResultType.isPointExists: {
        this.props.notify(
          `Point for ${data.datasetLabel} with date ${DateTime.fromMillis(data.point.x).toLocaleString()} aleady exists!`,
          ObserveableActionType.notify
        );
        break;
      }
      case PointCreationResultType.isDatasetLimit: {
        this.props.notify(
          `You cant create more currencies datasets, limit is ${MAX_DATASETS}`,
          ObserveableActionType.notify
        );
        break;
      }
    }
  }

  render() {
    return (
      <div className='points-list'>
        <h4 className='points-list__info'>Add minimum 2 points per curency</h4>
        <h4 className='points-list__info'>Maximum {MAX_DATASETS} currencies allowed</h4>
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
      </div>
    );
  }
}
