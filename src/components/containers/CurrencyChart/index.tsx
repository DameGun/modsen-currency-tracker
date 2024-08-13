import { Component, createRef, type RefObject } from 'react';
import { Chart, Legend, LinearScale, TimeSeriesScale, Tooltip } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';

import 'chartjs-adapter-luxon';
import './styles.scss';
import type { FinancialDataPointToAdd, FinancialDataPointToRemove } from '@/types/chart';
import { type IObservable, type IObserver, ObserveableActionType } from '@/types/observable';
import {
  chartOptions,
  createPointOrDataset,
  deletePointOrDataset,
  isFinancialDataPointToAdd,
  isFinancialDataPointToRemove,
} from '@/utils/chart';

Chart.register(
  CandlestickController,
  TimeSeriesScale,
  LinearScale,
  CandlestickElement,
  Tooltip,
  Legend
);

interface CurrencyChartProps
  extends IObservable<FinancialDataPointToAdd | FinancialDataPointToRemove> {}

export default class CurrencyChart
  extends Component<CurrencyChartProps>
  implements IObserver<FinancialDataPointToAdd | FinancialDataPointToRemove>
{
  private chartRef: RefObject<HTMLCanvasElement>;
  private chart: Chart<'candlestick'> | null;

  constructor(props: CurrencyChartProps) {
    super(props);
    this.chart = null;
    this.chartRef = createRef();
  }

  componentDidMount() {
    this.createChart();
    this.props.attach(this);
  }

  componentWillUnmount() {
    this.destroyChart();
    this.props.detach(this);
  }

  update(
    data: FinancialDataPointToAdd | FinancialDataPointToRemove,
    action: ObserveableActionType
  ) {
    if (this.chart) {
      if (action === ObserveableActionType.created && isFinancialDataPointToAdd(data)) {
        createPointOrDataset(this.chart.data.datasets, data);
      }
      if (action === ObserveableActionType.deleted && isFinancialDataPointToRemove(data)) {
        deletePointOrDataset(this.chart.data.datasets, data);
      }
      this.chart.update();
    }
  }

  createChart() {
    if (this.chartRef.current) {
      const chart = new Chart(this.chartRef.current, {
        type: 'candlestick',
        data: {
          datasets: [],
        },
        options: chartOptions,
      });

      this.chart = chart;
    }
  }

  destroyChart() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  render() {
    return (
      <div className='chart-container' data-testid='chart-container'>
        <canvas ref={this.chartRef} />
      </div>
    );
  }
}
