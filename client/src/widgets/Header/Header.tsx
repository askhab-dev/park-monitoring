import styles from './Header.module.css'
import { ParksNavigation } from './ui/ParksNavigation/ParksNavigation'
import { LogoLink } from './ui/LogoLink/LogoLink'
import { parks } from './config/parks'
import { Search } from './ui/Search/Search';
import { LastUpdate } from './ui/LastUpdate/LastUpdate';
import { Notifications } from './ui/Notifications/Notifications';

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <LogoLink />
      <ParksNavigation parks={parks} />
      <Search />
      <LastUpdate />
      <Notifications />
    </div>
  )
};
