import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

interface Props {
  lines: string[];
  methods: Array<{
    id: number;
    title: string;
    href: string;
  }>;
}

const Terminal = ({ lines, methods }: Props) => {
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
    }, 30);

    if (charIndex === currentText.length) {
      setTimeout(() => {
        setDisplayedLines((prev) => [...prev, currentText]);
        setCurrentLine('');
        setCharIndex(0);
        setLineIndex((prev) => prev + 1);
      }, 200);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, lineIndex, lines]);

  return (
    <div className={styles['terminal']}>
      {displayedLines.map((line, index) => (
        <p key={index} className={styles['terminal__line']}>
          {line}
        </p>
      ))}

      {lineIndex < lines.length && (
        <p className={styles['terminal__line']}>
          {currentLine}
          <span className={styles['terminal__cursor']}>|</span>
        </p>
      )}

      {lineIndex === lines.length && (
        <>
          <div className={styles['terminal__methods']}>
            {methods.map((method) => (
              <a
                key={method.id}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['terminal__method']}
              >
                {method.title}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Terminal;
