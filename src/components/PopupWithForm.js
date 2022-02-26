function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__content">
                <button className="popup__close-btn" type="button" onClick={props.onClose}></button>
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" name={props.name} onSubmit={props.onSubmit} noValidate>
                    {props.children}
                    <button className="popup__save-btn" type="submit">{props.btnText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;