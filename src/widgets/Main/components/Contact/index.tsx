import { useTranslation } from 'react-i18next';

import useReveal from '@shared/hooks/useReveal';

import config from './config';

import Terminal from './components/Terminal';

import styles from './styles.module.scss';
const Contact = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useReveal();

  return (
    <section
      ref={ref}
      id="contact"
      className={`${styles['contact']} section reveal ${isVisible ? 'reveal--visible' : ''}`}
    >
      <h2 className={styles['contact__title']}>{t('contact.title')}</h2>

      <div className={styles['contact__terminal-wrapper']}>
        <Terminal lines={config.lines} methods={config.methods} start={isVisible} />
      </div>
    </section>
  );
};

export default Contact;
