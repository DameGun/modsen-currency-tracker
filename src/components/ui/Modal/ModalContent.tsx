import { useContext } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import { ModalContext } from './context';

import './styles.scss';
import { ModalContentProps } from '@/types/modal';

export default function ModalContent({ children }: ModalContentProps) {
  const { isOpen, handleClose } = useContext(ModalContext);

  return (
    isOpen &&
    createPortal(
      <div className={cn('modal', { 'prevent-overflow': isOpen })}>
        <div className='modal__overlay' onClick={handleClose} />
        <div className='modal__container'>{children.map((child) => child)}</div>
      </div>,
      document.body
    )
  );
}
