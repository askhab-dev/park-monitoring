import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import cx from 'clsx';

import styles from './ParksNavigation.module.css';
import type { Park } from '../../config/parks.types';
import { useParkSelection } from '../../hooks/useParkSelection';

type Props = {
  parks: Park[];
};

export const ParksNavigation: React.FC<Props> = ({ parks }) => {
  const { isOpen, selectedPark, toggle, selectPark } = useParkSelection(
    parks[0],
  );

  return (
    <nav className={styles.parksNavigation}>
      <motion.nav
        className={styles.selector}
        initial={false}
        animate={{
          borderColor: isOpen ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)',
          boxShadow: isOpen ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
        }}
      >
        <button
          className={styles.selectorButton}
          onClick={toggle}
          aria-expanded={isOpen}
        >
          <div className={styles.parkInfo}>
            <span className={styles.parkName}>{selectedPark.name}</span>
            <p className={styles.adressWrapper}>
              <span className={styles.parkAddress}>{selectedPark.address}</span>
              <span className={styles.parkNum}>{selectedPark.num}</span>
            </p>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className={styles.chevron}
          >
            <ChevronDown size={20} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.dropdown}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15, ease: 'easeInOut' }}
            >
              {parks.map((park) => (
                <motion.button
                  key={park.id}
                  className={cx(
                    styles.parkOption,
                    selectedPark.id === park.id && styles.selected,
                  )}
                  onClick={() => selectPark(park)}
                  whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className={styles.parkName}>{park.name}</span>
                  <p className={styles.adressWrapper}>
                    <span className={styles.parkAddress}>{park.address}</span>
                    <span className={styles.parkNum}>{park.num}</span>
                  </p>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </nav>
  );
};
