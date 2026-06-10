import { useEffect } from 'react';

interface UseModalHookProps {
  onClose: () => void;
}

const useModalHook = ({ onClose }: UseModalHookProps) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return {
    backdropProps: {
      onClick: handleBackdropClick,
      role: 'dialog',
      'aria-modal': true,
    },
  };
};

export default useModalHook;
