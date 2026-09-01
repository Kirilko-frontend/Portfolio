import { createPortal } from 'react-dom';
import { useEffect, useRef, useState, type MouseEvent } from 'react';

import { IconCross1, IconGitHub1, IconLink1 } from '@shared/icons';

import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

interface IProps {
  id: number;
  title: string;
  date: string;
  linkGithub: string;
  linkDemo: string;
  preview: string;
  position: 'left' | 'right';
  delay?: number;
}

const modalRoot = document.getElementById('modal-root');

const Project = (props: IProps) => {
  const { id, title, date, linkGithub, linkDemo, preview, position, delay } = props;

  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && modalVideoRef.current) {
      modalVideoRef.current.play().catch(() => {});
    }

    if (!isOpen && modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
  }, [isOpen]);

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className={`${styles['project']} ${position === 'left' ? styles['left'] : styles['right']} reveal-item ${delay ? `delay-${delay}` : ''}`}
    >
      <div className={styles['project__wrapper']}>
        <h2 className={styles['project__title']}>{title}</h2>
        <p className={styles['project__description']}>{t(`portfolio.project${id}-description`)}</p>
        <div className={styles['project__date-wrapper']}>
          <p className={styles['project__date']}>{t(date)}</p>
        </div>
        <div className={styles['project__links']}>
          <a
            className={styles['project__link']}
            href={linkGithub}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconGitHub1 className={styles['project__link-icon']} />
          </a>
          <a
            className={styles['project__link']}
            href={linkDemo}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconLink1 className={styles['project__link-icon']} />
          </a>
        </div>
      </div>
      <div className={styles['project__preview-wrapper']}>
        <video
          onClick={openModal}
          className={styles['project__preview']}
          src={preview}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      </div>
      {modalRoot &&
        createPortal(
          <div
            className={`${styles['project__modal']} ${isOpen ? styles['open'] : styles['closed']}`}
            onClick={handleOverlayClick}
          >
            <button className={styles['project__close--btn']} onClick={closeModal}>
              <IconCross1 className={styles['project__close--icon']} />
            </button>
            <div className={styles['project__modal-wrapper']} onClick={(e) => e.stopPropagation()}>
              <video
                ref={modalVideoRef}
                className={styles['project__modal-preview']}
                src={preview}
                preload="auto"
                autoPlay
                playsInline
                muted
                loop
              />
            </div>
          </div>,
          modalRoot
        )}
    </div>
  );
};

export default Project;
