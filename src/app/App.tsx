import { useCallback, useState } from 'react';

import useSmoothScroll from '@shared/hooks/useSmoothScroll';
import { IntroContext } from '@shared/context/IntroContext';
import Cursor from '@shared/ui/Cursor';
import Preloader from '@shared/ui/Preloader';
import ScrollProgress from '@shared/ui/ScrollProgress';

import styles from './styles.module.scss';

import Header from '@widgets/Header';
import Main from '@widgets/Main';
import Footer from '@widgets/Footer';

const App = () => {
  useSmoothScroll();

  const [isIntroDone, setIsIntroDone] = useState(false);
  const handleReveal = useCallback(() => setIsIntroDone(true), []);

  return (
    <IntroContext.Provider value={isIntroDone}>
      <Preloader onReveal={handleReveal} />
      <Cursor />
      <ScrollProgress />

      <div className={styles['app']}>
        <Header />
        <Main />
        <Footer />
      </div>
    </IntroContext.Provider>
  );
};

export default App;
