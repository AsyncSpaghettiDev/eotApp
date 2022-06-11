// Imports
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

// Styles
import './styles/NavBar.css';

const NavBar = ({ noBack = false, showUser = true }) => {
    // Hooks
    const [cookies, _, removeCookie] = useCookies(['role', 'name']);
    const navigate = useNavigate();

    // Handlers
    const onClickHandler = () => {
        removeCookie('role');
        removeCookie('name');
        navigate('/');
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
                !noBack || cookies.role === 'ADMIN' &&
                <span className='navbar__back' onClick={returnHandler}> &#5176; </span>
            }
            <h1 className='navbar-header' onClick={homeHandler} >EatOnTime</h1>
            {
                // If we have an active session we can logout by clicking in out name
                // also is conditional render, if we dont want it
                showUser && cookies.role &&
                <span className="navbar__logout" onClick={onClickHandler}>Welcome {cookies.name} ({cookies.role}) </span>
            }
        </nav>
    )
}

export default NavBar;