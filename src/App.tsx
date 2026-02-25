import clsx from "clsx";

import styles from "./styles.module.scss";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className={clsx(styles.app, "container")}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
