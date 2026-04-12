import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

const lines = [
  '> system.connect(developer)',
  '> initializing...',
  '> status: available',
  '> location: Poland',
  '> role: Frontend Developer',
  '> contact.methods:',
];

const Contact = () => {
  const { t } = useTranslation();

  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= lines.length) return;

    const currentText = lines[lineIndex];

    const timeout = setTimeout(() => {
      setCurrentLine((prev) => prev + currentText[charIndex]);
      setCharIndex((prev) => prev + 1);
    }, 30); // скорость печати

    if (charIndex === currentText.length) {
      setTimeout(() => {
        setDisplayedLines((prev) => [...prev, currentText]);
        setCurrentLine('');
        setCharIndex(0);
        setLineIndex((prev) => prev + 1);
      }, 200); // пауза между строками
    }

    return () => clearTimeout(timeout);
  }, [charIndex, lineIndex]);

  return (
    <section id="contact" className={`${styles['contact']} section`}>
      <h2 className={styles['contact__title']}>{t('contact.title')}</h2>

      <div className={styles['terminal']}>
        {displayedLines.map((line, index) => (
          <p key={index} className={styles['line']}>
            {line}
          </p>
        ))}

        {/* текущая печатаемая строка */}
        {lineIndex < lines.length && (
          <p className={styles['line']}>
            {currentLine}
            <span className={styles['cursor']}>|</span>
          </p>
        )}

        {/* контакты после печати */}
        {lineIndex === lines.length && (
          <>
            <div className={styles['methods']}>
              <a href="mailto:you@email.com">email()</a>
              <a href="https://t.me/yourname" target="_blank">
                telegram()
              </a>
              <a href="https://github.com/yourname" target="_blank">
                github()
              </a>
              <a href="https://linkedin.com/in/yourname" target="_blank">
                linkedin()
              </a>
            </div>

            <button
              className={styles['cta']}
              onClick={() => (window.location.href = 'mailto:you@email.com')}
            >
              Initiate Connection
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Contact;
