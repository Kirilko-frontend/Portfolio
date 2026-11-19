import { useCallback, useState } from 'react';

import useMouseGlow from '@shared/hooks/useMouseGlow';
import useScrollProgress from '@shared/hooks/useScrollProgress';
import useSmoothScroll from '@shared/hooks/useSmoothScroll';
import { IntroContext } from '@shared/context/IntroContext';
import Preloader from '@shared/ui/Preloader';

import styles from './styles.module.scss';

import Header from '@widgets/Header';
import Main from '@widgets/Main';

const App = () => {
  useSmoothScroll();

  const [isIntroDone, setIsIntroDone] = useState(false);
  const handleReveal = useCallback(() => setIsIntroDone(true), []);

  const scrollProgress = useScrollProgress();
  const cursorGlowRef = useMouseGlow();

  return (
    <IntroContext.Provider value={isIntroDone}>
      <Preloader onReveal={handleReveal} />

      <div className={styles['app']}>
        <div
          className={styles['app__scroll-progress']}
          style={{ width: `${scrollProgress * 100}%` }}
        />
        <div ref={cursorGlowRef} className={styles['app__cursor-glow']} />

        <Header />
        <Main />
      </div>
    </IntroContext.Provider>
  );
};

export default App;
