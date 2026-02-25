import { useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { ArrowBigUp, SearchIcon } from 'lucide-react'
import styles from './Search.module.css'

export const Search: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useHotkeys('shift+s', () => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, {
    preventDefault: true,
    enableOnFormTags: false,
  });

  return (
    <div className={styles.search} onClick={() => inputRef.current?.focus()}>
      <SearchIcon size={16} className={styles.searchIcon}/>
      <input type="text" placeholder="Найти" className={styles.searchInput} ref={inputRef}/>
      <div className={styles.shiftClue}>
        <ArrowBigUp size={12}/> <span className={styles.shiftKey}>+ S</span>
      </div>
    </div>
  )
};
