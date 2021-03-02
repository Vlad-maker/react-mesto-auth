import React from 'react';
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"
function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [ name, setName ] = React.useState('');
    const [ description, setDescription ] = React.useState('');
    
    React.useEffect(() => {
        if (currentUser.name || currentUser.description) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser]);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }
    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }
    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }
    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <input
                        className="popup__input popup__input_name"
                        id="name-input"
                        type="text"
                        name="nameInput"
                        placeholder="Имя"
                        minLength="2"
                        maxLength="40"
                        required
                        value={name}
                        onChange={handleChangeName}
                    />
                    <span
                        className="popup__input-error"
                        id="name-input-error"
                    />
                    <input
                        className="popup__input popup__input_about"
                        id="about-input"
                        type="text"
                        name="aboutInput"
                        placeholder="О себе"
                        minLength="2"
                        maxLength="200"
                        required
                        value={description}
                        onChange={handleChangeDescription}
                    />
                    <span
                        className="popup__input-error"
                        id="about-input-error"
                    />
                </>
            }
        />
    )
}
export default EditProfilePopup;