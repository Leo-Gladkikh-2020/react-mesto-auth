import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';

function Main(props) {

    const currentUser = useContext(CurrentUserContext);
    const cards = useContext(CardsContext);

    return (
        <main className="content">
            <section className="profile">
                <button className="profile__avatar-btn" type="button" onClick={props.onEditAvatar}>
                    <img className="profile__avatar" src={currentUser.avatar} alt="Фото - Аватар" />
                </button>
                <div className="profile__description">
                    <div className="profile__title">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-btn" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button className="profile__add-btn" type="button" onClick={props.onAddPlace}></button>
            </section>

            <section className="elements" aria-label="Секция с описанием мест">
                <ul className="elements__list">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={props.onCardClick}
                            onCardDelete={props.onCardDelete}
                            onCardLike={props.onCardLike}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;