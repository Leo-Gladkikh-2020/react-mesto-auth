import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [title, setTitle] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleSubmit(event) {
        event.preventDefault();
        props.onAddPlace({ title: title, link: link });
    }

    function handleChangeTitle(event) { setTitle(event.target.value) }
    function handleChangeLink(event) { setLink(event.target.value) }

    React.useEffect(() => {
        if (props.isOpen) {
            setTitle('');
            setLink('');
        }
    }, [props.isOpen])

    return (
        <PopupWithForm
            name="popup-add"
            title="Новое место"
            btnText="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input className="popup__input popup__input_text_title" type="text" name="title" id="title"
                placeholder="Название" minLength="1" maxLength="30" required value={title} onChange={handleChangeTitle} />
            <span className="popup__error" id="title-error"></span>

            <input className="popup__input popup__input_text_link" type="url" name="link" id="link"
                placeholder="Ссылка на картинку" required value={link} onChange={handleChangeLink} />
            <span className="popup__error" id="link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;