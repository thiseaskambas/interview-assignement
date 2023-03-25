import { Link } from 'react-router-dom';

import style from './NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={style.navbar}>
      <Link to="/" className={style.logoctn}>
        <img className={style.logoimg} alt="" src="/images/logo.svg" />
      </Link>
      <ul className={style.navlist}>
        <li className={style.navli}>
          <Link to="/schedule" className={style.link}>
            <img
              className={style.imagelink}
              alt=""
              src="/images/schedule.png"
            />
            <div>Schedule</div>
          </Link>
        </li>
        <li className={style.navli}>
          <Link to="/leaderboard" className={style.link}>
            <img
              className={style.imagelink}
              alt=""
              src="/images/leaderboard.png"
            />
            <div>Leaderboard</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
