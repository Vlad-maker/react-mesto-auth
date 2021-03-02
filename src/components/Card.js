import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `card__deletion ${isOwn ? '' : 'card__deletion_disabled'}`
    );
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `card__like ${isLiked ? 'card__like_active' : ''}`
    );

    function handleCardClick() {
        props.onCardClick(props.card);
    }
    function handleLikeClick() {
        props.onCardLike(props.card);
    }
    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <li
            className="card">
            <button
                className={cardDeleteButtonClassName}
                onClick={handleDeleteClick}
            />
            <button
                className="card__open-button"
                type="button"
                aria-label="Открыть"
                onClick={handleCardClick}>
                <img
                    className="card__photo"
                    src={props.link}
                    alt={props.name}
                />
            </button>
            <div
                className="card__description">
                <h2
                    className="card__title">{props.name}
                </h2>
                <div
                    className="card__like-section">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        aria-label="Like"
                        onClick={handleLikeClick}
                        />
                    <p 
                        className="card__like-number">
                        {props.likes.length}
                    </p>
                </div>
            </div>
        </li>
    );
}
export default Card;