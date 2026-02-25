import BellIcon from '../../assets/bell.svg?react';
import styles from './Notifications.module.css';

export const Notifications: React.FC = () => {
  return (
    <div className={styles.notifications}>
      <div className={styles.iconWrapper}>
        <BellIcon className={styles.icon} />
      </div>
    </div>
  );
};
