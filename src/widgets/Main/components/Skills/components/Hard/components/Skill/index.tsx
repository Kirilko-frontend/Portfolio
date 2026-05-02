import styles from './styles.module.scss';

interface IProps {
  id: number;
  title: string;
  groups: {
    title: string;
    items: { name: string }[];
  }[];
}

const Skill = ({ title, groups }: IProps) => {
  return (
    <div className={styles['skill']}>
      <h2 className={styles['skill__title']}>{title}</h2>

      {groups.map((group, index) => (
        <div key={index} className={styles['group']}>
          <p className={styles['group__title']}>{group.title}:</p>

          <div className={styles['group__items']}>
            {group.items.map((item) => (
              <span key={item.name} className={styles['tag']}>
                {item.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skill;
