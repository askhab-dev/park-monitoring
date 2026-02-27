interface LoaderProps {
  className?: string;
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ className, message = 'Загрузка...' }) => {
  return <div className={className}>{message}</div>;
};
