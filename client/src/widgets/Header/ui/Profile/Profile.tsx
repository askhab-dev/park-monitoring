import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, Settings, User, ChevronRight } from 'lucide-react'
import styles from './Profile.module.css'
import profileImage from '../../assets/profile.jpg'

export const Profile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.wrapper}>
      <motion.button
        className={styles.profileContainer}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.98 }}
        animate={{
          borderColor: isOpen ? 'var(--border-brand)' : 'var(--border-secondary)',
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.img
          src={profileImage}
          alt="User Avatar"
          className={styles.avatar}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Затемнение фона */}
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Всплывающее меню */}
            <motion.div
              className={styles.popup}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className={styles.userInfo}>
                <img src={profileImage} alt="User" className={styles.popupAvatar} />
                <div className={styles.userDetails}>
                  <span className={styles.userName}>Александр Петров</span>
                  <span className={styles.userEmail}>alex@example.com</span>
                </div>
              </div>

              <div className={styles.divider} />

              {/* Меню */}
              <div className={styles.menuItems}>
                <motion.button
                  className={styles.menuItem}
                  whileHover={{ x: 4, backgroundColor: 'rgba(0,0,0,0.02)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsOpen(false)
                  }}
                >
                  <User size={18} />
                  <span>Мой профиль</span>
                  <ChevronRight size={16} className={styles.chevron} />
                </motion.button>

                <motion.button
                  className={styles.menuItem}
                  whileHover={{ x: 4, backgroundColor: 'rgba(0,0,0,0.02)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsOpen(false)
                  }}
                >
                  <Settings size={18} />
                  <span>Настройки</span>
                  <ChevronRight size={16} className={styles.chevron} />
                </motion.button>

                <motion.button
                  className={`${styles.menuItem} ${styles.logout}`}
                  whileHover={{ x: 4, backgroundColor: 'rgba(255,0,0,0.02)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsOpen(false)
                  }}
                >
                  <LogOut size={18} />
                  <span>Выйти</span>
                  <ChevronRight size={16} className={styles.chevron} />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
};
