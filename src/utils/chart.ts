import { ChartDataset, ChartOptions } from 'chart.js';

import {
  CHART_GRID_LINES_COLOR,
  CHART_TOOLTIP_BG_COLOR,
  CHART_TOOLTIP_MAIN_COLOR,
  MAX_POINTS_PER_DATASET,
} from '@/constants/chart';
import type {
  FinancialDataPointToAdd,
  FinancialDataPointToRemove,
  PointCreationResult,
} from '@/types/chart';

export const chartOptions: ChartOptions<'candlestick'> = {
  locale: 'en-US',
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: true,
      displayColors: false,
      backgroundColor: CHART_TOOLTIP_BG_COLOR,
      titleColor: CHART_TOOLTIP_MAIN_COLOR,
      bodyColor: CHART_TOOLTIP_MAIN_COLOR,
      titleFont: { weight: 'bold' },
      padding: 10,
      borderColor: CHART_TOOLTIP_MAIN_COLOR,
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Day',
        font: {
          size: 20,
        },
        align: 'end',
      },
      grid: {
        color: CHART_GRID_LINES_COLOR,
      },
      type: 'time',
      time: {
        unit: 'day',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Value',
        font: {
          size: 20,
        },
      },
      grid: {
        color: CHART_GRID_LINES_COLOR,
      },
    },
  },
};

export function createPointOrDataset(
  datasets: ChartDataset<'candlestick'>[],
  newPoint: FinancialDataPointToAdd
): PointCreationResult {
  const searchableDataset = datasets.find((val) => val.label === newPoint.datasetLabel);
  let isCompleted = false;

  if (searchableDataset) {
    const isPointForThisDateExists = searchableDataset.data.find(
      (point) => point.x === newPoint.point.x
    );
    const isNotCompleted = searchableDataset.data.length + 1 <= MAX_POINTS_PER_DATASET;
    isCompleted = searchableDataset.data.length + 1 === MAX_POINTS_PER_DATASET;

    if (!isPointForThisDateExists && isNotCompleted) {
      searchableDataset.data.push(newPoint.point);
    }
  } else {
    const newDataset: ChartDataset<'candlestick'> = {
      label: newPoint.datasetLabel,
      data: [newPoint.point],
    };
    datasets.push(newDataset);
  }

  return { updatedData: datasets, isCompleted };
}

export function deletePointOrDataset(
  datasets: ChartDataset<'candlestick'>[],
  value: FinancialDataPointToRemove
) {
  const { datasetId, pointId } = value;

  if (datasets[datasetId].data.length === 1) {
    datasets.splice(datasetId, 1)[0];
  } else {
    datasets[datasetId].data.splice(pointId, 1)[0];
  }

  return datasets;
}

export function isFinancialDataPointToAdd(value: unknown): value is FinancialDataPointToAdd {
  return (
    (value as FinancialDataPointToAdd).point !== undefined &&
    (value as FinancialDataPointToAdd).datasetLabel !== undefined
  );
}

export function isFinancialDataPointToRemove(value: unknown): value is FinancialDataPointToRemove {
  return (
    (value as FinancialDataPointToRemove).datasetId !== undefined &&
    (value as FinancialDataPointToRemove).pointId !== undefined
  );
}
