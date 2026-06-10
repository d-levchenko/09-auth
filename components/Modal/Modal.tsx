import { createPortal } from 'react-dom';

import css from './Modal.module.css';
import useModalHook from '@/hooks/useModalHook';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  const { backdropProps } = useModalHook({ onClose });

  return createPortal(
    <div className={css.backdrop} {...backdropProps}>
      <div className={css.modal}>{children}</div>
    </div>,
    document.body,
  );
};

export default Modal;
