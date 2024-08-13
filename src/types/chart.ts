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

enum PointCreationResultType {
  isCreated = 'isCreated',
  isFilled = 'isFilled',
  isPointExists = 'isPointExists',
  isAleadyFilled = 'isAleadyFilled',
  isDatasetLimit = 'isDatasetLimit',
}

type PointCreationResult = {
  updatedData: ChartDataset<'candlestick'>[];
  status: PointCreationResultType;
};

export type {
  FinancialDataPointToAdd,
  FinancialDataPointToRemove,
  PointCreationResult,
  PointValidationErrors,
};

export { PointCreationResultType };
