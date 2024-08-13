import { TextDecoder, TextEncoder } from 'util';

import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import 'whatwg-fetch';

global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;
global.TextEncoder = TextEncoder as unknown as typeof global.TextEncoder;

global.Request = Request;

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
