import clsx from "clsx";

import styles from "./styles.module.scss";

const Header = () => {
  return (
    <section className={clsx(styles.header)}>
      <h1 className={clsx(styles.title)}>My Portfolio</h1>
    </section>
  );
};

export default Header;
