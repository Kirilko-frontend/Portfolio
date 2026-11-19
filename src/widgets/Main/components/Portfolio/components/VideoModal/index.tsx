import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { lockScroll, unlockScroll } from '@shared/lib/lenis';

import { IconCross1 } from '@shared/icons';

import styles from './styles.module.scss';

interface IProps {
  src: string | null;
  title: string;
  onClose: () => void;
}

const modalRoot = document.getElementById('modal-root');

/**
 * Полноэкранный просмотр видео проекта. Закрывается по Esc, клику по фону или кнопке.
 */
const VideoModal = ({ src, title, onClose }: IProps) => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isOpen = Boolean(src);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    lockScroll();
    window.addEventListener('keydown', handleKeyDown);
    videoRef.current?.play().catch(() => {});

    return () => {
      unlockScroll();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!modalRoot) return null;

  return createPortal(
    <div
      className={`${styles['modal']} ${isOpen ? styles['modal--open'] : ''}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      aria-hidden={!isOpen}
    >
      <button type="button" className={styles['modal__close']} onClick={onClose}>
        {t('portfolio.close')}
        <IconCross1 className={styles['modal__close-icon']} />
      </button>

      {src && (
        <div className={styles['modal__frame']}>
          <video
            ref={videoRef}
            className={styles['modal__video']}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            controls
          />
          <p className={styles['modal__title']}>{title}</p>
        </div>
      )}
    </div>,
    modalRoot
  );
};

export default VideoModal;
