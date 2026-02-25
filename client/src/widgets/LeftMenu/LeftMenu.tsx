import styles from './LeftMenu.module.css';
import AdminMonitoringIcon from './assets/gauge.svg?react';
import SettingsIcon from './assets/data-display.svg?react';
import DatabaseIcon from './assets/database.svg?react';
import GiftIcon from './assets/gift.svg?react';
import RightsIcon from './assets/square-a-lock.svg?react';
import CharIcon from './assets/chat.svg?react';
import QuestionIcon from './assets/question.svg?react';

export const LeftMenu = () => {
  return (
    <div className={styles.leftMenu}>
      <a href='#' className={styles.item}><AdminMonitoringIcon /></a>
      <a href='#' className={styles.item}><SettingsIcon /></a>
      <a href='#' className={styles.item}><DatabaseIcon /></a>
      <a href='#' className={styles.item}><GiftIcon /></a>
      <a href='#' className={styles.item}><RightsIcon /></a>
      <div className={styles.spacer}></div>
      <a href='#' className={styles.item}><QuestionIcon /></a>
      <a href='#' className={styles.item}><CharIcon /></a>
    </div>
  );
};
