import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

import { IconCross1, IconGitHub1, IconLink1 } from '@/icons';

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
}

const Project = (props: IProps) => {
  const { id, title, date, linkGithub, linkDemo, preview, position } = props;

  const { t } = useTranslation();

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  const handleClose = () => {
    setClicked(false);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setClicked(false);
      }
    };

    if (clicked) {
      window.addEventListener('keydown', handleKey);
    }

    if (clicked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [clicked]);

  return (
    <div
      className={`${styles['project']} ${position === 'left' ? styles['left'] : styles['right']}`}
    >
      <div className={styles['project__wrappper']}>
        <h1 className={styles['project__title']}>{title}</h1>
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
          onClick={handleClick}
          className={styles['project__preview']}
          src={preview}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      {clicked &&
        createPortal(
          <div className={styles['project__modal']} onClick={handleClose}>
            <button className={styles['project__close--btn']} onClick={handleClose}>
              <IconCross1 className={styles['project__close--icon']} />
            </button>
            <div className={styles['project__modal-wrapper']} onClick={(e) => e.stopPropagation()}>
              <video
                className={styles['project__modal-preview']}
                src={preview}
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>,
          document.getElementById('modal-root')!
        )}
    </div>
  );
};

export default Project;
