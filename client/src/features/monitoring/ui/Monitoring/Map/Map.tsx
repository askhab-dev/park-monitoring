import styles from './Map.module.css';

const YA_MAP_LINK =
  'https://yandex.ru/map-widget/v1/?ll=37.592023%2C55.704891&mode=whatshere&whatshere%5Bpoint%5D=37.591108%2C55.706946&whatshere%5Bzoom%5D=15.91&z=15.91';

export const Map: React.FC<{ children?: React.ReactNode }> = (props) => {
  const { children } = props;

  return (
    <div className={styles.map}>
      <iframe
        src={YA_MAP_LINK}
        title='Карта парков'
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
        allowFullScreen={true}
      />
      {children}
    </div>
  );
};
