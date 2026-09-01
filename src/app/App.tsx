import useMouseGlow from '@shared/hooks/useMouseGlow';
import useScrollProgress from '@shared/hooks/useScrollProgress';

import styles from './styles.module.scss';

import Header from '@widgets/Header';
import Main from '@widgets/Main';

const App = () => {
  const scrollProgress = useScrollProgress();
  const cursorGlowRef = useMouseGlow();

  return (
    <div className={styles['app']}>
      <div className={styles['app__scroll-progress']} style={{ width: `${scrollProgress * 100}%` }} />
      <div ref={cursorGlowRef} className={styles['app__cursor-glow']} />

      <Header />
      <Main />
    </div>
  );
};

export default App;
