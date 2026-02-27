import styles from './LogoLing.module.css';
import Logo from '@/shared/assets/logo.svg?react';

export const LogoLink: React.FC = () => (
  <a className={styles.logoContainer} href='/'>
    <Logo className={styles.logo} />
  </a>
);
