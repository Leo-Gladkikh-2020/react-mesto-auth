import React from 'react';

function ImagePopup(props) {
    return (
        <div className={`popup popup-place ${props.card.link ? "popup_opened" : ''}`}>
            <div className="popup__container">
                <button className="popup__close-btn" type="button" onClick={props.onClose}></button>
                <figure className="popup__figure">
                    <img src={props.card.link} alt={props.card.name} className="popup__image" />
                    <figcaption className="popup__caption">{props.card.name}</figcaption>
                </figure>
            </div>
        </div>
    );
}

export default ImagePopup;