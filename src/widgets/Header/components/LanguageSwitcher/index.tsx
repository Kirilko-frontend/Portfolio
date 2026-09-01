import Button from '@shared/ui/Button';

import styles from './styles.module.scss';

interface IProps {
  languages: string[];
  activeLanguage: string;
  onSelect: (lang: string) => void;
}

const LanguageSwitcher = (props: IProps) => {
  const { languages, activeLanguage, onSelect } = props;

  return (
    <div className={styles['language-switcher']}>
      {languages.map((lang) => (
        <Button key={lang} onClick={() => onSelect(lang)} size="small" active={activeLanguage === lang}>
          {lang.toUpperCase()}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;