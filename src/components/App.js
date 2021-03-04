import Logo from '../img/logo.svg';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';

export default function App() {
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = React.useState(false);
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = React.useState(false);
  const [isAddPlacePopupOpened, setIsAddPlacePopupOpened] = React.useState(false);
  const [isImagePopupOpened, setIsImagePopupOpened] = React.useState(false);
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    async function getContent() {
      try {
        setCards(await api.getInitialCards());
      } catch (e) {
        console.log(e);
      }
    }
    getContent();
  }, []);

  async function handleCardLike(card) {
    const isLiked = card.likes.some((l) => {
      return l._id === currentUser._id;
    });
    try {
      const newCard = await api.changeLikeStatus(card._id, isLiked);
      const newCards = cards.map((c) => {
        return c._id === card._id ? newCard : c;
      });
      setCards(newCards);
    }
    catch (e) {
      console.log(e.message);
    }
  }

  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);
      const newCards = cards.filter((c) => {
        return c._id !== card._id;
      })
      setCards(newCards);
    } catch (e) {
      console.log(e.message);
    }
  }

  React.useEffect(() => {
    async function getUserInfo() {
      try {
        setCurrentUser(await api.getProfileInfo());
      } catch (e) {
        console.log(e.message);
      }
    }
    getUserInfo();
  }, []);

  React.useEffect(() => {
    async function checkToken() {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        try {
          const res = await api.checkToken(jwt)
          setLoggedIn(true);
          setEmail(res.data.email);
        } catch (e) {
          console.log(e.message);
        }
      }
    }
    checkToken();
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpened(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpened(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpened(true);
  }
  function handleCardClick(card) {
    setSelectedCard({
      ...selectedCard,
      src: card.link,
      name: card.name
    });
    setIsImagePopupOpened(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpened(false);
    setIsEditProfilePopupOpened(false);
    setIsAddPlacePopupOpened(false);
    setIsImagePopupOpened(false);
    setIsInfoTooltipOpened(false);
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

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('mouseup', handleOverlayClose);
    return () => {
        document.removeEventListener('keydown', handleEscClose);
        document.removeEventListener('mouseup', handleOverlayClose);
    }
  });

  async function handleUpdateUser(user) {
    try {
      setCurrentUser(await api.setProfileInfo(user));
      closeAllPopups();
    } catch (e) {
      console.log(e.message);
    }
  }
  async function handleUpdateAvatar(link) {
    try {
      setCurrentUser(await api.setProfileAvatar(link));
      closeAllPopups();
    }
    catch (e) {
      console.log(e.message);
    }
  }
  async function handleAddPlaceSubmit(data) {
    try {
      setCards([await api.postNewCard(data), ...cards]);
      closeAllPopups();
    } catch (e) {
      console.log(e.message);
    }
  }
  async function handleRegister(data) {
    try {
      await api.registration(data);
      setIsSuccess(true);
      setIsInfoTooltipOpened(true);
      history.push('/sign-in');
    }
    catch (e) {
      setIsSuccess(false);
      setIsInfoTooltipOpened(true);
      console.log(e.message)
    }
  }
  async function handleLogin(data) {
    try {
      const login = await api.login(data);
      const res = await api.checkToken(login.token);
      setEmail(res.data.email);
      localStorage.setItem('jwt', login.token);
      setLoggedIn(true);
    }
    catch (e) {
      console.log(e.message);
    }
  }
  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  return (
    <>
      <div className="page">
        <div className="page__container">

          <CurrentUserContext.Provider value={currentUser}>

            <Header src={Logo} onLogOut={handleLogOut} email={email} loggedIn={loggedIn} />
            <Switch>
              <ProtectedRoute exact path="/" component={Main} loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick}
                cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
              />
              <Route path="/sign-in">
                <div className="auth">
                  <Login onSubmit={handleLogin} />
                </div>
              </Route>
              <Route path="/sign-up">
                <div className="auth">
                  <Register onSubmit={handleRegister} />
                </div>
              </Route>
            </Switch>
            <Route>
              {loggedIn ? (<Redirect exact to="/" />) : (<Redirect to="/sign-up" />)}
            </Route>
            <Footer />
            <EditProfilePopup isOpened={isEditProfilePopupOpened} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
            <EditAvatarPopup isOpened={isEditAvatarPopupOpened} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
            <AddPlacePopup isOpened={isAddPlacePopupOpened} onClose={closeAllPopups} onSubmit={handleAddPlaceSubmit} />
            <InfoTooltip isOpened={isInfoTooltipOpened} onClose={closeAllPopups} isSuccess={isSuccess} />
          </CurrentUserContext.Provider>
        </div>
        <PopupWithForm name="confirm" title="Вы уверены?" onClose={closeAllPopups} />
        <ImagePopup card={selectedCard} isOpened={isImagePopupOpened} onClose={closeAllPopups} />
      </div>
    </>
  )
};