export default function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.isOpened && "popup_opened"}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <figure className="popup__figure">
          <img src={props.card.src} alt={props.card.name} className="popup__image" />
          <figcaption className="popup__caption">{`${props.card.name}`}</figcaption>
        </figure>
      </div>
    </div>
  )
};
