import { useState, useEffect, useRef } from 'react';

const useTypewriter = (lines: string[], speed = 50) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const lineIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!lines.length) {
      setDisplayedLines([]);
      setIsFinished(true);
      return;
    }

    // Сброс перед новым набором текста
    setDisplayedLines(lines.map(() => ''));
    setIsFinished(false);
    lineIndexRef.current = 0;
    charIndexRef.current = 0;

    const typeNextChar = () => {
      const currentLineIndex = lineIndexRef.current;
      const currentCharIndex = charIndexRef.current;

      // Проверка на выход за пределы массива
      if (currentLineIndex >= lines.length) {
        setIsFinished(true);
        return;
      }

      const line = lines[currentLineIndex];
      if (!line) return;

      // Добавляем следующий символ
      setDisplayedLines((prev) => {
        const newLines = [...prev];
        newLines[currentLineIndex] += line[currentCharIndex];
        return newLines;
      });

      charIndexRef.current += 1;

      // Если строка закончилась, переходим к следующей
      if (charIndexRef.current >= line.length) {
        lineIndexRef.current += 1;
        charIndexRef.current = 0;
      }

      // Планируем следующий символ, если ещё есть строки
      if (lineIndexRef.current < lines.length) {
        timeoutRef.current = setTimeout(typeNextChar, speed);
      } else {
        setIsFinished(true);
      }
    };

    typeNextChar();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [lines, speed]);

  return { displayedLines, isFinished };
};

export default useTypewriter;
