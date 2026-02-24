import Logo from '@/shared/assets/logo.svg?react'
import styles from '../../Header.module.css'

export const LogoLink: React.FC = () => (
  <a className={styles.logoContainer} href="/">
    <Logo className={styles.logo} />
  </a>
)
