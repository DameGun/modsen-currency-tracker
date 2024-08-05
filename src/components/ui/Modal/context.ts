import { createContext } from 'react';

import { IModalContext } from '@/types/modal';

const initialValue: IModalContext = {
  isOpen: false,
  handleOpen: () => {
    console.warn('Modal open function not implemented');
  },
  handleClose: () => {
    console.warn('Modal open function not implemented');
  },
};

export const ModalContext = createContext<IModalContext>(initialValue);
