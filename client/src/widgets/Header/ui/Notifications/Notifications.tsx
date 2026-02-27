import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertCircle, Info } from 'lucide-react';
import cx from 'clsx';
import BellIcon from '../../assets/bell.svg?react';
import styles from './Notifications.module.css';

const notifications = [
  {
    id: 1,
    type: 'success',
    title: 'Успешная операция',
    message: 'Данные успешно сохранены',
    time: '5 минут назад',
    read: false,
  },
  {
    id: 2,
    type: 'warning',
    title: 'Внимание',
    message: 'Заканчивается место на диске',
    time: '1 час назад',
    read: false,
  },
  {
    id: 3,
    type: 'info',
    title: 'Новое обновление',
    message: 'Доступна новая версия системы',
    time: '3 часа назад',
    read: true,
  },
  {
    id: 4,
    type: 'error',
    title: 'Ошибка синхронизации',
    message: 'Не удалось синхронизировать данные',
    time: 'вчера',
    read: true,
  },
];

export const Notifications: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(notifications);

  const unreadCount = items.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
  };

  const markAllAsRead = () => {
    setItems(items.map((item) => ({ ...item, read: true })));
  };

  const deleteNotification = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const getIconByType = (type: string) => {
    switch (type) {
      case 'success':
        return <Check size={16} color='#34C759' />;
      case 'warning':
        return <AlertCircle size={16} color='#FF9500' />;
      case 'error':
        return <AlertCircle size={16} color='#FF3B30' />;
      default:
        return <Info size={16} color='#007AFF' />;
    }
  };

  return (
    <div className={styles.wrapper}>
      <motion.button
        className={styles.notifications}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={{
          backgroundColor: isOpen ? 'var(--bg-brand-light)' : 'transparent',
        }}
      >
        <div className={styles.iconWrapper}>
          <BellIcon className={styles.icon} />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className={styles.popup}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {/* Заголовок попапа */}
              <div className={styles.popupHeader}>
                <h3 className={styles.popupTitle}>Уведомления</h3>
                {unreadCount > 0 && (
                  <motion.button
                    className={styles.markAllRead}
                    onClick={markAllAsRead}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Прочитать все
                  </motion.button>
                )}
              </div>

              {/* Список уведомлений */}
              <div className={styles.notificationsList}>
                <AnimatePresence mode='popLayout'>
                  {items.length > 0 ? (
                    items.map((notification) => (
                      <motion.div
                        key={notification.id}
                        className={cx(
                          styles.notificationItem,
                          !notification.read && styles.unread,
                        )}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        layout
                      >
                        <div className={styles.notificationIcon}>
                          {getIconByType(notification.type)}
                        </div>

                        <div className={styles.notificationContent}>
                          <div className={styles.notificationHeader}>
                            <span className={styles.notificationTitle}>
                              {notification.title}
                            </span>
                            <span className={styles.notificationTime}>
                              {notification.time}
                            </span>
                          </div>
                          <p className={styles.notificationMessage}>
                            {notification.message}
                          </p>
                        </div>

                        <div className={styles.notificationActions}>
                          {!notification.read && (
                            <motion.button
                              className={styles.actionButton}
                              onClick={() => markAsRead(notification.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              title='Отметить как прочитанное'
                            >
                              <Check size={14} />
                            </motion.button>
                          )}
                          <motion.button
                            className={styles.actionButton}
                            onClick={() => deleteNotification(notification.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title='Удалить'
                          >
                            <X size={14} />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      className={styles.emptyState}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <BellIcon className={styles.emptyIcon} />
                      <p>Нет новых уведомлений</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer с кнопкой "Все уведомления" */}
              <div className={styles.popupFooter}>
                <motion.button
                  className={styles.viewAllButton}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Все уведомления
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
