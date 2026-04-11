import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

interface IProps {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
}

const Block = (props: IProps) => {
  const { id, role, company, period, description } = props;
  const { t } = useTranslation();
  return (
    <div key={id} className={styles['block']}>
      <div className={styles['block__period-wrapper']}>
        <p className={styles['block__period']}>{t(period)}</p>
      </div>
      <p className={styles['block__company']}>{t(company)}</p>
      <p className={styles['block__role']}>{t(role)}</p>
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
