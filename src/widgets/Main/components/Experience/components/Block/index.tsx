import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

interface IProps {
  index: number;
  role: string;
  company: string;
  period: string;
  stack: string;
  description: string[];
}

// В переводах стек хранится как «Tech stack : A, B, C»
const parseStack = (text: string) =>
  text
    .slice(text.indexOf(':') + 1)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const Block = ({ index, role, company, period, stack, description }: IProps) => {
  const { t } = useTranslation();

  const [from, to = ''] = t(period)
    .split('–')
    .map((part) => part.trim());

  return (
    <li className={styles['block']} data-timeline-item>
      <div className={styles['block__period']}>
        <span className={styles['block__period-to']}>{to}</span>
        <span className={styles['block__period-from']}>{from} —</span>
      </div>

      <span className={styles['block__node']} data-timeline-node aria-hidden="true" />

      <article className={styles['block__card']} data-timeline-card>
        <header className={styles['block__header']}>
          <span className={styles['block__index']}>{String(index + 1).padStart(2, '0')}</span>
          <div>
            <h3 className={styles['block__role']}>{t(role)}</h3>
            <p className={styles['block__company']}>{t(company)}</p>
          </div>
        </header>

        {stack && (
          <ul className={styles['block__stack']}>
            {parseStack(t(stack)).map((tech) => (
              <li key={tech} className={styles['block__tag']}>
                {tech}
              </li>
            ))}
          </ul>
        )}

        <ul className={styles['block__list']}>
          {description.map((item) => (
            <li key={item} className={styles['block__item']} data-timeline-point>
              {t(item)}
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
};

export default Block;
