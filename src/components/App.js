import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import api from '../utils/api';
import * as auth from '../utils/auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
    const [tooltipStatus, setTooltipStatus] = useState(false);
    const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
    const [deleteCard, setDeleteCard] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jwt') ? true : false);
    const history = useHistory();

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cards]) => {
                setCurrentUser(userData);
                setCards(cards);
            })
            .catch(err => console.log(err))
    }, []);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleDeleteCardClick(card) {
        setDeleteCard(card);
        setIsDeleteCardPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsDeleteCardPopupOpen(false);
        setIsInfoToolTipOpen(false);
        setSelectedCard({ name: '', link: '' });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.addLike(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => console.log(err))
    }

    function handleCardDelete(event) {
        event.preventDefault();
        api.deleteCard(deleteCard)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== deleteCard._id));
                closeAllPopups();
            })
            .catch(err => console.log(err))
    }

    function handleUpdateUser(data) {
        setIsLoading(true);
        api.changeUserInfo(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => {
                setIsLoading(false);
            })
    }

    function handleUpdateAvatar(data) {
        setIsLoading(true)
        api.changeUserAvatar(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => {
                setIsLoading(false);
            })
    }

    function handleAddPlaceSubmit(newCard) {
        setIsLoading(true)
        api.addCard(newCard)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => {
                setIsLoading(false);
            })
    }

    function handleLogin(email, password) {
        auth.authorize(email, password)
            .then((data) => {
                if (data.token) {
                    setLoggedIn(true);
                    localStorage.setItem('jwt', data.token);
                    setUserEmail(email);
                    history.push('/');
                }
            })
            .catch(err => console.log(err))
    }

    function handleRegister(email, password) {
        auth.register(email, password)
            .then(() => {
                setTooltipStatus(true);
                handleLogin(email, password);
                history.push('/signin');
            })
            .catch(err => {
                setTooltipStatus(false);
                console.log(err);
            })
            .finally(() => {
                setIsInfoToolTipOpen(true);
            })
    }

    function handleTokenCheck() {
        if (localStorage.getItem('jwt')) {
            const token = localStorage.getItem('jwt');
            auth.checkToken(token)
                .then(res => {
                    if (res) {
                        setLoggedIn(true);
                        setUserEmail(res.data.email);
                        history.push('/');
                    }
                })
                .catch(err => {
                    localStorage.removeItem('jwt');
                    console.log(err);
                })
        }
    }

    useEffect(() => {
        handleTokenCheck();
    }, []);

    function signOut() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        setUserEmail('');
        history.push('/signin');
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>

            <CardsContext.Provider value={cards}>

                <Header
                    userEmail={userEmail}
                    signOut={signOut}
                />

                <Switch>
                    <ProtectedRoute
                        exact path="/"
                        loggedIn={loggedIn}
                        component={Main}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeleteCardClick}
                        cards={cards}
                    />
                    <Route path="/signup">
                        <Register handleRegister={handleRegister} />
                    </Route>
                    <Route path="/signin">
                        <Login handleLogin={handleLogin} />
                    </Route>
                </Switch>

                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoadingData={isLoading}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoadingData={isLoading}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    isLoadingData={isLoading}
                />

                <DeleteCardPopup
                    isOpen={isDeleteCardPopupOpen}
                    onClose={closeAllPopups}
                    onSubmit={handleCardDelete}
                />

                <ImagePopup
                    onClose={closeAllPopups}
                    card={selectedCard}
                />

                <InfoTooltip
                    isOpen={isInfoToolTipOpen}
                    onClose={closeAllPopups}
                    tooltipStatus={tooltipStatus}
                />

            </CardsContext.Provider>

        </CurrentUserContext.Provider>
    );
}

export default App;