import { ChartDataset, FinancialDataPoint } from 'chart.js';

type FinancialDataPointToAdd = {
  point: FinancialDataPoint;
  datasetLabel: string;
};

type FinancialDataPointToRemove = {
  datasetId: number;
  pointId: number;
};

type PointValidationErrors = {
  [key in keyof FinancialDataPoint]: boolean;
} & {
  currency: boolean;
};

type PointCreationResult = {
  updatedData: ChartDataset<'candlestick'>[];
  isCompleted: boolean;
};

export type {
  FinancialDataPointToAdd,
  FinancialDataPointToRemove,
  PointCreationResult,
  PointValidationErrors,
};
