import React from "react";
import { Link, Route, Switch } from 'react-router-dom';

export default function Header(props) {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={props.src} alt="Логотип" className="header__logo-image" />
      </Link>
      <div className="header__profile">
        {props.loggedIn ? (<p className="header__mail">{props.email}</p>) : ''}
        <Switch>
          <Route path="/sign-in">
            <Link to="/sign-up" className="header__link">Регистрация</Link>
          </Route>
          <Route path="/sign-up">
            <Link to="/sign-in" className="header__link">Войти</Link>
          </Route>
          <Route exact path="/">
            <Link to="/sign-up" onClick={props.onLogOut} className="header__link">Выйти</Link>
          </Route>
        </Switch>
      </div>
    </header >
  )
};