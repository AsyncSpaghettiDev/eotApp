// Style
import './styles/Login.css';

// Resources
import EOTLogo from '../Images/logo.png';

// Components
import NavBar from "../Components/NavBar";
import Transition from '../Components/Transition';

// Imports
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../Utils/AuthContext.js';

const Login = () => {
    // Hooks
    let navigate = useNavigate();
    const [validForm, setValidForm] = useState(undefined);
    const [from, setFrom] = useState();
    const [userAuth, setUserAuth] = useState({
        auth: false,
        name: null,
        role: null
    });
    const [searchParams, __] = useSearchParams();
    let location = useLocation();
    const { _, setAuthContextApi } = useContext(AuthContext);

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

    useEffect(() => {
        if(validForm !== undefined)
            setValidForm(userAuth.auth);

        if (userAuth.auth) {
            setAuthContextApi({
                auth: userAuth.auth,
                username: userAuth.name,
                role: userAuth.role
            })
            navigate(from, { replace: true });
        }

    }, [userAuth]);

    // Handlers
    const submitHandler = e => {
        e.preventDefault();
        serverValidation(e.target[0].value, e.target[1].value);
    }
    // Functions
    const serverValidation = async (user, password) => {
        fetch('/api/auth/',
            {
                method: 'POST',
                body: JSON.stringify({ user: user, password: password }),
                headers: { "Content-Type": "application/json" }
            }
        )
            .then(res => {
                if (res.ok)
                    return res.json();
                else
                    setUserAuth({ ...userAuth, auth: false })
            })
            .then(data => {
                if (data !== undefined)
                    setUserAuth({
                        auth: true,
                        name: user,
                        role: data.role
                    })
            });
    }

    // Render section
    return (
        <main className="login">
            <NavBar />
            <form
                onSubmit={submitHandler}
                className={validForm !== undefined && !validForm ? 'login__form invalid' : 'login__form'}
                autoComplete='off'>
                <img className='login__form-img' src={EOTLogo} alt="" />
                <label className="login__form-label" htmlFor="usr-name">Nombre de usuario</label>
                <input className="login__form-input" placeholder='Ingrese su usuario' type="text" name="usr-name" id="usr-name" />
                <label className="login__form-label" htmlFor="usr-pswd">Contraseña</label>
                <input className="login__form-input" placeholder='Ingrese su contraseña' type="password" name="usr-pswd" id="usr-pswd" />
                {
                    validForm !== undefined && !validForm &&
                    <p className="login__form-warn">Credenciales inválidas, prueba otra vez.</p>
                }
                <input className="login__form-submit" type="submit" value="Ingresar" />
            </form>
            <Transition duration='200ms' />
        </main>
    )
}

export default Login;