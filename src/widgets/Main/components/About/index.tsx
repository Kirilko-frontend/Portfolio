import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import useReveal from '@shared/hooks/useReveal';
import useTypewriter from '@shared/hooks/useTypewriter';

import Card from './components/Card';

import styles from './styles.module.scss';

const About = () => {
  const { t, i18n, ready } = useTranslation();
  const { ref, isVisible } = useReveal();
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (!ready) return;

    const newLines = [
      t('about.title1') || '',
      t('about.title2') || '',
      t('about.title3') || '',
      t('about.title4') || '',
    ];

    setLines(newLines);
  }, [t, i18n.language, ready]);

  const { displayedLines } = useTypewriter(lines, 50);

  return (
    <section
      id="about"
      className={`${styles['about']} section reveal ${isVisible ? 'reveal--visible' : ''}`}
      ref={ref}
    >
      <div className={styles['about__description']}>
        {displayedLines.map((line, index) => {
          return (
            <h1
              key={index}
              className={styles['about__description-title']}
              dangerouslySetInnerHTML={{ __html: line }}
            />
          );
        })}
      </div>
      <Card className={styles['about__card']} />
    </section>
  );
};

export default About;
