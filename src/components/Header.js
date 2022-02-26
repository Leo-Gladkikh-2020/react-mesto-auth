import { useState } from 'react';
import { useLocation } from "react-router";
import { Link, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import logoHeader from '../images/logo.svg';
import wrapBtn from '../images/wrap-btn.svg';
import closeBtn from '../images/close-btn.svg';
import NavBar from './NavBar';

function Header(props) {

    const isBigScreen = useMediaQuery({ query: '(min-width: 768px)' });
    const location = useLocation();
    const [navBarOpen, setNavBarOpen] = useState(false);

    function handleNavBarOpen() {
        setNavBarOpen(!navBarOpen);
    }

    function handleNavBarClose() {
        setNavBarOpen(false);
        props.signOut();
    }

    function renderNavBar() {
        return (
            <>
                {location.pathname === '/' && isBigScreen && <NavBar handleNavBarClose={handleNavBarClose} userEmail={props.userEmail} />}
                <Route path="/signup">
                    <Link className="header__link" to="/signin">Войти</Link>
                </Route>
                <Route path="/signin">
                    <Link className="header__link" to="/signup">Регистрация</Link>
                </Route>
            </>
        )
    }

    return (
        <>
            {!isBigScreen && navBarOpen && <NavBar handleNavBarClose={handleNavBarClose} userEmail={props.userEmail} />}
            <header className="header">
                <img className="header__logo" src={logoHeader} alt="Логотип Mesto" />
                {!isBigScreen && location.pathname === '/' && <button
                    onClick={handleNavBarOpen}
                    className="header__wrap-btn"
                    type="button"
                    style={{ backgroundImage: `url(${navBarOpen ? closeBtn : wrapBtn})` }}
                />}
                {renderNavBar()}
            </header>
        </>
    );
}

export default Header;