import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {

    return (
        <PopupWithForm
            name="popup-place-delete"
            title="Вы уверены?"
            btnText="Да"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={props.onSubmit}
        />
    )
}

export default DeleteCardPopup;