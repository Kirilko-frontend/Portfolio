import useReveal from './hooks/useReveal';

import styles from './styles.module.scss';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const App = () => {
  useReveal();

  return (
    <div className={styles['app']}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
