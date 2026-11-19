import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { IconArrow1, IconGitHub1 } from '@shared/icons';

import styles from './styles.module.scss';

interface IProps {
  index: number;
  total: number;
  title: string;
  date: string;
  description: string;
  linkGithub: string;
  linkDemo: string;
  preview: string;
  poster: string;
  onOpen: () => void;
}

// Описание в переводах: «Текст; стек технологий: A, B, C» — отделяем стек
const parseDescription = (text: string) => {
  const [description, stackPart = ''] = text.split(';');
  const stack = stackPart.includes(':') ? stackPart.slice(stackPart.indexOf(':') + 1) : stackPart;

  return {
    description: description.trim(),
    stack: stack
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
  };
};

const Project = (props: IProps) => {
  const { index, total, title, date, description, linkGithub, linkDemo, preview, poster, onOpen } = props;
  const { t } = useTranslation();

  const videoRef = useRef<HTMLVideoElement>(null);
  const { description: text, stack } = parseDescription(description);

  // Производительность: видео не грузится, пока карточка далеко от экрана,
  // и проигрывается только пока его видно
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isVisible = false;
    const tryPlay = () => {
      if (isVisible && video.getAttribute('src')) video.play().catch(() => {});
    };

    const loader = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        video.src = preview;
        loader.disconnect();
        tryPlay();
      },
      { rootMargin: '50% 50%' }
    );

    const player = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) tryPlay();
        else video.pause();
      },
      { threshold: 0.25 }
    );

    loader.observe(video);
    player.observe(video);

    return () => {
      loader.disconnect();
      player.disconnect();
    };
  }, [preview]);

  return (
    <article className={styles['project']} data-project>
      <button
        type="button"
        className={styles['project__media']}
        onClick={onOpen}
        data-cursor={t('portfolio.play')}
        aria-label={`${t('portfolio.play')}: ${title}`}
      >
        <span className={styles['project__parallax']} data-parallax>
          <video
            ref={videoRef}
            className={styles['project__video']}
            poster={poster}
            loop
            muted
            playsInline
            preload="none"
          />
        </span>
        <span className={styles['project__shade']} aria-hidden="true" />
      </button>

      <div className={styles['project__info']}>
        <div className={styles['project__top']}>
          <span className={styles['project__index']}>
            {String(index + 1).padStart(2, '0')}
            <span>/{String(total).padStart(2, '0')}</span>
          </span>
          <span className={styles['project__date']}>{t(date)}</span>
        </div>

        <h3 className={styles['project__title']}>{title}</h3>
        <p className={styles['project__description']}>{text}</p>

        {stack.length > 0 && (
          <ul className={styles['project__stack']} aria-label={t('portfolio.stack')}>
            {stack.map((tech) => (
              <li key={tech} className={styles['project__tag']}>
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className={styles['project__links']}>
          <a
            className={`${styles['project__link']} ${styles['project__link--primary']}`}
            href={linkDemo}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('portfolio.live')}
            <IconArrow1 className={styles['project__link-icon']} />
          </a>
          <a
            className={styles['project__link']}
            href={linkGithub}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconGitHub1 className={styles['project__link-icon']} />
            {t('portfolio.code')}
          </a>
        </div>
      </div>
    </article>
  );
};

export default Project;
