import About from './components/About';

import styles from './styles.module.scss';

const Main = () => {
  return (
    <main className={`${styles['main']} container`}>
      <About />
    </main>
  );
};

export default Main;
