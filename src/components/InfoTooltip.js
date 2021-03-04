import React from 'react';
import Success from '../img/succes.svg';
import Denied from '../img/denied.svg';

export default function InfoTooltip(props) {
  const [isSuccess, setIsSuccess] = React.useState(false);
  React.useEffect(() => {
    setIsSuccess(props.isSuccess);
  }, [props.isSuccess]);
  return (
    <div className={`popup popup_type_info ${props.isOpened && "popup_opened"}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <div className="popup__content">
          {isSuccess ? (<>
            <img src={Success} className="popup__icon" alt="Успех" />
            <p className="popup__info">Вы успешно зарегистрировались!</p>
          </>) : (<><img src={Denied} className="popup__icon" alt="Ошибка" />
            <p className="popup__info">Что-то пошло не так!
Попробуйте ещё раз.</p></>)
          }
        </div>
      </div>
    </div>
  )
};