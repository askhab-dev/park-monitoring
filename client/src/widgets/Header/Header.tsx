import styles from './Header.module.css'
import { ParksNavigation } from './ui/ParksNavigation/ParksNavigation'
import { LogoLink } from './ui/LogoLink/LogoLink'
import { parks } from './config/parks'

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <LogoLink />
      <ParksNavigation parks={parks} />
    </div>
  )
}
