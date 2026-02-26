import styles from './InnerMenu.module.css';
import LaptopIcon from '../../assets/laptop.svg?react';
import ForkIcon from '../../assets/fork.svg?react';
import PowerIcon from '../../assets/power.svg?react';
import TowerIcon from '../../assets/tower.svg?react';

const MENU_ITEMS = {
  label: 'Администрирование\nи мониторинг',
  options: [
    { label: 'Монитор парка ТА', Icon: LaptopIcon },
    { label: 'Удаленное управление ТА', Icon: TowerIcon },
    { label: 'Регистрация ТА', Icon: ForkIcon },
    { label: 'Вывод ТА из эксплуатации', Icon: PowerIcon },
  ],
}

export const InnerMenu: React.FC = () => {
  return (
    <div className={styles.innerMenu}>
      <h2 className={styles.label}>{MENU_ITEMS.label}</h2>
      <ul className={styles.options}>
        {MENU_ITEMS.options.map(({ label, Icon }) => (
          <li key={label} >
            <button className={styles.option}>
              <Icon className={styles.icon} />
              <span className={styles.optionLabel}>{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
};
