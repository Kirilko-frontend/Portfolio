import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

interface Props {
  lines: string[];
  methods: Array<{
    id: number;
    title: string;
    href: string;
  }>;
  start: boolean;
}

const Terminal = ({ lines, methods, start }: Props) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  // старт только один раз
  useEffect(() => {
    if (!start || hasStarted) return;

    const timeout = setTimeout(() => {
      setHasStarted(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, [start, hasStarted]);

  // typing логика (ОДНА, без дубля)
  useEffect(() => {
    if (!hasStarted) return;
    if (lineIndex >= lines.length) return;

    const currentText = lines[lineIndex];
    if (!currentText) return;

    // строка завершена
    if (charIndex === currentText.length) {
      const lineTimeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, currentText]);
        setCurrentLine('');
        setCharIndex(0);
        setLineIndex((prev) => prev + 1);
      }, 200);

      return () => clearTimeout(lineTimeout);
    }

    // печать символов
    const typingTimeout = setTimeout(() => {
      setCurrentLine((prev) => prev + currentText[charIndex]);
      setCharIndex((prev) => prev + 1);
    }, 30);

    return () => clearTimeout(typingTimeout);
  }, [charIndex, lineIndex, lines, hasStarted]);

  return (
    <div className={styles['terminal']}>
      {displayedLines.map((line, index) => (
        <p key={index} className={styles['terminal__line']}>
          {line}
        </p>
      ))}

      {hasStarted && lineIndex < lines.length && (
        <p className={styles['terminal__line']}>
          {currentLine}
          <span className={styles['terminal__cursor']}>|</span>
        </p>
      )}

      {hasStarted && lineIndex === lines.length && (
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
      )}
    </div>
  );
};

export default Terminal;
