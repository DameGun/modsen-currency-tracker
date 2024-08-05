import { useState } from 'react';
import { ModalContext } from './context';

import { ModalChildren } from '@/types/modal';

interface ModalProps {
  children: ModalChildren;
}

export default function Modal({ children }: ModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    event.stopPropagation();
    setIsOpen(false);
  }

  return (
    <ModalContext.Provider value={{ isOpen, handleOpen, handleClose }}>
      {children.map((child) => child)}
    </ModalContext.Provider>
  );
}
