import config from './config';
import styles from './styles.module.scss';

const Hard = () => {
  return (
    <div className={styles['hard']}>
      <h1 className={styles['hard__title']}>Hard Skills</h1>
      <div
        className={styles['hard__blocks']}
        style={{
          gridTemplateColumns: `repeat(${config.skills.grid.columns}, 1fr)`,
          gridTemplateRows: `repeat(${config.skills.grid.rows}, 1fr)`,
        }}
      >
        {config.skills.blocks.map((block) => (
          <div
            key={block.id}
            className={styles['hard__block']}
            style={{
              gridColumn: `${block.grid.column} / ${block.grid.column}`,
              gridRow: `${block.grid.row} / ${block.grid.row}`,
              gridColumnStart: block.grid.columnStart,
              gridRowStart: block.grid.rowStart,

              gridTemplateColumns: `repeat(${block.itemsGrid.columns}, 1fr)`,
              gridTemplateRows: `repeat(${block.itemsGrid.rows}, 1fr)`,
            }}
          >
            {block.items.map((skill) => (
              <div key={skill.title} className={`${styles['hard__skill']} glass-effect`}>
                <span>{skill.title}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hard;
