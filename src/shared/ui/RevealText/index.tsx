import { useRef, type ElementType } from 'react';

import { gsap, MEDIA, SplitText, useGSAP } from '@shared/lib/gsap';

interface IProps {
  text: string;
  as?: ElementType;
  className?: string;
  /**
   * lines — строки выезжают из-под маски, когда текст попадает в экран;
   * scrub — слова «зажигаются» (opacity 0.15 -> 1) синхронно со скроллом.
   */
  variant?: 'lines' | 'scrub';
  /** Точка старта ScrollTrigger для варианта lines */
  start?: string;
  delay?: number;
}

/**
 * Текст с анимацией появления через SplitText.
 * key={text} пересоздаёт элемент при смене языка, чтобы React и SplitText не конфликтовали из-за DOM.
 */
const RevealText = (props: IProps) => {
  const {
    text,
    as: Tag = 'p',
    className = '',
    variant = 'lines',
    start = 'top 85%',
    delay = 0,
  } = props;

  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(MEDIA.motion, () => {
        if (variant === 'scrub') {
          SplitText.create(el, {
            type: 'words',
            autoSplit: true,
            onSplit: (self) =>
              gsap.fromTo(
                self.words,
                { opacity: 0.15 },
                {
                  opacity: 1,
                  ease: 'none',
                  stagger: 0.1,
                  scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    end: 'bottom 50%',
                    scrub: true,
                  },
                }
              ),
          });
          return;
        }

        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              rotate: 2,
              duration: 1.2,
              delay,
              stagger: 0.1,
              ease: 'expo.out',
              scrollTrigger: { trigger: el, start, once: true },
            }),
        });
      });
    },
    { scope: ref, dependencies: [text, variant], revertOnUpdate: true }
  );

  return (
    <Tag key={text} ref={ref} className={className}>
      {text}
    </Tag>
  );
};

export default RevealText;
