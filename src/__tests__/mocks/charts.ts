import { jest } from '@jest/globals';

const Chart = {
  register: jest.fn(),
};

export default {
  Chart,
  Legend: jest.fn(),
  LinearScale: jest.fn(),
  TimeSeriesScale: jest.fn(),
  Tooltip: jest.fn(),
};
