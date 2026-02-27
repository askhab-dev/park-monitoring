import StatusIcon from '../../assets/status.svg?react';
import styles from './LastUpdate.module.css';

export const LastUpdate: React.FC = () => {
  return (
    <div className={styles.lastUpdate}>
      <StatusIcon className={styles.statusIcon} />
      Обновлено
      <br />
      20.09.2024 в 12:35
    </div>
  );
};
