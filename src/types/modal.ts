import { ReactElement, ReactNode } from 'react';

interface ModalBodyProps {
  children: ReactNode;
}

interface ModalButtonProps {
  children: (context: IModalContext) => ReactNode;
}

interface ModalContentProps {
  children: ModalContentChildren;
}

interface ModalHeaderProps {
  title: string;
}

interface IModalContext {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

type ModalChildren = [ReactElement<ModalButtonProps>, ReactElement<ModalContentProps>];

type ModalContentChildren = [ReactElement<ModalHeaderProps>, ReactElement<ModalBodyProps>];

export type {
  IModalContext,
  ModalBodyProps,
  ModalButtonProps,
  ModalChildren,
  ModalContentChildren,
  ModalContentProps,
  ModalHeaderProps,
};
