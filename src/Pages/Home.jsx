// Resources
import Login from '../Images/login.png';
import MenuImage from '../Images/menu.png';
import OrdersImage from '../Images/orders.png';
import AboutUsImage from '../Images/aboutus.png';
import DashboardImage from '../Images/dashboard.svg';
import EmployeesImage from '../Images/empleados.png';

// Styles
import './styles/Home.css';

// Components
import Transition from '../Components/Transition.jsx';

// Imports
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../Utils/AuthContext';

const Home = () => {
    // Hooks
    const {authContextApi, setAuthContextApi} = useContext(AuthContext);

    // Handlers
    const onClickHandler = () => {
        fetch('/api/auth/',{
            method: 'DELETE'
        }).then(res => res.json()).then(__ => setAuthContextApi({
            auth: false,
            username: null,
            role: null
        }));
    }

    // Render section
    return (
        <main className="home">
            <Transition duration='750ms' />
            <h1 className='home-title'>Bienvenido a EatOnTime</h1>
            {
                /**
                 * Link to dashboard section
                 */
            }
            <Link className='home__link' to='/dashboard'>
                <img className='home__link-image' src={DashboardImage} alt="eat on time tables dashboard" />
                <p className="home__link-text">Dashboard</p>
            </Link>
            {
                /**
                 * Link to menu section
                 */
            }
            <Link className='home__link' to='/menu'>
                <img className='home__link-image' src={MenuImage} alt="eat on time menu" />
                <p className="home__link-text">Menu</p>
            </Link>
            {
                /**
                 * If current session has admin role can access to link to employees
                 */
                authContextApi.role === 'ADMIN' &&
                <Link className='home__link' to='/employees'>
                    <img src={EmployeesImage} alt="" className="home__link-image" />
                    <p className="home__link-text">Empleados</p>
                </Link>
            }
            {
                /**
                 * If current session has admin or chef role can access to link to employees
                 */
                (authContextApi.role === 'ADMIN' || authContextApi.role === 'CHEF') &&
                <Link className='home__link' to='/orders'>
                    <img src={OrdersImage} alt="" className="home__link-image" />
                    <p className="home__link-text">Ordenes</p>
                </Link>
            }
            <Link className='home__link' to='/about'>
                <img className='home__link-image' src={AboutUsImage} alt="eat on time about" />
                <p className="home__link-text">Desarrolladores</p>
            </Link>
            <Link className='home__link home__link-last' to='/' ></Link>
            {
                /**
                 * If current user isnt authenticated login redirect will appear
                 */
                !authContextApi.auth &&
                <Link className='home__link-flotant' to='/login' replace={false} >
                    <img className='home__link-image' src={Login} alt="eat on time login" />
                    <p className="home__link-text">Login</p>
                </Link>
            }
            {
                /**
                 * If current user is authenticated welcome message will appear
                 */
                authContextApi.auth &&
                <p className='user-welcome-message'
                    onClick={onClickHandler}>
                    {`Welcome ${authContextApi.username} (${authContextApi.role}) `}
                </p>
            }
        </main>
    )
}

export default Home;