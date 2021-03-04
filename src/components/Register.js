import React from 'react';
import { withRouter, Link } from 'react-router-dom';
function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  function handleDataSubmit(e) {
    e.preventDefault();
    props.onSubmit({ password, email });
  }
  function handleMailChange(e) {
    e.preventDefault();
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }
  return (
    <form className="auth__form" action="#" onSubmit={handleDataSubmit}>
      <h2 className="auth__heading">
        Регистрация
        </h2>
      <fieldset className="auth__fieldset">
        <input value={email || ''} onChange={handleMailChange} name="email" className="auth__input" type="email" />
        <input value={password || ''} onChange={handlePasswordChange} name="password" className="auth__input" type="password" />
      </fieldset>
      <button className="auth__submit" type="submit">Зарегестрироваться</button>
      <p className="auth__text">Уже зарегестрированы? <Link className="auth__link" to="/sign-in">Войти</Link></p>
    </form>
  );
}
export default withRouter(Register);