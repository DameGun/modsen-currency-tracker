import { jest } from '@jest/globals';

import './chartjs-chart-financial';
import './charts';

jest.mock('chart.js');
jest.mock('chartjs-chart-financial');
jest.mock('chartjs-adapter-luxon', () => ({}), { virtual: true });
