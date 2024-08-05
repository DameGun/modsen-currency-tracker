import { ModalBodyProps } from '@/types/modal';

export default function ModalBody({ children }: ModalBodyProps) {
  return <div className='modal__body'>{children}</div>;
}
