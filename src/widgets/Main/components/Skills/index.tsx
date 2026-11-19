import { useTranslation } from 'react-i18next';

import SectionHeading from '@shared/ui/SectionHeading';

import Hard from './components/Hard';
import Marquee from './components/Marquee';
import Soft from './components/Soft';

import styles from './styles.module.scss';

const marqueeRows = [
  ['React', 'TypeScript', 'SolidJS', 'Tailwind CSS', 'Next.js', 'WebSocket', 'SCSS', 'GSAP'],
  ['NestJS', 'PostgreSQL', 'Prisma', 'Node.js', 'Docker', 'REST API', 'JWT', 'Figma', 'Git'],
];

const Skills = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className={`${styles['skills']} section`}>
      <div className="container">
        <SectionHeading index="02" label={t('skills.eyebrow')} title={t('skills.heading')} />
      </div>

      <Marquee rows={marqueeRows} />

      <div className={`${styles['skills__content']} container`}>
        <div className={styles['skills__block']}>
          <h3 className={styles['skills__subtitle']}>{t('skills.hard-title')}</h3>
          <Hard />
        </div>

        <div className={styles['skills__block']}>
          <Soft />
        </div>
      </div>
    </section>
  );
};

export default Skills;
