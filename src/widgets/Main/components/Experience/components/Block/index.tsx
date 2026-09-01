import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

interface IProps {
  id: number;
  role: string;
  company: string;
  period: string;
  stack: string;
  description: string[];
  delay?: number;
}

const Block = (props: IProps) => {
  const { id, role, company, period, stack, description, delay } = props;
  const { t } = useTranslation();

  return (
    <div key={id} className={`${styles['block']} reveal-item ${delay ? `delay-${delay}` : ''}`}>
      <div className={styles['block__period-wrapper']}>
        <p className={styles['block__period']}>{t(period)}</p>
      </div>
      <div className={styles['block__info']}>
        <p className={styles['block__info-company-role']}>
          {t(company)} <span>•</span> {t(role)}
        </p>
        {stack && (
          <div className={styles['block__stack']}>
            {t(stack)
              .replace('Tech stack :', '')
              .split(',')
              .map((tech) => (
                <span key={tech.trim()} className={styles['block__stack-tag']}>
                  {tech.trim()}
                </span>
              ))}
          </div>
        )}
      </div>
      <ul className={styles['block__description']}>
        {description.map((item) => (
          <li key={item} className={styles['block__description-item']}>
            {t(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Block;
