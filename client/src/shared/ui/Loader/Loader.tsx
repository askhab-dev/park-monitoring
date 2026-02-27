import styles from './Loader.module.css';

interface LoaderProps {
  className?: string;
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  className,
  message = 'Загрузка...',
}) => {
  return <div className={`${styles.message} ${className}`}>{message}</div>;
};
