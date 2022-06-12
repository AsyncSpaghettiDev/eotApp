// Imports
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from '../Utils/AuthContext';

// Styles
import './styles/NavBar.css';

const NavBar = ({ noBack = false, showUser = true }) => {
    // Hooks
    const {authContextApi, setAuthContextApi} = useContext(AuthContext);
    const navigate = useNavigate();

    // Handlers
    const onClickHandler = () => {
        fetch('/api/logout').then(res => res.json()).then(__ => {
            setAuthContextApi({
                auth: false,
                username: null,
                role: null
            });
            navigate('/');
        });
    }
    const returnHandler = () => {
        navigate(-1);
    }
    const homeHandler = () => {
        navigate('/');
    }

    // Render Section
    return (
        <nav className="navbar__header">
            {
                // In case we dont want back arrow or we are not admin, we display back arrow
                !noBack || authContextApi.role === 'ADMIN' &&
                <span className='navbar__back' onClick={returnHandler}> &#5176; </span>
            }
            <h1 className='navbar-header' onClick={homeHandler} >EatOnTime</h1>
            {
                // If we have an active session we can logout by clicking in out name
                // also is conditional render, if we dont want it
                showUser && authContextApi.role &&
                <span className="navbar__logout" onClick={onClickHandler}>Welcome {authContextApi.username} ({authContextApi.role}) </span>
            }
        </nav>
    )
}

export default NavBar;