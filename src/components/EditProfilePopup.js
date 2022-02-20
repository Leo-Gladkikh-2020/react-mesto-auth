import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        props.onUpdateUser({ name: userName, about: userDescription });
    }

    function handleChangeName(event) {
        setUserName(event.target.value);
    }

    function handleChangeDescription(event) {
        setUserDescription(event.target.value);
    }

    useEffect(() => {
        if (props.isOpen) {
            setUserName(currentUser.name);
            setUserDescription(currentUser.about);
        }
    }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm
            name="popup-edit"
            title="Редактировать профиль"
            btnText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>

            <input
                className="popup__input popup__input_text_name"
                type="text"
                name="name"
                id="name"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required
                value={userName || ''}
                onChange={handleChangeName}
            />

            <span className="popup__error" id="name-error"></span>

            <input
                className="popup__input popup__input_text_about"
                type="text"
                name="about"
                id="about"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                required
                value={userDescription || ''}
                onChange={handleChangeDescription}
            />

            <span className="popup__error" id="about-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;