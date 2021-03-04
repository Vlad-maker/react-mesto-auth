import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleLinkChange(e) {
    e.preventDefault();
    setLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({ name, link });
  }

  return (
    <PopupWithForm name="add-card" title="Новое место" isOpened={props.isOpened} onClose={props.onClose} onSubmit={handleSubmit}>
      <input id="place-input" type="text" className="popup__input popup__input_type_place"
        placeholder="Название" name="name" required minLength="2" maxLength="30" value={name || ''} onChange={handleNameChange} />
      <span id="place-input-error" className="popup__input-error"></span>
      <input id="link-input" type="url" className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку" name="link" required value={link || ''} onChange={handleLinkChange} />
      <span id="link-input-error" className="popup__input-error"></span>
    </PopupWithForm>
  )
};