import styles from './Loader.module.css';

export default function Loader({ loaded, children }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.loaderWrapper} ${loaded ? 'd-none' : styles.loaderVisible}`}>
        <div className={styles.loader}></div>
      </div>
      <div className={loaded ? 'loaded' : 'loading'}>
        {children}
      </div>
    </div>
  );
}

interface Props {
  loaded: boolean;
  children: React.ReactNode;
}
