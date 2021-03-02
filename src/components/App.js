import React from 'react';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import ConfirmPopup from "./ConfirmPopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";

function App() {
    const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
    const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState(false);
    const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState(false);
    const [ isConfirmPopupOpen, setIsConfirmPopupOpen ] = React.useState(false);
    const [ selectedCard, setSelectedCard ] = React.useState({});
    const [ currentUser, setCurrentUser] = React.useState({});
    const [ cards, setCards ] = React.useState([]);
    const [ isLoading, setIsLoading ] = React.useState(false);
    const [ removedCard, setRemovedCard ] = React.useState({});

    React.useEffect(() => {
        Promise.all([api.getUserData(), api.getInitialCards()])
            .then((values) => {
                const [userData, initialCards] = values;
                setCurrentUser(userData);
                setCards(initialCards);
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeStatus(card._id, isLiked)
            .then((newCard) => {
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                setCards(newCards);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function handleCardDeleteClick(card) {
        setIsConfirmPopupOpen(true);
        setRemovedCard(card);
    }
    function handleCardDelete(card) {
        setIsLoading(true);
        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter((c) => c._id !== card._id);
                setCards(newCards);
                closeAllPopups();
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsConfirmPopupOpen(false);
        setSelectedCard({})
    }
    function handleEscClose(evt) {
        if (evt.key === 'Escape') {
            closeAllPopups();
        }
    }
    function handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup')) {
            closeAllPopups();
        }
    }
    function handleUpdateUser(currentUser) {
        setIsLoading(true);
        api.editUserData(currentUser)
            .then((data) => {
                setCurrentUser(data);
                setIsLoading(false);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function handleUpdateAvatar(data) {
        setIsLoading(true);
        api.changeUserAvatar(data)
            .then((userData) => {
                setCurrentUser(userData);
                setIsLoading(false);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function handleAddPlaceSubmit({ name, link }) {
        setIsLoading(true);
        api.postNewCard({ name, link })
            .then((newCard) => {
                setCards([newCard, ...cards]);
                setIsLoading(false);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    React.useEffect(() => {
        document.addEventListener('keydown', handleEscClose);
        document.addEventListener('mouseup', handleOverlayClose);
        return () => {
            document.removeEventListener('keydown', handleEscClose);
            document.removeEventListener('mouseup', handleOverlayClose);
        }
    });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
          <div className="page__container">
              <Header/>
              <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={setSelectedCard}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDeleteClick}
              />
              <Footer/>
              <EditProfilePopup
                      isOpen={isEditProfilePopupOpen}
                      onClose={closeAllPopups}
                      onUpdateUser={handleUpdateUser}
                      isLoading={isLoading}
                  />
                  <EditAvatarPopup
                      isOpen={isEditAvatarPopupOpen}
                      onClose={closeAllPopups}
                      onUpdateAvatar={handleUpdateAvatar}
                      isLoading={isLoading}
                  />
                  <AddPlacePopup
                      isOpen={isAddPlacePopupOpen}
                      onClose={closeAllPopups}
                      onAddPlace={handleAddPlaceSubmit}
                      isLoading={isLoading}
                  />
                  <ConfirmPopup
                      isOpen={isConfirmPopupOpen}
                      onClose={closeAllPopups}
                      onConfirm={handleCardDelete}
                      card={removedCard}
                      isLoading={isLoading}
                  />
                  <ImagePopup
                      card={selectedCard}
                      onClose={closeAllPopups}
                  />
              </div>
          </div>
      </CurrentUserContext.Provider>
  );
}

export default App;