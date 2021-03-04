import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from 'react';

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((like) => {
    return like._id === currentUser._id;
  });
  function handleCardClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleCardDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className={props.className} >
      <>
        <img src={props.card.link} alt={props.card.name} className="card__photo" onClick={handleCardClick} loading="lazy" />
        {isOwn && <button type="button" className="card__deletion" onClick={handleCardDeleteClick}></button>}
        <div className="card__description">
          <h3 className="card__title">{props.card.name}</h3>
          <div className="card__like">
            <button type="button" className={`card__like-button ${isLiked && "card__like-button_active"}`} onClick={handleLikeClick}></button>
            <span className="card__like-number">{props.card.likes.length}</span>
          </div>
        </div>
      </>
    </div>
  );
};