import { motion } from 'framer-motion';
import styles from './ReportButton.module.css';
import ArrowRightIcon from '@/shared/assets/arrow-narrow-right.svg?react';

export const ReportButton: React.FC<{ className?: string }> = (props) => {
  const { className = '' } = props;

  return (
    <motion.a
      href='#'
      className={`${styles.reportButton} ${className}`}
      initial={{ opacity: 1 }}
      whileHover='hover'
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <motion.span
        className={styles.reportLink}
        variants={{
          hover: { color: '#475467' },
        }}
      >
        Перейти в отчет
      </motion.span>

      <motion.div
        variants={{
          hover: { x: 4 },
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <ArrowRightIcon />
      </motion.div>
    </motion.a>
  );
};
