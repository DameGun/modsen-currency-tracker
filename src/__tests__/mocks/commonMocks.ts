import { jest } from '@jest/globals';

jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({
    remove: jest.fn(),
    on: jest.fn(),
  })),
  Popup: jest.fn(),
}));

jest.mock('@/assets/images/bank-marker.png', () => 'mocked-image-path');
