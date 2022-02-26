import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const userAvatar = useRef();

    function handleSubmit(event) {
        event.preventDefault();
        props.onUpdateAvatar({ avatar: userAvatar.current.value });
    }

    useEffect(() => {
        if (props.isOpen) {
            userAvatar.current.value = '';
        }
    }, [props.isOpen]);

    return (
        <PopupWithForm
            name="popup-avatar"
            title="Обновить аватар"
            btnText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>

            <input
                className="popup__input popup__input_text_link"
                type="url"
                name="avatar"
                id="avatar"
                placeholder="Ссылка на картинку"
                required
                ref={userAvatar}
            />

            <span className="popup__error" id="avatar-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;