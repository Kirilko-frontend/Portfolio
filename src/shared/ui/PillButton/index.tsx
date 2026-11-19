import type { MouseEvent, ReactNode } from 'react';

import styles from './styles.module.scss';

interface IProps {
  children: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  variant?: 'primary' | 'ghost';
  size?: 'md' | 'lg';
  icon?: ReactNode;
  external?: boolean;
  className?: string;
}

/**
 * Кнопка-«пилюля» с эффектом прокрутки текста при наведении.
 * Рендерит <a>, если передан href, иначе <button>.
 */
const PillButton = (props: IProps) => {
  const {
    children,
    href,
    onClick,
    variant = 'primary',
    size = 'md',
    icon,
    external = false,
    className = '',
  } = props;

  const classes = [styles['pill'], styles[`pill--${variant}`], styles[`pill--${size}`], className].join(
    ' '
  );

  const content = (
    <>
      <span className={styles['pill__fill']} aria-hidden="true" />
      <span className={styles['pill__label']}>
        <span className={styles['pill__text']}>{children}</span>
        <span className={styles['pill__text']} aria-hidden="true">
          {children}
        </span>
      </span>
      {icon && <span className={styles['pill__icon']}>{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {content}
    </button>
  );
};

export default PillButton;
