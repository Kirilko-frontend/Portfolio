import { useEffect, useState } from 'react';

import { IconGitHub1, IconLink1 } from '@/icons';

import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';
import { createPortal } from 'react-dom';

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
    if (clicked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [clicked]);

  return (
    <div
      className={styles['project']}
      style={{
        alignSelf: position === 'left' ? 'flex-start' : 'flex-end',
      }}
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
