import type { ElementType } from 'react';
import { useTranslation } from 'react-i18next';

import { languages } from '@shared/config/languages';

import styles from './styles.module.scss';

interface IProps {
  /** Ключ перевода */
  k: string;
  as?: ElementType;
  className?: string;
  align?: 'start' | 'center';
}

/**
 * Текст, который всегда занимает место самого длинного из переводов.
 * Невидимые копии на других языках лежат в той же ячейке грида,
 * поэтому при смене языка ширина/высота блока не меняется и вёрстка не прыгает.
 */
const StableText = ({ k, as: Tag = 'span', className = '', align = 'start' }: IProps) => {
  const { t, i18n } = useTranslation();

  const ghosts = languages.filter(
    (lng) => !i18n.language?.startsWith(lng) && i18n.hasResourceBundle(lng, 'translation')
  );

  return (
    <Tag className={`${styles['stable']} ${styles[`stable--${align}`]} ${className}`}>
      <span>{t(k)}</span>
      {ghosts.map((lng) => (
        <span key={lng} className={styles['stable__ghost']} aria-hidden="true">
          {i18n.getFixedT(lng)(k)}
        </span>
      ))}
    </Tag>
  );
};

export default StableText;
