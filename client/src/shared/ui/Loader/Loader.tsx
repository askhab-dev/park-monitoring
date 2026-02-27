import styles from './Loader.module.css';

interface LoaderProps {
  className?: string;
  message?: string;
  fullscreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  className,
  message,
  fullscreen = false,
}) => {
  const rootClassName = [
    styles.root,
    message ? styles.column : '',
    fullscreen ? styles.fullscreen : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClassName} role='status' aria-live='polite'>
      <div className={styles.spinner} aria-hidden='true' />
      {message ? <div className={styles.label}>{message}</div> : null}
    </div>
  );
};
