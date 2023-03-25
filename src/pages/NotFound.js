import style from './NotFound.module.css';

const NotFound = () => {
  return (
    <main className={style.main}>
      <img alt="page not found" src="/images/404.png" />
    </main>
  );
};

export default NotFound;
