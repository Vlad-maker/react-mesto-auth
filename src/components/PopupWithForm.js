import React from 'react';
function PopupWithForm(props) {
    return (
        <div
            className={`popup page__popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}>
            <div
                className="popup__container">
                <button
                    className="popup__close-button"
                    type="button"
                    aria-label="Закрыть"
                    onClick={props.onClose}
                />
                <h2 className="popup__title">{props.title}</h2>
                <form
                    className="popup__form"
                    name={props.name}
                    noValidate
                    onSubmit={props.onSubmit}>
                    {props.children}
                    <button
                        className="popup__save-button"
                        type="submit">{props.buttonText}
                    </button>
                </form>

            </div>
        </div>
    );
}
export default PopupWithForm;