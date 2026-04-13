import { useTranslation } from 'react-i18next';

import config from './config';

import Terminal from './components/Terminal';

import styles from './styles.module.scss';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className={`${styles['contact']} section reveal`}>
      <h2 className={styles['contact__title']}>{t('contact.title')}</h2>
      <div className={styles['contact__terminal-wrapper']}>
        <Terminal lines={config.lines} methods={config.methods} />
      </div>
    </section>
  );
};

export default Contact;
