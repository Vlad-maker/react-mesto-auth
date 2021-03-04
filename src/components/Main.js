import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar">
          <div className="profile__overlay" onClick={props.onEditAvatar}></div>
          <img src={currentUser.avatar} alt={`Аватар ${currentUser.name}`} className="profile__photo" />
        </div>
        <div className="profile__description">
          <div className="profile__title-row">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button type="button" className="profile__button profile__button_edit" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__subtitle">
            {currentUser.about}
          </p>
        </div>
        <button type="button" className="profile__button profile__button_add" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards-grid">
        {props.cards.map((card, i) => {
          return (
            <Card className="card" key={card._id} onCardClick={props.onCardClick} card={card} onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete} />
          );
        })}
      </section>
    </main>
    )
  };