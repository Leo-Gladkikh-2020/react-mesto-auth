import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

    const currentUser = useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (`${isOwn ? 'element__trash-btn' : 'element__trash-btn_hidden'}`);
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__like-btn ${isLiked ? 'element__like-btn_active' : ''}`;

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <li className="element">

            <img
                className="element__image"
                src={props.card.link}
                alt={props.card.name}
                onClick={handleClick}
            />

            <button
                className={cardDeleteButtonClassName}
                type="button"
                onClick={handleDeleteClick}>
            </button>

            <div className="element__container">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__like">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        onClick={handleLikeClick}>
                    </button>
                    <span className="element__like-number">{props.card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card;