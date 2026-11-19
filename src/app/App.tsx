import { useCallback, useState } from 'react';

import useScrollProgress from '@shared/hooks/useScrollProgress';
import useSmoothScroll from '@shared/hooks/useSmoothScroll';
import { IntroContext } from '@shared/context/IntroContext';
import Cursor from '@shared/ui/Cursor';
import Preloader from '@shared/ui/Preloader';

import styles from './styles.module.scss';

import Header from '@widgets/Header';
import Main from '@widgets/Main';
import Footer from '@widgets/Footer';

const App = () => {
  useSmoothScroll();

  const [isIntroDone, setIsIntroDone] = useState(false);
  const handleReveal = useCallback(() => setIsIntroDone(true), []);

  const scrollProgress = useScrollProgress();

  return (
    <IntroContext.Provider value={isIntroDone}>
      <Preloader onReveal={handleReveal} />
      <Cursor />

      <div className={styles['app']}>
        <div
          className={styles['app__scroll-progress']}
          style={{ width: `${scrollProgress * 100}%` }}
        />

        <Header />
        <Main />
        <Footer />
      </div>
    </IntroContext.Provider>
  );
};

export default App;
