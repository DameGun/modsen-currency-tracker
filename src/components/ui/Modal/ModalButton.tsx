import { ModalContext } from './context';

import { ModalButtonProps } from '@/types/modal';

export default function ModalButton({ children }: ModalButtonProps) {
  return <ModalContext.Consumer>{(context) => children(context)}</ModalContext.Consumer>;
}
