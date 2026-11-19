import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

interface IProps {
  lines: string[];
  methods: Array<{
    id: number;
    title: string;
    href: string;
  }>;
  start: boolean;
}

const CHAR_DELAY = 28;
const LINE_DELAY = 180;

/**
 * Терминал, который «печатает» строки, а затем показывает кликабельные команды-ссылки.
 */
const Terminal = ({ lines, methods, start }: IProps) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const isDone = lineIndex >= lines.length;

  useEffect(() => {
    if (!start || isDone) return;

    const currentText = lines[lineIndex];
    const isLineFinished = charIndex >= currentText.length;

    const timeout = setTimeout(
      () => {
        if (isLineFinished) {
          setLineIndex((prev) => prev + 1);
          setCharIndex(0);
        } else {
          setCharIndex((prev) => prev + 1);
        }
      },
      isLineFinished ? LINE_DELAY : CHAR_DELAY
    );

    return () => clearTimeout(timeout);
  }, [start, isDone, lineIndex, charIndex, lines]);

  const typedLines = lines.slice(0, lineIndex);
  const currentLine = isDone ? '' : lines[lineIndex].slice(0, charIndex);

  return (
    <div className={styles['terminal']}>
      <div className={styles['terminal__bar']}>
        <span className={styles['terminal__dots']} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className={styles['terminal__title']}>kyrylo@portfolio: ~</span>
      </div>

      <div className={styles['terminal__body']}>
        {typedLines.map((line, index) => (
          <p key={index} className={styles['terminal__line']}>
            {line}
          </p>
        ))}

        {start && !isDone && (
          <p className={styles['terminal__line']}>
            {currentLine}
            <span className={styles['terminal__cursor']} aria-hidden="true" />
          </p>
        )}

        {isDone && (
          <ul className={styles['terminal__methods']}>
            {methods.map((method) => (
              <li key={method.id}>
                <a
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['terminal__method']}
                >
                  <span className={styles['terminal__prompt']}>$</span>
                  {method.title}
                  <span className={styles['terminal__arrow']} aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
            <li className={styles['terminal__line']}>
              <span className={styles['terminal__cursor']} aria-hidden="true" />
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Terminal;
