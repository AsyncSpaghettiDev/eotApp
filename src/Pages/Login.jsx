// Style
import './styles/Login.css';

// Resources
import EOTLogo from '../Images/logo.png';

// Data
import Users from '../Data/users.json';

// Components
import NavBar from "../Components/NavBar";
import Transition from '../Components/Transition';

// Imports
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

const Login = () => {
    // Hooks
    let navigate = useNavigate();
    const [_, setCookie] = useCookies(['role', 'user']);
    const [validForm, setValidForm] = useState(true);
    const [from, setFrom] = useState();
    const [searchParams, __] = useSearchParams();
    let location = useLocation();

    // UseEffect
    useEffect(() => {
        // Deprecated validation
        if (searchParams.get('user') != null)
            console.log(searchParams.get('user'));
        // On load checks if it was redirect, if yes after login will redirect to that section
        // Else redirects to home
        setFrom(location.state?.from?.pathname || "/");
    }, []);

    useEffect(() => {
        if (!validForm)
            setTimeout(() => setValidForm(true), 2000);
    }, [validForm]);

    // Handlers
    const submitHandler = e => {
        e.preventDefault();
        const [valid, name, role] = fakeValidation(e.target[0].value, e.target[1].value);

        if (valid) {
            setValidForm(true);
            setCookie('name', name, {
                path: '/',
                maxAge: role === 'TABLE' ? 10800 : 86400
            });
            setCookie('role', role, {
                path: '/',
                maxAge: role === 'TABLE' ? 10800 : 86400
            });
            navigate(from, { replace: true });
        }
    }
    // Functions
    const fakeValidation = (user, password) => {
        const userFinded = Users.find(reg => reg.R_USER_NAME == user && reg.USER_PASSWORD == password);
        if (userFinded) {
            const { R_USER_NAME, USER_ROLE } = userFinded;
            return [true, R_USER_NAME, USER_ROLE];
        }
        setValidForm(false);
        return [false, null, null];
    }

    // Render section
    return (
        <main className="login">
            <NavBar />
            <form
                onSubmit={submitHandler}
                className={validForm ? 'login__form' : 'login__form invalid'}
                autoComplete='off'>
                <img className='login__form-img' src={EOTLogo} alt="" />
                <label className="login__form-label" htmlFor="usr-name">Nombre de usuario</label>
                <input className="login__form-input" placeholder='Ingrese su usuario' type="text" name="usr-name" id="usr-name" />
                <label className="login__form-label" htmlFor="usr-pswd">Contraseña</label>
                <input className="login__form-input" placeholder='Ingrese su contraseña' type="password" name="usr-pswd" id="usr-pswd" />
                {
                    !validForm &&
                    <p className="login__form-warn">Credenciales inválidas, prueba otra vez.</p>
                }
                <input className="login__form-submit" type="submit" value="Ingresar" />
            </form>
            <Transition duration='1s' />
        </main>
    )
}

export default Login;