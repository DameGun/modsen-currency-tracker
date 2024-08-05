type ConvertState = {
  baseCurrency: string;
  baseValue: number;
  convertedCurrency: string;
  convertedValue: number;
};

type ConvertRequestQuery = {
  baseCurrency: string;
  value: number;
  targetCurrency: string;
};

export type { ConvertRequestQuery, ConvertState };
