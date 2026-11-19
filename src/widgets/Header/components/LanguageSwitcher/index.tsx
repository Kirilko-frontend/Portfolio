import type { CSSProperties } from 'react';

import styles from './styles.module.scss';

interface IProps {
  languages: string[];
  activeLanguage: string;
  onSelect: (lang: string) => void;
  className?: string;
}

/**
 * Сегментированный переключатель языков: одна «пилюля» и скользящий индикатор под активным языком.
 */
const LanguageSwitcher = (props: IProps) => {
  const { languages, activeLanguage, onSelect, className = '' } = props;

  const activeIndex = Math.max(
    0,
    languages.findIndex((lang) => activeLanguage.startsWith(lang))
  );

  return (
    <div
      className={`${styles['switcher']} ${className}`}
      style={{ '--count': languages.length, '--index': activeIndex } as CSSProperties}
      role="group"
      aria-label="Language"
    >
      <span className={styles['switcher__indicator']} aria-hidden="true" />
      {languages.map((lang, index) => (
        <button
          key={lang}
          type="button"
          className={`${styles['switcher__item']} ${index === activeIndex ? styles['switcher__item--active'] : ''}`}
          onClick={() => onSelect(lang)}
          aria-pressed={index === activeIndex}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
