import style from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.content}>API Version: 1.0</div>
    </footer>
  );
};

export default Footer;
