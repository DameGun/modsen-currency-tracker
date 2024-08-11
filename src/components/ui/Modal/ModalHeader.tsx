import { useContext } from 'react';
import { ModalContext } from './context';

import { CloseIcon } from '@/assets/icons';
import { IconButton } from '@/components/ui';
import { ModalHeaderProps } from '@/types/modal';

export default function ModalHeader({ title }: ModalHeaderProps) {
  const { handleClose } = useContext(ModalContext);

  return (
    <div className='modal__header'>
      {title}
      <IconButton
        className='modal__header__close-button'
        IconComponent={<CloseIcon className='modal__header__close-icon' />}
        onClick={handleClose}
      />
    </div>
  );
}
