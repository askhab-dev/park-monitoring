interface ErrorProps {
  className?: string;
  message?: string;
}

export const ErrorMessage: React.FC<ErrorProps> = ({ className, message = 'Ошибка загрузки данных' }) => {
  return <div className={className}>{message}</div>;
};
