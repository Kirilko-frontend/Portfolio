import useReveal from '@shared/hooks/useReveal';

import styles from './styles.module.scss';

import Header from '@widgets/Header';
import Main from '@widgets/Main';

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
