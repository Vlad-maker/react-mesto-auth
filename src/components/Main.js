import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <main className="content page__content">
            <section className="profile content__profile">
                <button
                    className="profile__avatar-button"
                    type="button"
                    onClick={props.onEditAvatar}>
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <p className="profile__about">{currentUser.about}</p>
                    <button
                        className="profile__edit-button"
                        type="button"
                        aria-label="Редактировать"
                        onClick={props.onEditProfile}
                    />
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    aria-label="Добавить"
                    onClick={props.onAddPlace}
                />
            </section>
            <section className="cards content__cards">
                <ul className="cards__grid">
                    {
                        props.cards.map((card) => (
                            <Card
                                key={card._id}
                                card={card}
                                name={card.name}
                                link={card.link}
                                likes={card.likes}
                                onCardClick={props.onCardClick}
                                onCardLike={props.onCardLike}
                                onCardDelete={props.onCardDelete}
                            />
                            )
                        )
                    }

                </ul>
            </section>
        </main>
    );
}
export default Main;