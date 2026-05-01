import useReveal from './hooks/useReveal';

import styles from './styles.module.scss';

import Header from './components/Header';
import Main from './components/Main';

const App = () => {
  useReveal();

  return (
    <div className={styles['app']}>
      <Header />
      <Main />
    </div>
  );
};

export default App;
