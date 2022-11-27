import style from '../style/NavigationBar.module.css';
import eco from '../asset/img/Eco.svg';
import Home from '../asset/img/Home.svg';
import Favorite from '../asset/img/Favorite.svg';
import ShoppingBag from '../asset/img/ShoppingBag.svg';
import Calender from '../asset/img/Calendar.svg';
import Account from '../asset/img/Account.svg';

const NavigationBar = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.top}>
          <img src={eco} alt="Eco" />
          <span>플리마켓</span>
          <div className={style.login}>
            <a href={`/login`}>
              <span>로그인</span>
            </a>
          </div>
        </div>
        <div className={style.bottom}>
          <a href={`/`}>
            <img src={Home} alt="Home" />
          </a>
          <a href={`/favorite`}>
            <img src={Favorite} alt="Favorite" />
          </a>
          <a href={`/markets`}>
            <img src={ShoppingBag} alt="ShoppingBag" />
          </a>
          <a href={`/ calender`}>
            <img src={Calender} alt="Calender" />
          </a>
          <a href={`/ profile`}>
            <img src={Account} alt="Account" />
          </a>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
