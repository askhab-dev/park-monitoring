import cx from 'clsx';
import styles from './Error.module.css';

interface ErrorProps {
  className?: string;
  message?: string;
}

export const ErrorMessage: React.FC<ErrorProps> = ({
  className = '',
  message = 'Ошибка загрузки данных',
}) => {
  return <div className={cx(styles.message, className)}>{message}</div>;
};
